let nombres = [];
let notas = [];

let formulario = document.getElementById("formAlumno");
let mensaje = document.getElementById("mensaje");
let contador = document.getElementById("contador");
let resultados = document.getElementById("resultados");

function calcularPromedio(lista) {
  let suma = lista.reduce((total, valor) => total + valor, 0);
  return suma / lista.length;
}

function promediosAlumnos() {
  return notas.map((fila) => calcularPromedio(fila));
}

function promedioCertamen(columna) {
  let notasDelCertamen = notas.map((fila) => fila[columna]);
  return calcularPromedio(notasDelCertamen);
}

function ordenarAlumnos(promedios) {
  let ordNombres = nombres.map((n) => n);
  let ordPromedios = promedios.map((p) => p);

  for (let i = 0; i < ordPromedios.length - 1; i++) {
    for (let j = 0; j < ordPromedios.length - 1 - i; j++) {
      if (ordPromedios[j] < ordPromedios[j + 1]) {
        let tempP = ordPromedios[j];
        ordPromedios[j] = ordPromedios[j + 1];
        ordPromedios[j + 1] = tempP;
        let tempN = ordNombres[j];
        ordNombres[j] = ordNombres[j + 1];
        ordNombres[j + 1] = tempN;
      }
    }
  }

  return { nombres: ordNombres, promedios: ordPromedios };
}

function mostrarResultados() {
  let promedios = promediosAlumnos();
  let texto = "";

  for (let i = 0; i < nombres.length; i++) {
    texto += "Nombre " + (i + 1) + ": " + nombres[i] + "\n";
    texto += "C1: " + notas[i][0] + "\n";
    texto += "C2: " + notas[i][1] + "\n";
    texto += "C3: " + notas[i][2] + "\n";
    texto += "Promedio: " + promedios[i].toFixed(2) + "\n\n";
  }

  let promC1 = promedioCertamen(0);
  let promC2 = promedioCertamen(1);
  let promC3 = promedioCertamen(2);
  let promFinal = calcularPromedio(promedios);

  let aprobados = promedios.filter((p) => p >= 55).length;
  let reprobados = promedios.filter((p) => p < 55).length;

  texto += "Promedio del curso C1: " + promC1.toFixed(2) + "\n";
  texto += "Promedio del curso C2: " + promC2.toFixed(2) + "\n";
  texto += "Promedio del curso C3: " + promC3.toFixed(2) + "\n";
  texto += "Promedio Final Curso: " + promFinal.toFixed(2) + "\n";
  texto += "Aprobados: " + aprobados + "\n";
  texto += "Reprobados: " + reprobados + "\n\n";

  let ranking = ordenarAlumnos(promedios);
  texto += "Ranking por promedio:\n";
  for (let i = 0; i < ranking.nombres.length; i++) {
    texto +=
      i +
      1 +
      ". " +
      ranking.nombres[i] +
      " - " +
      ranking.promedios[i].toFixed(2) +
      "\n";
  }

  resultados.textContent = texto;
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  if (nombres.length >= 10) {
    mensaje.textContent = "Ya se ingresaron los 10 alumnos del curso.";
    return;
  }

  let nombre = document.getElementById("nombre").value.trim();
  let texto1 = document.getElementById("c1").value;
  let texto2 = document.getElementById("c2").value;
  let texto3 = document.getElementById("c3").value;

  if (nombre === "") {
    mensaje.textContent = "Por favor, escribe el nombre del alumno.";
    return;
  }

  if (texto1 === "" || texto2 === "" || texto3 === "") {
    mensaje.textContent = "Completa las tres notas.";
    return;
  }

  let n1 = Number(texto1);
  let n2 = Number(texto2);
  let n3 = Number(texto3);

  if (n1 < 0 || n1 > 100 || n2 < 0 || n2 > 100 || n3 < 0 || n3 > 100) {
    mensaje.textContent = "Las notas deben estar entre 0 y 100.";
    return;
  }

  nombres.push(nombre);
  notas.push([n1, n2, n3]);

  document.getElementById("nombre").value = "";
  document.getElementById("c1").value = "";
  document.getElementById("c2").value = "";
  document.getElementById("c3").value = "";

  mensaje.textContent = "Alumno agregado correctamente.";
  contador.textContent = "Alumnos registrados: " + nombres.length + " / 10";

  mostrarResultados();
});
