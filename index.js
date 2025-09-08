const express = require('express');
const path = require('path');
const app = express();
const PORT = 5050;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123'){
        return res.redirect('/dashboard');
    }
    res.status(401).send('Credentials invalid');
});

app.get('/dashboard', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Dashboard Moderno</title>
        
        <style>
            body {
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .dashboard-card {
                border-radius: 1rem;
                box-shadow: 0 4px 32px rgba(0,0,0,0.15);
                padding: 2.5rem 2rem;
                background: #a8fde4d8;
                width: 100%;
                max-width: 420px;
                animation: fadeIn 1s;
                text-align: center;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(40px);}
                to { opacity: 1; transform: translateY(0);}
            }
            .dashboard-title {
                color: #2575fc;
                font-weight: 700;
                margin-bottom: 1rem;
            }
            .dashboard-icon {
                font-size: 3rem;
                color: #6a11cb;
                margin-bottom: 1rem;
            }
            .btn-logout {
                margin-top: 2rem;
            }
        </style>
    </head>
    <body>
        <div class="dashboard-card">
            <div class="dashboard-icon">👋</div>
            <h2 class="dashboard-title">¡Bienvenido al Dashboard!</h2>
            <p class="mb-4">Has iniciado sesión correctamente.<br>Disfruta de tu experiencia.</p>
            <a href="/Login" class="btn btn-outline-primary btn-logout w-100">Cerrar sesión</a>
        </div>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
