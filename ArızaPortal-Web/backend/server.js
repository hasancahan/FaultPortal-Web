const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Supabase bağlantı bilgileri
const supabaseUrl = 'https://mrnshejocseknstkpxmb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybnNoZWpvY3Nla25zdGtweG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMjc1NTQsImV4cCI6MjA1MTgwMzU1NH0.S9GRzTTwaMW6J_XFgpjeLpAbuZk5e16ytM81bGW36l0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Ana sayfa route'u
app.get('/', (req, res) => {
    res.send('Arıza Portal API çalışıyor!');
});

// Test endpoint'i
app.get('/test', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('bildirimler')
            .select('created_at')
            .limit(1);

        if (error) throw error;

        res.json({
            success: true,
            message: 'Veritabanı bağlantısı başarılı',
            data: data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Veritabanı bağlantı hatası',
            error: err.message
        });
    }
});

// Bildirim kaydetme endpoint'i
app.post('/api/bildirim', async (req, res) => {
    try {
        const { formType, formData } = req.body;
        
        const { data, error } = await supabase
            .from('bildirimler')
            .insert([
                { form_type: formType, form_data: formData }
            ]);

        if (error) throw error;

        res.json({
            success: true,
            message: 'Bildirim başarıyla kaydedildi',
            data: data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Bir hata oluştu',
            error: err.message
        });
    }
});

// Login endpoint'i
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error) throw error;

        if (data) {
            res.json({
                success: true,
                message: 'Giriş başarılı',
                user: {
                    id: data.id,
                    username: data.username,
                    fullName: data.full_name,
                    department: data.department
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Kullanıcı adı veya şifre hatalı'
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Giriş işlemi başarısız',
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
}); 