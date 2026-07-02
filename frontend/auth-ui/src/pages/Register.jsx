import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box, Button, Card, CardContent, Container, IconButton,
  InputAdornment, Stack, TextField, Typography
} from "@mui/material";
import { CheckCircle, Map, Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "../services/authService";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor.");
      return;
    }

    try {
      const result = await register(fullName, email, password);
      alert(result.message || result);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data || "Kayıt başarısız.");
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
              Modern GIS Drawing Platform
            </Typography>

            <Stack spacing={2}>
              {["Point, Line, Polygon çizimi", "OpenLayers Türkiye Haritası", "JWT Authentication", "PostgreSQL kayıt sistemi", "React + ASP.NET Core"].map((item) => (
                <Box key={item} sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircle sx={{ mr: 2 }} />
                  <Typography>{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Card sx={{ borderRadius: 4, boxShadow: 8 }}>
            <CardContent sx={{ p: 5 }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Kayıt Ol</Typography>
              <Typography color="text.secondary" mb={3}>GeoDraw hesabını oluştur.</Typography>

              <TextField fullWidth label="Ad Soyad" margin="normal" value={fullName} onChange={(e) => setFullName(e.target.value)} />

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

              <TextField
                fullWidth
                label="Şifre Tekrar"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button fullWidth variant="contained" size="large" sx={{ mt: 3, py: 1.4, borderRadius: 2 }} onClick={handleRegister}>
                Kayıt Ol
              </Button>

              <Typography textAlign="center" mt={3}>
                Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;