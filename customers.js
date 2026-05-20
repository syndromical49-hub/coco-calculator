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
    // 전화번호로 단일 고객 조회
    const phone = event.queryStringParameters?.phone;
    if (phone) {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('phone', phone)
        .single();
      if (error) return { statusCode: 404, headers, body: JSON.stringify({ error: 'not found' }) };
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // 전체 고객 조회
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name');
    if (error) throw error;
    return { statusCode: 200, headers, body: JSON.stringify(data) };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
