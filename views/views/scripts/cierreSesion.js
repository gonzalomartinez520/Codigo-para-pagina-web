function isLogged() {
  return localStorage.getItem("logged") === "true";
}
function setLogged(v) {
  localStorage.setItem("logged", v ? "true" : "false");
}

const linkLogin  = document.querySelector(".inicioSesion"); 
const linkReg    = document.querySelector(".registro");      
const linkLogout = document.querySelector(".cerrarSesion"); 

//Para pantallas de login/registro capturamos el clic y marcamos login
const botonInicio = document.querySelector(".boton-inicio-sesion"); 

if (botonInicio) {
  botonInicio.addEventListener("click", () => {
    setLogged(true);          
  });
}

//Para el panel, pintamos el menú y controlamos “Cerrar sesión”
function renderMenu() {
  if (linkLogin)  linkLogin.style.display  = isLogged() ? "none" : "";
  if (linkReg)    linkReg.style.display    = isLogged() ? "none" : "";
  if (linkLogout) linkLogout.style.display = isLogged() ? "" : "none";
}

if (linkLogout) {
  linkLogout.addEventListener("click", e => {
    e.preventDefault();
    setLogged(false);
    renderMenu();
    window.location.href = "panelNoticias.html";
  });
}

//Al cargar cualquier página, ajustamos lo que hubiera
renderMenu();