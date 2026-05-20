const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // GET: 주문 목록 조회
    if (event.httpMethod === 'GET') {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // POST: 주문 저장
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const { name, phone, address, entry, items, total, delivery_date, region } = body;

      // 주문 저장
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({ name, phone, address, entry, total, delivery_date, region })
        .select()
        .single();
      if (orderError) throw orderError;

      // 주문 품목 저장
      if (items && items.length > 0) {
        const orderItems = items.map(item => ({
          order_id: order.id,
          item_name: item.name,
          quantity: item.quantity,
          price: item.price
        }));
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
        if (itemsError) throw itemsError;
      }

      return { statusCode: 200, headers, body: JSON.stringify({ success: true, order_id: order.id }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'method not allowed' }) };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
