import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box, Button, Card, CardContent, Container, IconButton,
  InputAdornment, Stack, TextField, Typography
} from "@mui/material";
import { CheckCircle, Map, Visibility, VisibilityOff } from "@mui/icons-material";


import { login, getProfile } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  

 const handleLogin = async () => {
  try {

    const result = await login(email, password);

    localStorage.setItem("token", result.token);

    const user = await getProfile();

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/dashboard");

  } catch (error) {
    alert(error.response?.data || "Giriş başarısız.");
  }
};

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#0F172A,#1565C0)", display: "flex", alignItems: "center" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 5, alignItems: "center" }}>
          <Box sx={{ color: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Map sx={{ fontSize: 56, mr: 2 }} />
              <Typography variant="h2" fontWeight="bold">GeoDraw</Typography>
            </Box>

            <Typography variant="h5" sx={{ mb: 5, opacity: 0.9 }}>
              Interactive GIS Drawing Platform
            </Typography>

            <Stack spacing={2}>
              {["JWT Authentication", "ASP.NET Core Web API", "PostgreSQL Database", "React + Material UI", "OpenLayers Map"].map((item) => (
                <Box key={item} sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircle sx={{ mr: 2 }} />
                  <Typography>{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Card sx={{ borderRadius: 4, boxShadow: 8 }}>
            <CardContent sx={{ p: 5 }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Giriş Yap</Typography>
              <Typography color="text.secondary" mb={3}>Harita çizim paneline erişmek için giriş yap.</Typography>

              <TextField fullWidth label="E-posta" type="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} helperText="E-posta formatında giriniz. Örnek: ornek@mail.com" />

              <TextField
                fullWidth
                label="Şifre"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button fullWidth variant="contained" size="large" sx={{ mt: 3, py: 1.4, borderRadius: 2 }} onClick={handleLogin}>
                Giriş Yap
              </Button>

              <Typography textAlign="center" mt={3}>
                Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;