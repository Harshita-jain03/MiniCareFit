// import API_URLS from '@/src/lib/api';;
// import { fetchWithTokenRetry } from '@/src/lib/auth/server';
// import { NextRequest, NextResponse } from 'next/server';



// export async function GET(_req: NextRequest) {
//   try {
//     const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.GET_ALL, {
//       method: 'GET',
//     });
//     return NextResponse.json(data, { status });
//   } catch (err) {
//     console.error('[food-items] GET failed:', err);
//     return NextResponse.json({ error: 'Failed to load food items' }, { status: 500 });
//   }
// }




// export async function POST(request: NextRequest) {
//   console.log('➡️ POST /admin/parent/register');

//   try {
//     const formData = await request.formData(); // Correct for multipart/form-data

//     const body: Record<string, any> = {};
//     formData.forEach((value, key) => {
//       body[key] = value;
//     });

//     const finalUrl = API_URLS.FOOD_LOGS.CREATE;

//     const { data, status } = await fetchWithTokenRetry(finalUrl, {
//       method: 'POST',
//       body: formData, // Forward the same FormData to your backend API
//     });

//     return NextResponse.json(data, { status });
//   } catch (err) {
//     console.error('[parent/register] Failed to register parent:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }


import API_URLS from '@/src/lib/api';
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { decodeTokenFromRequest } from '@/src/lib/auth/server'; // <-- uses your helper you pasted
import { NextRequest, NextResponse } from 'next/server';

// GET:
// - If ?child=<id> given -> return that child's FOOD LOGS
// - Otherwise -> return FOOD ITEMS for dropdown
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const child = searchParams.get('child');

    if (child) {
      // List logs for a specific child
      const url = new URL(API_URLS.FOOD_LOGS.GET_ALL);
      url.searchParams.set('child', child);              // most DRF filtersets accept fk name
      // url.searchParams.set('child_id', child);       // uncomment if your backend expects child_id instead

      const { data, status } = await fetchWithTokenRetry(url.toString(), { method: 'GET' });
      return NextResponse.json(data, { status });
    }

    // Default: dropdown source → FOOD ITEMS
    const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_ITEMS.GET_ALL, { method: 'GET' });
    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[child/health] GET failed:', err);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

// POST: create a food log
// - Convert FormData -> JSON (numbers where needed)
// - Prefer logged-in child from token; fallback to "child" field in the form
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    const qty = Number(form.get('quantity') ?? 0);
    const mealType = String(form.get('meal_type') ?? '');
    const foodItem = Number(form.get('food_item') ?? 0);
    const childFromForm = form.get('child');

    // derive child from token when role is child/student
    const user = decodeTokenFromRequest(request);
    let childId: number | null = null;
    if (user) {
      const role = (user.role || '').toLowerCase();
      if (role === 'child' || role === 'student') {
        childId = Number(user.user_id);
      }
    }
    if (!childId && childFromForm) childId = Number(childFromForm);

    if (!childId) {
      return NextResponse.json({ error: 'child is required' }, { status: 400 });
    }
    if (!qty || !mealType || !foodItem) {
      return NextResponse.json({ error: 'quantity, meal_type and food_item are required' }, { status: 400 });
    }

    const payload = {
      quantity: qty,
      meal_type: mealType,
      child: childId,           // DRF FK id on "child"
      food_item: foodItem,      // DRF FK id on "food_item"
    };

    const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },  // JSON is safest with DRF
      body: JSON.stringify(payload),
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[child/health] POST failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
