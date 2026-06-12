/*
  Banco interno de preguntas del simulador.
  No es JSON externo: cada pregunta se adiciona aquí como objeto JavaScript.
*/

const QUESTION_BANK = [
  {
    uid: "s1-mat-001",
    session: 1,
    block: 1,
    number: 1,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Estadística descriptiva",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 1",
    stem: "En la siguiente tabla se evidencian los resultados de una entrevista realizada a siete mujeres, madres de familia, en donde se les preguntó a qué edad tuvieron su primer hijo.",
    resources: [
      {
        type: "table",
        caption: "Resultados de la entrevista",
        headers: ["Madre", "Edad (años)"],
        rows: [
          ["1", "21"],
          ["2", "26"],
          ["3", "20"],
          ["4", "21"],
          ["5", "22"],
          ["6", "28"],
          ["7", "30"]
        ]
      }
    ],
    prompt: "A partir de la información suministrada, ¿cuál es el promedio de las edades?",
    options: [
      { letter: "A", text: "18" },
      { letter: "B", text: "22" },
      { letter: "C", text: "24" },
      { letter: "D", text: "28" }
    ],
    correctAnswer: "C",
    explanation: "El promedio se obtiene sumando las siete edades y dividiendo entre 7: 21 + 26 + 20 + 21 + 22 + 28 + 30 = 168. Luego, 168 ÷ 7 = 24. Por tanto, la respuesta correcta es C."
  }
  ,
  {
    uid: "s1-mat-002",
    session: 1,
    block: 1,
    number: 2,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Aritmética y modelación con porcentajes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 2",
    stem: "Una aerolínea ofrece vuelos nacionales manejando las siguientes tarifas y aclarando que, al precio relacionado, se debe agregar el impuesto del 12 % o 19 % según la temporada del año seleccionada para el viaje.",
    resources: [
      {
        type: "html",
        html: `
          <div class="icfes-fare-card">
            <div class="table-wrap icfes-table-wrap">
              <table class="data-table fare-table" aria-label="Tarifas de trayecto nacional">
                <thead>
                  <tr>
                    <th></th>
                    <th>Costo de lunes, martes, miércoles o jueves</th>
                    <th>Costo de viernes, sábado o domingo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Trayecto nacional</th>
                    <td>$80.000</td>
                    <td>$150.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Un usuario compra 5 tiquetes para viajar el día jueves y 2 tiquetes para viajar el día sábado, para lo que debe usar la fórmula:</p>
            <div class="formula-box">
              <span>Valor total a pagar</span>
              <strong>=</strong>
              <span>(5 × 80.000 + 2 × 150.000)(1 + y)</span>
            </div>
            <p>Donde <em>y</em> es el porcentaje del impuesto.</p>
          </div>
        `
      }
    ],
    prompt: "Sobre el valor total a pagar, ¿cuál de las siguientes afirmaciones es verdadera?",
    options: [
      { letter: "A", text: "Es posible calcular el valor total a pagar, ya que se aplica el impuesto del 12 % a los tiquetes comprados para el día jueves y el impuesto del 19 % a los tiquetes para el día sábado." },
      { letter: "B", text: "No es posible calcular el valor total a pagar, ya que el impuesto del 12 % y 19 % dependen de la temporada del año, y esta se desconoce." },
      { letter: "C", text: "Es posible calcular el valor total a pagar, ya que se ejecuta la multiplicación entre la cantidad de tiquetes comprados para cada día y el valor respectivo." },
      { letter: "D", text: "No es posible calcular el valor total a pagar, ya que falta conocer la tarifa correspondiente para asignar el valor de los tiquetes para el día jueves y sábado." }
    ],
    correctAnswer: "B",
    explanation: "La fórmula permite calcular el valor base de los tiquetes: 5 × 80.000 + 2 × 150.000. Sin embargo, para hallar el valor total se necesita conocer el valor de y, que representa el impuesto aplicable. Como el impuesto puede ser 12 % o 19 % según la temporada y la temporada no se informa, no es posible determinar un único valor total. Por tanto, la respuesta correcta es B."
  }
  ,
  {
    uid: "s1-mat-003",
    session: 1,
    block: 1,
    number: 3,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Conjuntos, tablas y diagramas de Venn",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 3",
    stem: "Un laboratorio aplicó un tratamiento médico a 60 pacientes y registró en un diagrama los tres efectos secundarios que padecieron algunos de ellos.",
    resources: [
      {
        type: "html",
        html: `
          <div class="icfes-venn-card">
            <figure class="venn-figure" aria-label="Diagrama de Venn con efectos secundarios: dolor de cabeza, mareo y náuseas">
              <svg class="venn-svg" viewBox="0 0 560 360" role="img" aria-labelledby="vennTitle vennDesc">
                <title id="vennTitle">Diagrama de efectos secundarios</title>
                <desc id="vennDesc">Diagrama de Venn con dolor de cabeza, mareo y náuseas. Las regiones muestran 10, 8, 5, 6, 1, 15 y 15 pacientes.</desc>
                <rect x="15" y="15" width="530" height="330" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="235" cy="145" r="82" class="venn-circle"/>
                <circle cx="345" cy="145" r="82" class="venn-circle"/>
                <circle cx="290" cy="230" r="82" class="venn-circle"/>

                <line x1="62" y1="105" x2="150" y2="105" class="venn-line"/>
                <line x1="150" y1="105" x2="158" y2="125" class="venn-line"/>
                <text x="45" y="96" class="venn-label">Dolor de cabeza</text>

                <line x1="492" y1="105" x2="430" y2="105" class="venn-line"/>
                <line x1="430" y1="105" x2="420" y2="125" class="venn-line"/>
                <text x="465" y="96" class="venn-label right">Mareo</text>

                <line x1="90" y1="280" x2="190" y2="280" class="venn-line"/>
                <line x1="190" y1="280" x2="218" y2="250" class="venn-line"/>
                <text x="65" y="270" class="venn-label">Náuseas</text>

                <text x="193" y="142" class="venn-number">10</text>
                <text x="290" y="126" class="venn-number">8</text>
                <text x="385" y="142" class="venn-number">5</text>
                <text x="245" y="205" class="venn-number">6</text>
                <text x="335" y="205" class="venn-number">1</text>
                <text x="282" y="268" class="venn-number">15</text>
                <text x="448" y="268" class="venn-number">15</text>
                <text x="425" y="315" class="venn-caption">Diagrama</text>
              </svg>
            </figure>

            <p>Luego, un médico del laboratorio registró la información en una tabla de la siguiente manera.</p>

            <div class="table-wrap icfes-table-wrap">
              <table class="data-table symptoms-table" aria-label="Efectos secundarios después del tratamiento">
                <thead>
                  <tr>
                    <th colspan="2">Efectos secundarios después del tratamiento</th>
                  </tr>
                  <tr>
                    <th>Efecto secundario</th>
                    <th>Cantidad de pacientes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dolor de cabeza</td>
                    <td>24</td>
                  </tr>
                  <tr>
                    <td>Náuseas</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td>Mareo</td>
                    <td>14</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      }
    ],
    prompt: "¿Es válida la información que registró el médico en la tabla?",
    options: [
      { letter: "A", text: "No, porque en el diagrama se evidencia que el efecto secundario que más presentaron los pacientes fue el de náuseas." },
      { letter: "B", text: "Sí, porque la cantidad de pacientes que presentó cada síntoma, según la tabla, coincide con la cantidad de pacientes que indica el diagrama." },
      { letter: "C", text: "Sí, porque la cantidad de pacientes a los que se les aplicó el tratamiento, según el diagrama, coincide con la suma de las frecuencias que se presentan en la tabla." },
      { letter: "D", text: "No, porque falta tener en cuenta la cantidad de pacientes que presentaron los tres efectos secundarios." }
    ],
    correctAnswer: "B",
    explanation: "La tabla sí coincide con el diagrama: dolor de cabeza = 10 + 8 + 6 = 24; náuseas = 6 + 15 + 1 = 22; mareo = 8 + 5 + 1 = 14. Por eso, la información registrada es válida y la respuesta correcta es B."
  }


  ,
  {
    uid: "s1-mat-004",
    session: 1,
    block: 1,
    number: 4,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Conteo y organización de casos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 4",
    stem: "En una clase de Inglés hay 6 estudiantes, 4 son mujeres y 2 son hombres. Para una exposición, el profesor quiere conformar grupos de 3 estudiantes.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <p>En la tabla, X, Y, Z, y W representan la cantidad de formas que tiene el profesor para escoger cada grupo de 3 estudiantes.</p>
            <table class="data-table" aria-label="Tabla de grupos y características">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Grupo 1</th>
                  <th>Grupo 2</th>
                  <th>Grupo 3</th>
                  <th>Grupo 4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Característica</th>
                  <td>Tres hombres</td>
                  <td>Una mujer y dos hombres</td>
                  <td>Dos mujeres y un hombre</td>
                  <td>Tres mujeres</td>
                </tr>
                <tr>
                  <th>Cantidad de formas de escoger el grupo</th>
                  <td>X</td>
                  <td>Y</td>
                  <td>Z</td>
                  <td>W</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con los datos de la tabla, ¿cuáles valores se deben conocer para determinar la cantidad total de formas que hay para escoger un grupo de 3 estudiantes en donde, al menos, uno de ellos sea hombre?",
    options: [
      { letter: "A", text: "Solamente Z." },
      { letter: "B", text: "Solamente Z y W." },
      { letter: "C", text: "Solamente X." },
      { letter: "D", text: "Solamente Y y Z." }
    ],
    correctAnswer: "D",
    explanation: "Para que en el grupo de 3 estudiantes haya al menos un hombre, se deben contar los grupos con una mujer y dos hombres (Y) y los grupos con dos mujeres y un hombre (Z). El grupo de tres mujeres (W) no cumple la condición, y el grupo de tres hombres (X) no es posible porque en la clase solo hay 2 hombres. Por tanto, la respuesta correcta es D."
  }

  ,
  {
    uid: "s1-mat-005",
    session: 1,
    block: 1,
    number: 5,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Proporcionalidad y operaciones multiplicativas",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 5",
    stem: "Un banco organizó un concurso para premiar a los usuarios que más utilizan las tarjetas de crédito. La tabla muestra el tipo de premio, la cantidad de premios que se entregó de cada tipo y el monto correspondiente a cada tipo de premio.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Tabla de premios del banco">
              <thead>
                <tr>
                  <th>Tipo de premio</th>
                  <th>Cantidad de premios</th>
                  <th>Monto de cada premio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Oro</td>
                  <td>5</td>
                  <td>$10.000.000</td>
                </tr>
                <tr>
                  <td>Plata</td>
                  <td>25</td>
                  <td>$5.000.000</td>
                </tr>
                <tr>
                  <td>Bronce</td>
                  <td>100</td>
                  <td>$1.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes tablas muestra el total de dinero entregado por el banco para cada tipo de premio?",
    options: [
      {
        letter: "A",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción A">
              <thead>
                <tr><th>Tipo de premio</th><th>Dinero entregado</th></tr>
              </thead>
              <tbody>
                <tr><td>Oro</td><td>$10.000.000</td></tr>
                <tr><td>Plata</td><td>$5.000.000</td></tr>
                <tr><td>Bronce</td><td>$1.000.000</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción B">
              <thead>
                <tr><th>Tipo de premio</th><th>Dinero entregado</th></tr>
              </thead>
              <tbody>
                <tr><td>Oro</td><td>$50.000.000</td></tr>
                <tr><td>Plata</td><td>$125.000.000</td></tr>
                <tr><td>Bronce</td><td>$100.000.000</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción C">
              <thead>
                <tr><th>Tipo de premio</th><th>Dinero entregado</th></tr>
              </thead>
              <tbody>
                <tr><td>Oro</td><td>$1.000.000.000</td></tr>
                <tr><td>Plata</td><td>$125.000.000</td></tr>
                <tr><td>Bronce</td><td>$5.000.000</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción D">
              <thead>
                <tr><th>Tipo de premio</th><th>Dinero entregado</th></tr>
              </thead>
              <tbody>
                <tr><td>Oro</td><td>$50.000.000</td></tr>
                <tr><td>Plata</td><td>$100.000.000</td></tr>
                <tr><td>Bronce</td><td>$125.000.000</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "B",
    explanation: "Se multiplica la cantidad de premios por el monto de cada premio: Oro = 5 × 10.000.000 = 50.000.000; Plata = 25 × 5.000.000 = 125.000.000; Bronce = 100 × 1.000.000 = 100.000.000. La tabla correcta es la opción B."
  }

  ,
  {
    uid: "s1-mat-006",
    session: 1,
    block: 1,
    number: 6,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Patrones numéricos y progresiones geométricas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 6",
    stem: "Los miembros de una familia deciden ahorrar dinero para comprar una bicicleta que cuesta $750.000. Ellos acuerdan ahorrar $50.000 el primer mes y duplicar el ahorro cada mes hasta completar el valor de la bicicleta. Para calcular la cantidad de meses que la familia debe ahorrar, se puede usar el siguiente procedimiento:",
    resources: [
      {
        type: "html",
        html: `
          <div class="procedure-card">
            <p><strong>Paso 1.</strong> Dividir $750.000 entre $50.000.</p>
            <p><strong>Paso 2.</strong> Encontrar el valor de <em>x</em> tal que la suma de 2<sup>0</sup> + 2<sup>1</sup> + &middot;&middot;&middot; + 2<sup>x</sup> sea igual al resultado obtenido en el paso 1.</p>
            <p><strong>Paso 3.</strong> Sumar 1 al valor de <em>x</em> encontrado en el paso 2.</p>
          </div>
        `
      }
    ],
    prompt: "¿Cuántos meses debe ahorrar la familia para comprar la bicicleta?",
    options: [
      { letter: "A", text: "16" },
      { letter: "B", text: "8" },
      { letter: "C", text: "4" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "C",
    explanation: "Primero, 750.000 ÷ 50.000 = 15. Luego se busca x tal que 2⁰ + 2¹ + 2² + 2³ = 1 + 2 + 4 + 8 = 15, por lo tanto x = 3. Finalmente, se suma 1: 3 + 1 = 4. La familia debe ahorrar durante 4 meses, así que la respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-007",
    session: 1,
    block: 1,
    number: 7,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Porcentajes y estrategias de cálculo",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 7",
    stem: "Alberto tiene un salario mensual de $800.000 y quiere ahorrar, cada mes, el 2 % de su sueldo para comprar una trompeta. Para determinar cuánto dinero ahorrará cada mes, realizó los siguientes cálculos:",
    resources: [
      {
        type: "html",
        html: `
          <div class="procedure-card">
            <ul class="bullet-procedure">
              <li>8 × 2 = 16</li>
              <li>Como 800.000 tiene 5 ceros a la derecha, solo considera 3, y forma el número 1.000</li>
              <li>Finalmente, con los dos valores anteriores forma el número 16.000</li>
            </ul>
          </div>
          <div class="question-resource extra-text">
            <p>Esto quiere decir que Alberto ahorrará $16.000 cada mes. Estefanía quiere comprar una guitarra y planea seguir la misma estrategia de Alberto, pero ella tiene un sueldo mensual de $900.000 y quiere ahorrar, cada mes, el 3 %.</p>
          </div>
        `
      }
    ],
    prompt: "Si Estefanía ahorra durante 10 meses consecutivos, ¿cuánto dinero ahorrará en total?",
    options: [
      { letter: "A", text: "$297.000" },
      { letter: "B", text: "$270.000" },
      { letter: "C", text: "$240.000" },
      { letter: "D", text: "$180.000" }
    ],
    correctAnswer: "B",
    explanation: "El 3 % de $900.000 es $27.000. Si Estefanía ahorra esa cantidad durante 10 meses, entonces ahorrará 27.000 × 10 = $270.000. Por lo tanto, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-mat-008",
    session: 1,
    block: 1,
    number: 8,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Lectura y comparación de tablas y gráficas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 8",
    stem: "El Departamento Administrativo Nacional de Estadística (DANE) realiza cada año mediciones de la pobreza en Colombia para determinar el índice de pobreza multidimensional (IPM). La tabla muestra la “incidencia de la pobreza por el IPM” para algunas regiones entre 2011 y 2015.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Incidencia de la pobreza por el IPM">
              <thead>
                <tr>
                  <th>Año</th>
                  <th>Pacífica</th>
                  <th>Antioquia</th>
                  <th>Bogotá, D. C.</th>
                  <th>Central</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2011</td><td>41,4</td><td>25,7</td><td>11,9</td><td>30,7</td></tr>
                <tr><td>2012</td><td>36,3</td><td>21,7</td><td>11,1</td><td>26,7</td></tr>
                <tr><td>2013</td><td>37,6</td><td>22,4</td><td>8,7</td><td>26,1</td></tr>
                <tr><td>2014</td><td>34,6</td><td>19,5</td><td>5,4</td><td>28,1</td></tr>
                <tr><td>2015</td><td>33,8</td><td>18,7</td><td>4,7</td><td>22,1</td></tr>
              </tbody>
            </table>
            <p class="resource-footnote">Fuente: DANE</p>
          </div>
          <div class="question-resource">
            <p>La gráfica muestra la “incidencia de la pobreza por el IPM” para algunas regiones entre 2011 y 2015.</p>
            <figure class="chart-card">
              <svg class="linechart-svg" viewBox="0 0 640 420" role="img" aria-label="Gráfica de líneas de incidencia de pobreza por IPM para Pacífica, Antioquia, Bogotá D. C. y Central entre 2011 y 2015">
                <rect x="55" y="25" width="540" height="300" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <g class="chart-grid">
                  <line x1="55" y1="325" x2="595" y2="325"/>
                  <line x1="55" y1="265" x2="595" y2="265"/>
                  <line x1="55" y1="205" x2="595" y2="205"/>
                  <line x1="55" y1="145" x2="595" y2="145"/>
                  <line x1="55" y1="85" x2="595" y2="85"/>
                  <line x1="55" y1="25" x2="595" y2="25"/>
                  <line x1="55" y1="25" x2="55" y2="325"/>
                  <line x1="190" y1="25" x2="190" y2="325"/>
                  <line x1="325" y1="25" x2="325" y2="325"/>
                  <line x1="460" y1="25" x2="460" y2="325"/>
                  <line x1="595" y1="25" x2="595" y2="325"/>
                </g>
                <g class="chart-labels">
                  <text x="22" y="329">0</text>
                  <text x="15" y="269">10</text>
                  <text x="15" y="209">20</text>
                  <text x="15" y="149">30</text>
                  <text x="15" y="89">40</text>
                  <text x="15" y="29">45</text>

                  <text x="42" y="357">2011</text>
                  <text x="177" y="357">2012</text>
                  <text x="312" y="357">2013</text>
                  <text x="447" y="357">2014</text>
                  <text x="582" y="357">2015</text>
                </g>

                <g class="series pacifica">
                  <polyline points="55,49 190,83 325,74 460,94 595,101" fill="none" stroke-width="3"/>
                  <circle cx="55" cy="49" r="4"/><circle cx="190" cy="83" r="4"/><circle cx="325" cy="74" r="4"/><circle cx="460" cy="94" r="4"/><circle cx="595" cy="101" r="4"/>
                  <text x="80" y="48">41,4</text><text x="214" y="82">36,3</text><text x="349" y="73">37,6</text><text x="484" y="93">34,6</text><text x="548" y="100">33,8</text>
                </g>

                <g class="series central">
                  <polyline points="55,120 190,148 325,168 460,157 595,192" fill="none" stroke-width="3"/>
                  <circle cx="55" cy="120" r="4"/><circle cx="190" cy="148" r="4"/><circle cx="325" cy="168" r="4"/><circle cx="460" cy="157" r="4"/><circle cx="595" cy="192" r="4"/>
                  <text x="77" y="119">30,7</text><text x="212" y="147">26,7</text><text x="347" y="167">26,1</text><text x="482" y="156">28,1</text><text x="548" y="191">22,1</text>
                </g>

                <g class="series antioquia">
                  <polyline points="55,153 190,188 325,202 460,195 595,213" fill="none" stroke-width="3"/>
                  <polygon points="55,148 60,158 50,158"/><polygon points="190,183 195,193 185,193"/><polygon points="325,197 330,207 320,207"/><polygon points="460,190 465,200 455,200"/><polygon points="595,208 600,218 590,218"/>
                  <text x="68" y="151">25,7</text><text x="202" y="186">20,5</text><text x="337" y="200">18,3</text><text x="472" y="193">19,5</text><text x="548" y="211">18,7</text>
                </g>

                <g class="series bogota">
                  <polyline points="55,246 190,251 325,272 460,292 595,279" fill="none" stroke-width="3"/>
                  <circle cx="55" cy="246" r="4"/><circle cx="190" cy="251" r="4"/><circle cx="325" cy="272" r="4"/><circle cx="460" cy="292" r="4"/><circle cx="595" cy="279" r="4"/>
                  <text x="77" y="244">11,9</text><text x="212" y="249">11,1</text><text x="347" y="270">8,7</text><text x="482" y="290">5,4</text><text x="555" y="277">7,6</text>
                </g>

                <g class="chart-legend">
                  <text x="80" y="18">Pacífica</text>
                  <text x="225" y="18">Antioquia</text>
                  <text x="350" y="18">Bogotá, D. C.</text>
                  <text x="515" y="18">Central</text>
                </g>
              </svg>
              <figcaption class="resource-footnote">Fuente: DANE</figcaption>
            </figure>
          </div>
        `
      }
    ],
    prompt: "¿La información de los datos de la gráfica es la misma que la información presentada en la tabla?",
    options: [
      { letter: "A", text: "Sí, porque la información incluida en la gráfica es semejante a la información presentada en la tabla, para las regiones en mención." },
      { letter: "B", text: "No, porque, en vez de graficar los datos de Antioquia, se graficaron los datos de la región Central." },
      { letter: "C", text: "No, porque los datos de la gráfica de Antioquia para 2012 y 2013, y de Bogotá, D. C. para 2015, son diferentes a los datos presentados en la tabla." },
      { letter: "D", text: "Sí, porque los datos de la gráfica de Antioquia para 2013 y de la región Central para 2012 corresponden a los datos presentados en la tabla." }
    ],
    correctAnswer: "C",
    explanation: "La gráfica no coincide completamente con la tabla. En Antioquia, la tabla muestra 21,7 para 2012 y 22,4 para 2013, pero en la gráfica aparecen 20,5 y 18,3. Además, para Bogotá, D. C. en 2015 la tabla muestra 4,7 y en la gráfica aparece 7,6. Por eso, la respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-009",
    session: 1,
    block: 1,
    number: 9,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Lectura e interpretación de tablas y gráficas estadísticas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 9",
    stem: "Una máquina separa las 2.000 papas de un bulto de acuerdo con su peso p, obteniendo los datos de la tabla.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Tabla de peso y cantidad de papas">
              <thead>
                <tr>
                  <th>Peso (gramos)</th>
                  <th>Cantidad de papas</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>15 ≤ p &lt; 20</td><td>700</td></tr>
                <tr><td>20 ≤ p &lt; 25</td><td>500</td></tr>
                <tr><td>25 ≤ p &lt; 30</td><td>800</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la gráfica que representa la distribución de las papas del bulto de acuerdo con su peso?",
    options: [
      {
        letter: "A",
        text: `
          <div class="graph-option">
            <div class="graph-title">Distribución del peso en gramos</div>
            <svg class="mini-chart" viewBox="0 0 280 170" role="img" aria-label="Opción A, gráfico circular">
              <circle cx="95" cy="85" r="60" fill="#f2f2f2" stroke="#666" stroke-width="1"/>
              <path d="M95 85 L95 25 A60 60 0 0 1 152.1 103.5 Z" fill="#2f6bd8" opacity="0.85"/>
              <path d="M95 85 L152.1 103.5 A60 60 0 0 1 59.7 133.5 Z" fill="#8a8f98" opacity="0.9"/>
              <path d="M95 85 L59.7 133.5 A60 60 0 0 1 95 25 Z" fill="#d7dbe3"/>
              <text x="110" y="68">700</text>
              <text x="112" y="83">35 %</text>
              <text x="93" y="124">500</text>
              <text x="90" y="139">25 %</text>
              <text x="50" y="74">800</text>
              <text x="48" y="89">40 %</text>
              <rect x="178" y="40" width="14" height="14" fill="#d7dbe3" stroke="#666"/>
              <text x="198" y="51">25 ≤ p &lt; 30</text>
              <rect x="178" y="66" width="14" height="14" fill="#2f6bd8" stroke="#666"/>
              <text x="198" y="77">15 ≤ p &lt; 20</text>
              <rect x="178" y="92" width="14" height="14" fill="#8a8f98" stroke="#666"/>
              <text x="198" y="103">20 ≤ p &lt; 25</text>
            </svg>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="graph-option">
            <div class="graph-title">Distribución del peso en gramos</div>
            <svg class="mini-chart" viewBox="0 0 280 170" role="img" aria-label="Opción B, gráfico circular con tercios iguales">
              <circle cx="95" cy="85" r="60" fill="#f2f2f2" stroke="#666" stroke-width="1"/>
              <path d="M95 85 L95 25 A60 60 0 0 1 147 115 Z" fill="#2f6bd8" opacity="0.85"/>
              <path d="M95 85 L147 115 A60 60 0 0 1 43 115 Z" fill="#8a8f98" opacity="0.9"/>
              <path d="M95 85 L43 115 A60 60 0 0 1 95 25 Z" fill="#d7dbe3"/>
              <text x="102" y="67">15–20</text><text x="105" y="82">33,3 %</text>
              <text x="86" y="129">20–25</text><text x="90" y="144">33,3 %</text>
              <text x="40" y="67">25–30</text><text x="44" y="82">33,3 %</text>
              <rect x="178" y="40" width="14" height="14" fill="#d7dbe3" stroke="#666"/>
              <text x="198" y="51">25 ≤ p &lt; 30</text>
              <rect x="178" y="66" width="14" height="14" fill="#2f6bd8" stroke="#666"/>
              <text x="198" y="77">15 ≤ p &lt; 20</text>
              <rect x="178" y="92" width="14" height="14" fill="#8a8f98" stroke="#666"/>
              <text x="198" y="103">20 ≤ p &lt; 25</text>
            </svg>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="graph-option">
            <svg class="mini-chart" viewBox="0 0 280 180" role="img" aria-label="Opción C, gráfico de barras del peso en gramos">
              <text x="55" y="18" class="chart-small-title">Distribución del peso en gramos</text>
              <line x1="40" y1="145" x2="240" y2="145" stroke="currentColor" stroke-width="1.5"/>
              <line x1="40" y1="25" x2="40" y2="145" stroke="currentColor" stroke-width="1.5"/>
              <rect x="65" y="85" width="32" height="60" fill="#444"/>
              <rect x="125" y="85" width="32" height="60" fill="#444"/>
              <rect x="185" y="85" width="32" height="60" fill="#444"/>
              <text x="69" y="160">15–20</text>
              <text x="129" y="160">20–25</text>
              <text x="189" y="160">25–30</text>
              <text x="10" y="92">5</text>
              <text x="14" y="27">9</text>
              <text x="8" y="98" transform="rotate(-90 8,98)">Peso (gramos)</text>
              <text x="114" y="176">Intervalo</text>
            </svg>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="graph-option">
            <svg class="mini-chart" viewBox="0 0 280 180" role="img" aria-label="Opción D, gráfico de barras de cantidad de papas">
              <line x1="40" y1="145" x2="240" y2="145" stroke="currentColor" stroke-width="1.5"/>
              <line x1="40" y1="25" x2="40" y2="145" stroke="currentColor" stroke-width="1.5"/>
              <line x1="40" y1="115" x2="240" y2="115" stroke="#c8ccd3" stroke-width="1"/>
              <line x1="40" y1="85" x2="240" y2="85" stroke="#c8ccd3" stroke-width="1"/>
              <line x1="40" y1="55" x2="240" y2="55" stroke="#c8ccd3" stroke-width="1"/>
              <rect x="65" y="40" width="32" height="105" fill="#444"/>
              <rect x="125" y="70" width="32" height="75" fill="#444"/>
              <rect x="185" y="25" width="32" height="120" fill="#444"/>
              <text x="69" y="160">15–20</text>
              <text x="129" y="160">20–25</text>
              <text x="189" y="160">25–30</text>
              <text x="12" y="148">0</text>
              <text x="2" y="118">200</text>
              <text x="2" y="88">400</text>
              <text x="2" y="58">600</text>
              <text x="2" y="28">800</text>
              <text x="12" y="96" transform="rotate(-90 12,96)">Cantidad de papas</text>
              <text x="114" y="176">Intervalo</text>
            </svg>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "D",
    explanation: "La tabla muestra la cantidad de papas por intervalo de peso: 700 para 15 ≤ p < 20, 500 para 20 ≤ p < 25 y 800 para 25 ≤ p < 30. La única gráfica que representa directamente esas cantidades en el eje vertical y los intervalos en el eje horizontal es la opción D."
  }

  ,
  {
    uid: "s1-mat-010",
    session: 1,
    block: 1,
    number: 10,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Muestreo e inferencia estadística",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 10",
    stem: "Un candidato a la gobernación de un departamento quiere estimar el porcentaje de la población que votará por él. Para ello, contrata una firma encuestadora que realizará 1.000 llamadas telefónicas, en las que se preguntará por la preferencia de las personas a la hora de votar en las elecciones para gobernador. Para realizar la encuesta, la firma escoge aleatoriamente un municipio del departamento y llama a 1.000 personas de este lugar.",
    resources: [],
    prompt: "¿Por qué el resultado de la encuesta puede diferir mucho de la realidad?",
    options: [
      { letter: "A", text: "Porque la única manera de obtener resultados precisos es encuestar a toda la población del departamento." },
      { letter: "B", text: "Porque la encuesta solo representará la opinión de las personas del departamento, si el municipio escogido es el más grande." },
      { letter: "C", text: "Porque de esta manera solo están tomándose en cuenta las opiniones de la población de un municipio del departamento." },
      { letter: "D", text: "Porque la muestra es muy grande, lo cual permite que existan grandes diferencias entre las respuestas de las personas." }
    ],
    correctAnswer: "C",
    explanation: "El problema es que la muestra no representa adecuadamente a todo el departamento, porque las 1.000 personas encuestadas pertenecen solo a un municipio. Por eso, los resultados pueden diferir mucho de la realidad del departamento completo. La respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-011",
    session: 1,
    block: 1,
    number: 11,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Geometría y cálculo de áreas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 11",
    stem: "Una torta con forma rectangular, que tiene 60 cm de base por 20 cm de altura, fue repartida entre 8 personas por medio de los siguientes cortes rectos:",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card cake-figure">
            <svg class="cake-svg" viewBox="0 0 760 280" role="img" aria-label="Diagrama de una torta rectangular dividida en 8 trozos con medidas indicadas">
              <defs>
                <pattern id="cakePattern" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect width="12" height="12" fill="#ece3c8"/>
                  <path d="M1,10 C4,7 8,7 11,10" stroke="#c6b58d" stroke-width="1.2" fill="none"/>
                  <path d="M2,4 C4,2 7,2 10,5" stroke="#d2c39e" stroke-width="1.2" fill="none"/>
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>
              <rect x="140" y="40" width="480" height="160" rx="2" fill="url(#cakePattern)" stroke="currentColor" stroke-width="2"/>
              <line x1="140" y1="120" x2="620" y2="120" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="380" y1="40" x2="380" y2="200" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="260" y1="40" x2="260" y2="120" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="260" y1="120" x2="260" y2="200" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="500" y1="40" x2="500" y2="120" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="500" y1="120" x2="500" y2="200" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>

              <text x="555" y="72" class="cake-num">1</text>
              <text x="185" y="72" class="cake-num">2</text>
              <text x="185" y="165" class="cake-num">3</text>
              <text x="555" y="165" class="cake-num">4</text>
              <text x="472" y="72" class="cake-num">5</text>
              <text x="282" y="72" class="cake-num">6</text>
              <text x="282" y="165" class="cake-num">7</text>
              <text x="472" y="165" class="cake-num">8</text>

              <line x1="260" y1="60" x2="380" y2="60" stroke="currentColor" stroke-width="1.4" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="312" y="54" class="measure-label">15 cm</text>
              <line x1="380" y1="90" x2="500" y2="90" stroke="currentColor" stroke-width="1.4" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="432" y="84" class="measure-label">15 cm</text>
              <line x1="300" y1="40" x2="300" y2="120" stroke="currentColor" stroke-width="1.4" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="308" y="84" class="measure-label">5 cm</text>

              <line x1="380" y1="224" x2="620" y2="224" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="484" y="243" class="measure-label">30 cm</text>

              <line x1="645" y1="120" x2="645" y2="200" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="655" y="165" class="measure-label">10 cm</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "Considerando la información anterior, ¿cuál es el área del trozo de torta número 1?",
    options: [
      { letter: "A", text: "225 cm²" },
      { letter: "B", text: "150 cm²" },
      { letter: "C", text: "75 cm²" },
      { letter: "D", text: "40 cm²" }
    ],
    correctAnswer: "A",
    explanation: "El trozo 1 es un rectángulo ubicado en la parte superior derecha. Su base es 15 cm y su altura es 20 cm − 5 cm = 15 cm. Entonces, su área es 15 × 15 = 225 cm². Por lo tanto, la respuesta correcta es A."
  }

  ,
  {
    uid: "s1-mat-012",
    session: 1,
    block: 1,
    number: 12,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Magnitudes y unidades de medida",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 12",
    stem: "En la tabla se muestra el peso de tres pedidos de mercancía que una empresa necesita enviar a otro país:",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Peso de los pedidos">
              <thead>
                <tr>
                  <th></th>
                  <th>Peso</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Pedido 1</td><td>500 kg</td></tr>
                <tr><td>Pedido 2</td><td>200 kg</td></tr>
                <tr><td>Pedido 3</td><td>1 ton</td></tr>
              </tbody>
            </table>
            <p class="resource-footnote"><strong>Tabla.</strong> Peso de los pedidos.</p>
          </div>
          <div class="procedure-card">
            <p>Para saber el costo total del envío se debe calcular primero el peso total de los tres pedidos. Para esto, un empleado de la empresa efectúa el siguiente cálculo:</p>
            <p class="formula-inline">500 + 200 + 1 = 701 ton</p>
          </div>
        `
      }
    ],
    prompt: "Esta solución es",
    options: [
      { letter: "A", text: "incorrecta; el resultado debe estar dado en kg, ya que la mayoría de los valores están en esta unidad." },
      { letter: "B", text: "correcta; se suman correctamente los tres valores y se utiliza una de las unidades de los pedidos." },
      { letter: "C", text: "incorrecta; como los datos están en unidades diferentes, no pueden sumarse directamente." },
      { letter: "D", text: "correcta; el resultado se calcula bien y la unidad utilizada corresponde a la unidad de mayor peso." }
    ],
    correctAnswer: "C",
    explanation: "La solución es incorrecta porque los pesos están expresados en unidades diferentes: kilogramos y toneladas. Antes de sumar, es necesario convertir todas las cantidades a la misma unidad. Por eso, la respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-013",
    session: 1,
    block: 1,
    number: 13,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Geometría y cálculo de áreas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 13",
    stem: "Un pintor tiene un lienzo rectangular que quiere dividir en tres regiones: la región 1, que es triangular; la región 2, con forma de un cuarto de círculo; y la región 3, que ocupa el resto del lienzo, como se muestra en la figura.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card canvas-figure">
            <svg class="canvas-svg" viewBox="0 0 760 540" role="img" aria-label="Lienzo rectangular dividido en tres regiones con medidas indicadas">
              <defs>
                <marker id="arrowCanvas" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>

              <!-- Rectángulo principal -->
              <rect x="120" y="90" width="480" height="300" fill="#f8f5ea" stroke="currentColor" stroke-width="2"/>

              <!-- Línea diagonal -->
              <line x1="120" y1="270" x2="360" y2="90" stroke="currentColor" stroke-width="3"/>

              <!-- Arco cuarto de círculo -->
              <path d="M 360 90 A 240 240 0 0 1 600 330" fill="none" stroke="currentColor" stroke-width="3"/>

              <!-- Etiquetas regiones -->
              <text x="170" y="180" class="canvas-label">Región 1</text>
              <text x="470" y="180" class="canvas-label">Región 2</text>
              <text x="285" y="300" class="canvas-label">Región 3</text>

              <!-- Medidas superiores -->
              <line x1="120" y1="55" x2="360" y2="55" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="225" y="45" class="measure-label">4 m</text>
              <line x1="360" y1="55" x2="600" y2="55" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="465" y="45" class="measure-label">4 m</text>

              <!-- Medida izquierda vertical -->
              <line x1="82" y1="90" x2="82" y2="270" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="58" y="190" class="measure-label">3 m</text>

              <!-- Medida derecha vertical -->
              <line x1="640" y1="90" x2="640" y2="390" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="650" y="245" class="measure-label">5 m</text>

              <!-- Medida inferior -->
              <line x1="120" y1="430" x2="600" y2="430" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="340" y="452" class="measure-label">8 m</text>

              <!-- Medida diagonal -->
              <line x1="170" y1="255" x2="325" y2="138" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="240" y="210" class="measure-label" transform="rotate(-36 240,210)">5 m</text>
            </svg>
          </figure>
          <div class="procedure-card">
            <p>Para calcular el área de la región 3, el pintor realizó el siguiente procedimiento:</p>
            <p><strong>Paso 1.</strong> Calculó el área del lienzo, multiplicando 8 m × 5 m.</p>
            <p><strong>Paso 2.</strong> Calculó el área de la región 1, multiplicando 4 m × 3 m.</p>
            <p><strong>Paso 3.</strong> Calculó el área de la región 2, multiplicando π × 16 m² y dividiendo el resultado entre 4.</p>
            <p><strong>Paso 4.</strong> Al resultado del paso 1, le restó los resultados del paso 2 y del paso 3.</p>
          </div>
        `
      }
    ],
    prompt: "¿En cuál paso hay un error y cómo se puede corregir?",
    options: [
      { letter: "A", text: "En el paso 2, porque se debe multiplicar 3 m × 4 m × 5 m." },
      { letter: "B", text: "En el paso 3, porque se debe multiplicar 2π × 4 m y luego dividir entre 4." },
      { letter: "C", text: "En el paso 2, porque se debe multiplicar 4 m × 3 m y luego dividir entre 2." },
      { letter: "D", text: "En el paso 3, porque se debe multiplicar π × 4 m y luego dividir entre 4." }
    ],
    correctAnswer: "C",
    explanation: "El error está en el paso 2. La región 1 es un triángulo, por lo tanto su área no es 4 × 3, sino (4 × 3) ÷ 2 = 6 m². El paso 3 sí corresponde al área de un cuarto de círculo de radio 4 m: (π × 4²) ÷ 4. Por eso, la respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-014",
    session: 1,
    block: 1,
    number: 14,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Lectura de tablas y gráficas circulares",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 14",
    stem: "En una encuesta sobre la intención de voto para la elección de presidente en un país, se registraron los resultados que se observan en tabla y en la gráfica.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Tabla de intención de voto por candidato">
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Votos</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>E</td><td>2.000</td></tr>
                <tr><td>F</td><td>5.000</td></tr>
                <tr><td>G</td><td>4.500</td></tr>
                <tr><td>H</td><td>7.000</td></tr>
                <tr><td>I</td><td>3.400</td></tr>
              </tbody>
            </table>
            <p class="resource-footnote"><strong>Tabla</strong></p>
          </div>
          <figure class="chart-card vote-figure">
            <svg class="vote-svg" viewBox="0 0 520 360" role="img" aria-label="Gráfica circular con la intención de voto de los candidatos E, F, G, H e I">
              <defs>
                <pattern id="patE" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="10" height="10" fill="#f0f0f0"/>
                  <circle cx="5" cy="5" r="2.2" fill="#999"/>
                </pattern>
                <pattern id="patF" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
                  <rect width="10" height="10" fill="#111"/>
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#f5f5f5" stroke-width="3"/>
                </pattern>
                <pattern id="patG" width="8" height="8" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#6f6f6f"/>
                </pattern>
                <pattern id="patH" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect width="12" height="12" fill="#222"/>
                  <rect x="2" y="2" width="4" height="4" fill="#ddd"/>
                  <rect x="6" y="6" width="4" height="4" fill="#ddd"/>
                </pattern>
                <pattern id="patI" width="8" height="8" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#dcdcdc"/>
                </pattern>
              </defs>

              <!-- pie centered at 210,190 r=120 -->
              <path d="M210 190 L210 70 A120 120 0 0 1 245.8 75.5 Z" fill="url(#patE)" stroke="currentColor" stroke-width="1.2"/>
              <path d="M210 190 L245.8 75.5 A120 120 0 0 1 326.6 159 Z" fill="url(#patF)" stroke="currentColor" stroke-width="1.2"/>
              <path d="M210 190 L326.6 159 A120 120 0 0 1 238.6 306.6 Z" fill="url(#patG)" stroke="currentColor" stroke-width="1.2"/>
              <path d="M210 190 L238.6 306.6 A120 120 0 0 1 93.5 161.4 Z" fill="url(#patH)" stroke="currentColor" stroke-width="1.2"/>
              <path d="M210 190 L93.5 161.4 A120 120 0 0 1 210 70 Z" fill="url(#patI)" stroke="currentColor" stroke-width="1.2"/>

              <text x="316" y="84" class="measure-label">Candidato E</text>
              <line x1="282" y1="100" x2="348" y2="90" stroke="currentColor" stroke-width="1.2"/>

              <text x="356" y="153" class="measure-label">Candidato F</text>
              <line x1="305" y1="150" x2="348" y2="150" stroke="currentColor" stroke-width="1.2"/>

              <text x="334" y="226" class="measure-label">Candidato G</text>
              <line x1="286" y1="217" x2="348" y2="220" stroke="currentColor" stroke-width="1.2"/>

              <text x="38" y="222" class="measure-label">Candidato H</text>
              <line x1="118" y1="216" x2="68" y2="216" stroke="currentColor" stroke-width="1.2"/>

              <text x="76" y="74" class="measure-label">Candidato I</text>
              <line x1="140" y1="82" x2="68" y2="82" stroke="currentColor" stroke-width="1.2"/>

              <text x="170" y="345" class="measure-label">Gráfica</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "De acuerdo con lo anterior, ¿cuál de las siguientes afirmaciones es falsa?",
    options: [
      { letter: "A", text: "Con la información de la tabla se obtienen los datos de la gráfica." },
      { letter: "B", text: "Con la información de la gráfica se obtiene cuál es el candidato con mayor intención de voto." },
      { letter: "C", text: "Con la información de la gráfica se obtienen los datos de la tabla." },
      { letter: "D", text: "Con la información de la tabla se obtiene la proporción entre los votos por un candidato y el total." }
    ],
    correctAnswer: "C",
    explanation: "La gráfica permite comparar visualmente las proporciones y reconocer, por ejemplo, cuál candidato tiene mayor intención de voto. Sin embargo, a partir de la gráfica no se obtienen con precisión los datos exactos de la tabla. Por eso, la afirmación falsa es la opción C."
  }

  ,
  {
    uid: "s1-mat-015",
    session: 1,
    block: 1,
    number: 15,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Patrones y cambio",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 15",
    stem: "Un estudiante está ahorrando para un paseo que tiene un costo de $800.000; él empezó su ahorro en enero con $100.000, que su abuela le regaló, y, al final de cada mes, está ahorrando cierta cantidad de dinero. La tabla resume el progreso del ahorro del estudiante durante los primeros cuatro meses.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Progreso del ahorro del estudiante">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Dinero ahorrado al inicio de mes</th>
                  <th>Dinero ahorrado al finalizar el mes</th>
                  <th>Dinero que hace falta para completar el ahorro</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Enero</td><td>$100.000</td><td>$130.000</td><td>$670.000</td></tr>
                <tr><td>Febrero</td><td>$130.000</td><td>$160.000</td><td>$640.000</td></tr>
                <tr><td>Marzo</td><td>$160.000</td><td>$190.000</td><td>$610.000</td></tr>
                <tr><td>Abril</td><td>$190.000</td><td>$220.000</td><td>$580.000</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la tendencia del dinero ahorrado al finalizar cada mes?",
    options: [
      { letter: "A", text: "Disminuye $30.000 cada mes." },
      { letter: "B", text: "Aumenta $30.000 cada mes." },
      { letter: "C", text: "Aumenta $100.000 cada mes." },
      { letter: "D", text: "Disminuye $100.000 cada mes." }
    ],
    correctAnswer: "B",
    explanation: "El dinero ahorrado al finalizar cada mes es 130.000, 160.000, 190.000 y 220.000. En cada paso aumenta 30.000. Por tanto, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-mat-016",
    session: 1,
    block: 1,
    number: 16,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Estadística descriptiva",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 16",
    stem: "La tabla muestra el registro que llevó un mecánico automotriz de las piezas que tuvieron que reemplazarse durante el mantenimiento de tres vehículos.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Registro de piezas reemplazadas por vehículo">
              <thead>
                <tr>
                  <th>Vehículo</th>
                  <th>Número de piezas reemplazadas</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>6</td></tr>
                <tr><td>2</td><td>5</td></tr>
                <tr><td>3</td><td>10</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con esta información, ¿cuál es el promedio del número de piezas reemplazadas de los tres vehículos?",
    options: [
      { letter: "A", text: "21" },
      { letter: "B", text: "7" },
      { letter: "C", text: "10" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "B",
    explanation: "El promedio se calcula sumando los valores y dividiendo entre el número de vehículos: 6 + 5 + 10 = 21, y 21 ÷ 3 = 7. Por lo tanto, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-mat-017",
    session: 1,
    block: 1,
    number: 17,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Conjuntos y diagramas de Venn",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 17",
    stem: "La figura muestra la distribución de los tipos de transporte que utilizan 160 personas para llegar al trabajo. Algunas personas usan únicamente un medio de transporte, otras dos, y otras tres.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card transport-figure">
            <svg class="transport-svg" viewBox="0 0 620 390" role="img" aria-label="Diagrama de Venn de los tipos de transporte usados para llegar al trabajo">
              <circle cx="245" cy="150" r="105" class="transport-circle"/>
              <circle cx="375" cy="150" r="105" class="transport-circle"/>
              <circle cx="310" cy="245" r="105" class="transport-circle"/>

              <text x="98" y="62" class="transport-label">Carro</text>
              <text x="92" y="88" class="transport-label">privado</text>
              <text x="425" y="68" class="transport-label">Bicicleta</text>
              <text x="428" y="315" class="transport-label">Transporte</text>
              <text x="428" y="341" class="transport-label">público</text>

              <text x="210" y="150" class="transport-number">35</text>
              <text x="402" y="150" class="transport-number">50</text>
              <text x="302" y="307" class="transport-number">10</text>
              <text x="303" y="132" class="transport-number">20</text>
              <text x="260" y="226" class="transport-number">15</text>
              <text x="357" y="226" class="transport-number">25</text>
              <text x="307" y="203" class="transport-number">5</text>

              <text x="500" y="286" class="figure-label">Figura</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "Si se necesita saber la cantidad total de personas que se transportan en bicicleta, ¿cuáles son los datos que se deben sumar?",
    options: [
      { letter: "A", text: "5, 15, 20 y 25." },
      { letter: "B", text: "5 y 20." },
      { letter: "C", text: "25, 35 y 50." },
      { letter: "D", text: "5, 20, 25 y 50." }
    ],
    correctAnswer: "D",
    explanation: "Para saber la cantidad total de personas que se transportan en bicicleta, se deben sumar todas las regiones que están dentro del círculo de bicicleta: solo bicicleta 50, carro privado y bicicleta 20, bicicleta y transporte público 25, y los tres medios 5. Por tanto, la respuesta correcta es D."
  }

  ,
  {
    uid: "s1-mat-018",
    session: 1,
    block: 1,
    number: 18,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Patrones, variación y crecimiento exponencial",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 18",
    stem: "El fundador de una empresa de procesadores identificó que el número de transistores de un procesador del tipo X se duplicó cada dos años.",
    resources: [],
    prompt: "Si en el 2010 el procesador tipo X tenía 10.000 transistores, ¿cuántos transistores tenía el procesador tipo X en el 2016?",
    options: [
      { letter: "A", text: "20.000 transistores." },
      { letter: "B", text: "40.000 transistores." },
      { letter: "C", text: "60.000 transistores." },
      { letter: "D", text: "80.000 transistores." }
    ],
    correctAnswer: "D",
    explanation: "Del 2010 al 2016 transcurren 6 años. Como el número de transistores se duplica cada 2 años, hay 3 duplicaciones: 2012, 2014 y 2016. Entonces, 10.000 × 2 × 2 × 2 = 80.000. Por tanto, la respuesta correcta es D."
  }

  ,
  {
    uid: "s1-mat-019",
    session: 1,
    block: 1,
    number: 19,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Geometría, áreas y procedimientos equivalentes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 19",
    stem: "Un jardín con forma cuadrada, de vértices EFGH, tiene de lado x + y. Otro cuadrado de vértices PQRS está inscrito en el cuadrado EFGH, de tal manera que la distancia más cercana entre dos vértices consecutivos mide x.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card garden-figure">
            <svg class="garden-svg" viewBox="0 0 720 600" role="img" aria-label="Cuadrado EFGH con un cuadrado PQRS inscrito y cuatro regiones triangulares sombreadas">
              <defs>
                <pattern id="gardenShade" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="10" height="10" fill="#e2e2e2"/>
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#c4c4c4" stroke-width="2"/>
                </pattern>
                <marker id="gardenArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>

              <!-- Cuadrado exterior EFGH -->
              <rect x="130" y="90" width="420" height="420" fill="#fafafa" stroke="currentColor" stroke-width="3"/>

              <!-- Regiones sombreadas -->
              <polygon points="130,90 250,90 130,370" fill="url(#gardenShade)" stroke="none"/>
              <polygon points="250,90 550,210 550,90" fill="url(#gardenShade)" stroke="none"/>
              <polygon points="130,370 430,510 130,510" fill="url(#gardenShade)" stroke="none"/>
              <polygon points="550,210 550,510 430,510" fill="url(#gardenShade)" stroke="none"/>

              <!-- Cuadrado interior PQRS -->
              <polygon points="250,90 550,210 430,510 130,370" fill="#ffffff" stroke="currentColor" stroke-width="4"/>

              <!-- Vértices exteriores -->
              <circle cx="130" cy="90" r="9" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="550" cy="90" r="9" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="550" cy="510" r="9" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="130" cy="510" r="9" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="250" cy="90" r="8" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="550" cy="210" r="8" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="430" cy="510" r="8" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="130" cy="370" r="8" fill="#fff" stroke="currentColor" stroke-width="3"/>

              <!-- Letras de vértices -->
              <text x="105" y="78" class="garden-label">E</text>
              <text x="565" y="78" class="garden-label">F</text>
              <text x="565" y="535" class="garden-label">G</text>
              <text x="105" y="535" class="garden-label">H</text>
              <text x="252" y="78" class="garden-label">P</text>
              <text x="565" y="216" class="garden-label">Q</text>
              <text x="424" y="535" class="garden-label">R</text>
              <text x="103" y="375" class="garden-label">S</text>

              <!-- Medidas sobre los lados -->
              <text x="180" y="78" class="measure-label">x</text>
              <text x="395" y="78" class="measure-label">y</text>
              <text x="330" y="48" class="measure-label">x + y</text>

              <text x="570" y="150" class="measure-label">x</text>
              <text x="570" y="365" class="measure-label">y</text>
              <text x="610" y="305" class="measure-label">x + y</text>

              <text x="258" y="538" class="measure-label">y</text>
              <text x="485" y="538" class="measure-label">x</text>

              <text x="96" y="235" class="measure-label">y</text>
              <text x="96" y="448" class="measure-label">x</text>

              <!-- Marcas de dimensión principales -->
              <line x1="130" y1="55" x2="550" y2="55" stroke="currentColor" stroke-width="1.5" marker-start="url(#gardenArrow)" marker-end="url(#gardenArrow)"/>
              <line x1="610" y1="90" x2="610" y2="510" stroke="currentColor" stroke-width="1.5" marker-start="url(#gardenArrow)" marker-end="url(#gardenArrow)"/>
            </svg>
          </figure>
          <div class="procedure-card">
            <p>Para encontrar una fórmula que corresponda al área de la región sombreada, el jardinero propuso los siguientes pasos:</p>
            <p><strong>Paso 1.</strong> Escoger uno de los cuatro triángulos sombreados y multiplicar la medida de la altura por la medida de la base.</p>
            <p><strong>Paso 2.</strong> Dividir entre 2 el resultado obtenido en el paso 1.</p>
            <p><strong>Paso 3.</strong> Multiplicar por 4 el resultado del paso anterior.</p>
            <p><strong>Paso 4.</strong> Sumar cuatro veces el resultado del paso 2.</p>
          </div>
        `
      }
    ],
    prompt: "De los pasos propuestos, ¿cuál es redundante para el cálculo del área de la región sombreada?",
    options: [
      { letter: "A", text: "El paso 4, porque, al sumar cuatro veces el resultado del paso 2, se obtiene el resultado del paso 3." },
      { letter: "B", text: "El paso 3, porque, al multiplicar por 4 el resultado del paso 2 se obtiene el mismo resultado obtenido en el paso 1." },
      { letter: "C", text: "El paso 2, porque, al dividir entre 2 el resultado del paso 1, se obtiene el mismo resultado del paso 3." },
      { letter: "D", text: "El paso 1, porque, al multiplicar la altura de uno de los triángulos por la base, se obtiene el área total de la figura." }
    ],
    correctAnswer: "A",
    explanation: "El paso 4 es redundante porque sumar cuatro veces el resultado del paso 2 equivale exactamente a multiplicar por 4 ese mismo resultado, que es lo que ya se hizo en el paso 3. Por tanto, la respuesta correcta es A."
  }

  ,
  {
    uid: "s1-mat-020",
    session: 1,
    block: 1,
    number: 20,
    area: "Matemáticas",
    competencia: "Argumentación",
    componente: "Álgebra, factorización y modelación",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 20",
    stem: "Al entrar a un túnel, un carro que lleva una velocidad de 10 m/s acelera a 3 m/s² durante 15 segundos, que es lo que dura recorriéndolo. La longitud del túnel se puede calcular mediante la siguiente fórmula:",
    resources: [
      {
        type: "html",
        html: `
          <div class="icfes-formula-comparison">
            <div class="formula-box formula-box-wide" aria-label="Fórmula inicial">
              <span>Longitud</span>
              <strong>=</strong>
              <span>(10 m/s)(15 s) + 1/2(3 m/s²)(15 s)²</span>
            </div>
            <p>Al ver la fórmula, una persona afirma que esta es equivalente a:</p>
            <div class="formula-box formula-box-wide" aria-label="Fórmula equivalente propuesta">
              <span>Longitud</span>
              <strong>=</strong>
              <span>15 s × (10 m/s + 1/2(3 m/s²))</span>
            </div>
          </div>
        `
      }
    ],
    prompt: "¿Es verdadera la afirmación de la persona?",
    options: [
      { letter: "A", text: "Sí, porque lo que hizo fue factorizar el tiempo que tarda en recorrer el túnel." },
      { letter: "B", text: "No, porque omitió que hay unos 15 segundos elevados al cuadrado." },
      { letter: "C", text: "Sí, porque el exponente 2, al que está elevado el tiempo, se puede cancelar." },
      { letter: "D", text: "No, porque también se tiene que factorizar el fraccionario 1/2." }
    ],
    correctAnswer: "B",
    explanation: "La afirmación no es verdadera. Al factorizar 15 s, el segundo término debe conservar otro factor 15 s, porque (15 s)² = (15 s)(15 s). La forma equivalente sería 15 s × [10 m/s + 1/2(3 m/s²)(15 s)]. La expresión propuesta omitió ese factor; por tanto, la respuesta correcta es B."
  }


  ,
  {
    uid: "s1-mat-021",
    session: 1,
    block: 1,
    number: 21,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Conversión de unidades y proporcionalidad",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 21",
    stem: "Arturo quiere calcular el tiempo que se necesita para descargar un archivo de internet que tiene un tamaño de 12,6 megabytes. Él sabe que en su computador la velocidad de descarga es de 300 kilobytes por segundo y que 1 megabyte equivale a 1.024 kilobytes.",
    resources: [],
    prompt: "¿Cuál de los siguientes procedimientos NO permite calcular el tiempo necesario para descargar el archivo?",
    options: [
      {
        letter: "A",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Multiplicar 12,6 por 1.024</p>
            <p><strong>Paso 2.</strong> Dividir el resultado del paso 1 entre 300</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Multiplicar 1.024 por 300</p>
            <p><strong>Paso 2.</strong> Dividir el resultado del paso 1 entre 12,6</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 12,6 entre 300</p>
            <p><strong>Paso 2.</strong> Multiplicar el resultado del paso 1 por 1.024</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 1.024 entre 300</p>
            <p><strong>Paso 2.</strong> Multiplicar el resultado del paso 1 por 12,6</p>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "B",
    explanation: "Para calcular el tiempo, primero se convierte el tamaño del archivo a kilobytes: 12,6 × 1.024. Luego se divide entre la velocidad de descarga, 300 kilobytes por segundo. Los procedimientos A, C y D son formas equivalentes de hacer esa operación. El procedimiento B no permite calcular el tiempo porque multiplica 1.024 por 300 y luego divide entre 12,6, lo cual no corresponde a tamaño dividido entre velocidad. Por tanto, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-mat-022",
    session: 1,
    block: 1,
    number: 22,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Proporcionalidad y semejanza de triángulos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 22",
    stem: "Una persona construyó una rampa, como se muestra en la figura, pero se necesita un refuerzo para evitar que esta se parta. Para esto, a dos metros del muro, se va a construir una columna que fortalezca la estructura.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card ramp-figure">
            <svg class="ramp-svg" viewBox="0 0 820 310" role="img" aria-label="Rampa apoyada en un muro de 3 metros, con longitud horizontal de 4 metros y columna a 2 metros del muro de altura h">
              <defs>
                <pattern id="wallHatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="10" height="10" fill="#e8e2d6"/>
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#555" stroke-width="3"/>
                </pattern>
                <marker id="rampArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>

              <!-- Piso -->
              <line x1="170" y1="235" x2="735" y2="235" stroke="currentColor" stroke-width="3"/>

              <!-- Muro -->
              <rect x="90" y="55" width="100" height="180" fill="url(#wallHatch)" stroke="currentColor" stroke-width="2"/>
              <line x1="190" y1="55" x2="190" y2="235" stroke="currentColor" stroke-width="3"/>

              <!-- Rampa -->
              <polygon points="190,55 735,235 728,245 183,66" fill="#f4f4f4" stroke="currentColor" stroke-width="2"/>
              <line x1="190" y1="55" x2="735" y2="235" stroke="currentColor" stroke-width="3"/>

              <!-- Columna a 2 m -->
              <line x1="462" y1="145" x2="462" y2="235" stroke="currentColor" stroke-width="4"/>
              <text x="475" y="195" class="measure-label">h</text>

              <!-- Medida vertical 3m -->
              <line x1="65" y1="55" x2="65" y2="235" stroke="currentColor" stroke-width="1.7" marker-start="url(#rampArrow)" marker-end="url(#rampArrow)"/>
              <line x1="70" y1="55" x2="90" y2="55" stroke="currentColor" stroke-width="1.3"/>
              <line x1="70" y1="235" x2="90" y2="235" stroke="currentColor" stroke-width="1.3"/>
              <text x="35" y="150" class="measure-label">3 m</text>

              <!-- Medida 2m desde el muro hasta la columna -->
              <line x1="190" y1="218" x2="462" y2="218" stroke="currentColor" stroke-width="1.5" marker-start="url(#rampArrow)" marker-end="url(#rampArrow)"/>
              <text x="315" y="210" class="measure-label">2 m</text>

              <!-- Medida 4m total -->
              <line x1="190" y1="268" x2="735" y2="268" stroke="currentColor" stroke-width="1.7" marker-start="url(#rampArrow)" marker-end="url(#rampArrow)"/>
              <line x1="190" y1="242" x2="190" y2="278" stroke="currentColor" stroke-width="1.3"/>
              <line x1="735" y1="242" x2="735" y2="278" stroke="currentColor" stroke-width="1.3"/>
              <text x="445" y="292" class="measure-label">4 m</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes procedimientos permite calcular la altura h que debe tener la columna?",
    options: [
      {
        letter: "A",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 2 m entre 4 m, obteniendo 0,5.</p>
            <p><strong>Paso 2.</strong> Dividir 3 m entre el valor calculado en el paso 1.</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 4 m entre 2 m, obteniendo 0,5.</p>
            <p><strong>Paso 2.</strong> Multiplicar 3 m por el valor calculado en el paso 1.</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 4 m entre 2 m, obteniendo 2.</p>
            <p><strong>Paso 2.</strong> Dividir 3 m entre el valor calculado en el paso 1.</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 2 m entre 4 m, obteniendo 2.</p>
            <p><strong>Paso 2.</strong> Multiplicar 3 m por el valor calculado en el paso 1.</p>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "C",
    explanation: "La rampa forma triángulos semejantes. La columna está a 2 m del muro y la base total mide 4 m; por tanto, la razón es 4 ÷ 2 = 2. La altura correspondiente es 3 m ÷ 2 = 1,5 m. El procedimiento correcto es el de la opción C."
  }

  ,
  {
    uid: "s1-mat-023",
    session: 1,
    block: 1,
    number: 23,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Coordenadas polares",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 23",
    stem: "En la gráfica se muestra la ubicación, en coordenadas polares, de cuatro aviones (V, W, X, Y) respecto a la torre de control de un aeropuerto.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card polar-figure">
            <svg class="polar-svg" viewBox="0 0 760 430" role="img" aria-label="Ubicación de cuatro aviones en coordenadas polares respecto a la torre de control">
              <defs>
                <marker id="arrowPolar23" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>

              <g class="polar-grid">
                <circle cx="370" cy="250" r="45"/>
                <circle cx="370" cy="250" r="90"/>
                <circle cx="370" cy="250" r="135"/>
                <circle cx="370" cy="250" r="180"/>
                <line x1="370" y1="250" x2="685" y2="250"/>
                <line x1="370" y1="250" x2="292" y2="115"/>
                <line x1="370" y1="250" x2="370" y2="60"/>
                <line x1="370" y1="250" x2="465" y2="85"/>
                <line x1="370" y1="250" x2="535" y2="155"/>
                <line x1="370" y1="250" x2="55" y2="250"/>
                <line x1="370" y1="250" x2="205" y2="155"/>
                <line x1="370" y1="250" x2="535" y2="345"/>
                <line x1="370" y1="250" x2="205" y2="345"/>
              </g>

              <line x1="65" y1="250" x2="705" y2="250" stroke="currentColor" stroke-width="3" marker-end="url(#arrowPolar23)"/>
              <circle cx="370" cy="250" r="7" class="polar-point"/>
              <text x="245" y="278" class="polar-axis-label">Torre de control (polo)</text>
              <text x="615" y="278" class="polar-axis-label">Eje polar</text>

              <g class="polar-airplanes">
                <circle cx="190" cy="250" r="7" class="polar-point"/>
                <text x="70" y="236" class="polar-label">X (60 km, 180°)</text>

                <circle cx="370" cy="190" r="7" class="polar-point"/>
                <text x="392" y="175" class="polar-label">W (20 km, 90°)</text>

                <circle cx="448" cy="205" r="7" class="polar-point"/>
                <text x="476" y="213" class="polar-label">V (30 km, 30°)</text>

                <circle cx="430" cy="146" r="7" class="polar-point"/>
                <text x="452" y="130" class="polar-label">Y (40 km, 60°)</text>
              </g>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "Si las coordenadas polares de un punto son de la forma (r, θ), donde r es la distancia al polo y θ es el ángulo respecto al eje polar, ¿cuál es el orden de los aviones, del que está más cerca al que está más lejos de la torre de control?",
    options: [
      { letter: "A", text: "W, V, Y, X." },
      { letter: "B", text: "X, V, W, Y." },
      { letter: "C", text: "V, Y, W, X." },
      { letter: "D", text: "X, Y, V, W." }
    ],
    correctAnswer: "A",
    explanation: "En coordenadas polares, el valor r indica la distancia al polo, es decir, a la torre de control. Las distancias son: W = 20 km, V = 30 km, Y = 40 km y X = 60 km. Por tanto, el orden del avión más cercano al más lejano es W, V, Y, X. La respuesta correcta es A."
  }

  ,
  {
    uid: "s1-mat-024",
    session: 1,
    block: 1,
    number: 24,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Secuencias, operaciones y números enteros",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 24",
    stem: "Kevin trabaja en una farmacia que entrega medicamentos a domicilio. Los días viernes, Kevin tiene la posibilidad de salir tres horas antes de su trabajo, pero la condición es que debe repartir los pedidos que hacen falta por entregar y que estén ubicados en la ruta que toma hacia su casa. Por ejemplo, el último viernes que salió tuvo que entregar un total de cuatro pedidos.",
    resources: [
      {
        type: "html",
        html: `
          <div class="route-card">
            <p class="route-intro">La ruta de entregas del último viernes fue la siguiente:</p>
            <ol class="route-steps">
              <li>Para entregar el primer pedido, tuvo que avanzar <strong>3 cuadras</strong>.</li>
              <li>Para entregar el segundo pedido, tuvo que avanzar el <strong>doble</strong> de cuadras de las que había hecho para entregar el primer pedido.</li>
              <li>Para llegar a la dirección del tercer pedido, tuvo que avanzar la <strong>mitad</strong> de cuadras que avanzó para entregar el pedido anterior.</li>
              <li>Para el último pedido, tuvo que <strong>regresarse 10 cuadras</strong> y, así, acabar su ruta de entregas.</li>
              <li>Después de terminar las entregas, solo tuvo que caminar <strong>1 cuadra</strong> para llegar a su casa.</li>
            </ol>
            <div class="route-line" aria-label="Esquema de avances y retroceso de la ruta">
              <span class="route-node">Farmacia</span>
              <span class="route-arrow">+3</span>
              <span class="route-node">Pedido 1</span>
              <span class="route-arrow">+6</span>
              <span class="route-node">Pedido 2</span>
              <span class="route-arrow">+3</span>
              <span class="route-node">Pedido 3</span>
              <span class="route-arrow back">−10</span>
              <span class="route-node">Pedido 4</span>
              <span class="route-arrow">+1</span>
              <span class="route-node home">Casa</span>
            </div>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes operaciones permite obtener la distancia que hay desde la farmacia hasta la casa de Kevin?",
    options: [
      { letter: "A", text: "3 + 3 + 3 − 10 + 1" },
      { letter: "B", text: "3 + 6 + 6 + 10" },
      { letter: "C", text: "3 + 6 + 3 − 10 + 1" },
      { letter: "D", text: "6 + 3 + 10 − 1" }
    ],
    correctAnswer: "C",
    explanation: "Para el primer pedido avanzó 3 cuadras. Para el segundo avanzó el doble: 2 × 3 = 6 cuadras. Para el tercero avanzó la mitad de lo anterior: 6 ÷ 2 = 3 cuadras. Luego se regresó 10 cuadras, por eso se resta 10. Finalmente caminó 1 cuadra hasta su casa, por eso se suma 1. La operación correcta es 3 + 6 + 3 − 10 + 1, que corresponde a la opción C."
  }


  ,
  {
    uid: "s1-mat-025",
    session: 1,
    block: 1,
    number: 25,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Números decimales y orden en la recta numérica",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 25",
    stem: "La presión pleural se genera entre algunas paredes de los pulmones en el proceso de respiración del ser humano. Al respecto, se midió la presión pleural de cuatro pacientes para determinar el orden en que deben recibir un tratamiento pulmonar.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Presión pleural de cuatro pacientes">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Presión pleural (cmH₂O)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Santiago</td><td>−7,6</td></tr>
                <tr><td>Ximena</td><td>−7,09</td></tr>
                <tr><td>Mariana</td><td>−7,62</td></tr>
                <tr><td>Orlando</td><td>−7,53</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "Para determinar el orden en que los pacientes van a recibir el tratamiento médico, se les debe ordenar de menor a mayor según su presión pleural. ¿Cuál de las siguientes tablas indica el orden en que deben recibir el tratamiento los pacientes?",
    options: [
      {
        letter: "A",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción A">
              <thead>
                <tr><th>Orden en que se va a recibir el tratamiento</th><th>Paciente</th></tr>
              </thead>
              <tbody>
                <tr><td>Primero</td><td>Ximena</td></tr>
                <tr><td>Segundo</td><td>Mariana</td></tr>
                <tr><td>Tercero</td><td>Santiago</td></tr>
                <tr><td>Cuarto</td><td>Orlando</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción B">
              <thead>
                <tr><th>Orden en que se va a recibir el tratamiento</th><th>Paciente</th></tr>
              </thead>
              <tbody>
                <tr><td>Primero</td><td>Orlando</td></tr>
                <tr><td>Segundo</td><td>Santiago</td></tr>
                <tr><td>Tercero</td><td>Mariana</td></tr>
                <tr><td>Cuarto</td><td>Ximena</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción C">
              <thead>
                <tr><th>Orden en que se va a recibir el tratamiento</th><th>Paciente</th></tr>
              </thead>
              <tbody>
                <tr><td>Primero</td><td>Mariana</td></tr>
                <tr><td>Segundo</td><td>Santiago</td></tr>
                <tr><td>Tercero</td><td>Orlando</td></tr>
                <tr><td>Cuarto</td><td>Ximena</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción D">
              <thead>
                <tr><th>Orden en que se va a recibir el tratamiento</th><th>Paciente</th></tr>
              </thead>
              <tbody>
                <tr><td>Primero</td><td>Santiago</td></tr>
                <tr><td>Segundo</td><td>Ximena</td></tr>
                <tr><td>Tercero</td><td>Mariana</td></tr>
                <tr><td>Cuarto</td><td>Orlando</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "C",
    explanation: "Para ordenar de menor a mayor con números negativos, el menor es el que está más alejado hacia la izquierda en la recta numérica. Así, −7,62 < −7,6 < −7,53 < −7,09. Por tanto, el orden correcto es: Mariana, Santiago, Orlando y Ximena. La respuesta correcta es C."
  }

  ,
  {
    uid: "s1-lect-026",
    session: 1,
    block: 2,
    number: 26,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Paráfrasis y sentido local",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 26",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


        `
      }
    ],
    prompt: "¿Cuál de las siguientes opciones es una paráfrasis correcta del segundo párrafo del texto?",
    options: [
      { letter: "A", text: "Para Epicuro hay dos formas de concebir la vida: aquella que busca el placer y aquella que busca evitar el dolor del nacimiento." },
      { letter: "B", text: "Para Epicuro hay dos formas en la que todo ser vivo concibe la buena vida: la primera es la búsqueda del dolor y la segunda es huir del placer." },
      { letter: "C", text: "Para Epicuro todos buscamos alcanzar una buena vida sin pensar en el dolor o en el placer. Desde que nacemos obramos guiados por el instinto." },
      { letter: "D", text: "Para Epicuro son ciertas dos cosas: que todos buscamos el placer y rechazamos el dolor, y que los sentimientos son los que determinan nuestras decisiones." }
    ],
    correctAnswer: "D",
    explanation: "El segundo párrafo presenta dos razones: todos los seres vivos buscan placer y rechazan el dolor por instinto, y los sentimientos de placer y dolor sirven como criterios reales para decidir y actuar. La opción D conserva esas ideas sin cambiar su sentido."
  }

  ,
  {
    uid: "s1-lect-027",
    session: 1,
    block: 2,
    number: 27,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre enunciados",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 27",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


          <div class="fragment-card">
            <p><strong>Lea los siguientes dos enunciados tomados del texto:</strong></p>
            <ol class="numbered-statements">
              <li>La filosofía epicúrea tiene una finalidad ética, pues pretende guiarnos para alcanzar la buena vida.</li>
              <li>Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor.</li>
            </ol>
          </div>
        `
      }
    ],
    prompt: "¿Qué relación hay entre ambos enunciados?",
    options: [
      { letter: "A", text: "El primer enunciado rechaza la idea expuesta en el segundo enunciado." },
      { letter: "B", text: "El segundo enunciado es una síntesis del primer enunciado." },
      { letter: "C", text: "El primer enunciado da una hipótesis y el segundo enunciado la refuta." },
      { letter: "D", text: "El segundo enunciado amplía lo dicho en el primer enunciado." }
    ],
    correctAnswer: "D",
    explanation: "El primer enunciado afirma que la filosofía epicúrea busca orientar hacia la buena vida. El segundo amplía esa idea al explicar que, para el epicureísmo, la buena vida es placentera y busca placer evitando dolor."
  }

  ,
  {
    uid: "s1-lect-028",
    session: 1,
    block: 2,
    number: 28,
    area: "Lectura Crítica",
    competencia: "Argumentación",
    componente: "Identificación de argumentos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 28",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


          <div class="fragment-card">
            <p><strong>Lea el siguiente fragmento tomado del texto:</strong></p>
            <blockquote>“Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que lo sentimos”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Por qué el enunciado anterior puede ser considerado un argumento a favor de la tesis de que el fin último de todas las acciones humanas es conseguir placer y evitar dolor?",
    options: [
      { letter: "A", text: "Porque justifica la idea de que el dolor y el placer son reales e inevitables al momento de elegir la forma en la que actuamos." },
      { letter: "B", text: "Porque ejemplifica la teoría de que el placer y el dolor son criterios de decisión al ser sentimientos reales que tiene todo ser humano." },
      { letter: "C", text: "Porque explica que el fin último de todas las acciones humanas consiste en relacionar el placer con el bien y el dolor con el mal." },
      { letter: "D", text: "Porque relaciona los sentimientos reales de dolor y de placer existentes instintivamente en el ser humano con los conceptos de bien y de mal." }
    ],
    correctAnswer: "B",
    explanation: "El fragmento funciona como argumento porque muestra que placer y dolor son sentimientos reales y, por eso, pueden orientar la conducta y las decisiones humanas. Esta idea corresponde a la opción B."
  }

  ,
  {
    uid: "s1-lect-029",
    session: 1,
    block: 2,
    number: 29,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Perspectiva e inferencia",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 29",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


          <div class="fragment-card">
            <p><strong>Considere el siguiente fragmento del texto:</strong></p>
            <blockquote>“Esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes enunciados presenta una perspectiva similar a la del fragmento?",
    options: [
      { letter: "A", text: "“El comportamiento del ser humano puede ser moldeado de acuerdo con las experiencias agradables y desagradables que se desprenden de cada acción”. B. F. Skinner." },
      { letter: "B", text: "“No hay ninguna diferencia fundamental entre el hombre y los animales en su capacidad de sentir placer y dolor, felicidad y miseria”. C. Darwin." },
      { letter: "C", text: "“La felicidad es un fin cuya posibilidad descansa en condiciones que solo pueden ser esperadas de la naturaleza, es decir, los medios para la felicidad propia están en la naturaleza tanto externa como interna”. I. Kant." },
      { letter: "D", text: "“No se trata de concebir el placer como asunto único y verdadero de felicidad, sino de hallar la mejor manera para alcanzar la virtud que es universal y que no se supedita a la sensibilidad”. I. Kant." }
    ],
    correctAnswer: "A",
    explanation: "El fragmento sostiene que la búsqueda del placer y la evitación del dolor guían la conducta. La opción A presenta una perspectiva semejante, pues relaciona el comportamiento con experiencias agradables y desagradables."
  }

  ,
  {
    uid: "s1-lect-030",
    session: 1,
    block: 2,
    number: 30,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Intención comunicativa",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 30",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


          <div class="fragment-card">
            <p><strong>Lea la siguiente pregunta tomada del texto:</strong></p>
            <blockquote>“¿cómo podría ser falsa la sensación de dolor ante un golpe?”</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la intención del autor con esa pregunta?",
    options: [
      { letter: "A", text: "Advertir sobre el peligro de dolor ante una decisión." },
      { letter: "B", text: "Dar la orden de huir del dolor ante un golpe." },
      { letter: "C", text: "Afirmar la idea de que no se puede dudar del dolor." },
      { letter: "D", text: "Expresar que los dolores pueden inventarse." }
    ],
    correctAnswer: "C",
    explanation: "La pregunta es retórica: no busca una respuesta literal, sino reforzar la idea de que la sensación de dolor es real y no puede ponerse en duda. Por eso, la opción correcta es C."
  }


  ,
  {
    uid: "s1-lect-031",
    session: 1,
    block: 2,
    number: 31,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Supuestos e inferencia",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 31",
    stem: "Responda de acuerdo con el texto sobre los sofistas y la educación práctica.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 31 Y 32 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Los sofistas y la educación práctica</h3>
            <p>Auténticas bestias negras para Platón, los sofistas fueron unos filósofos y educadores que dominaron la escena intelectual de Atenas a finales del siglo IV a. C. De hecho, la palabra “sofista” no tenía entonces la connotación peyorativa que tiene hoy y que debemos, en buena medida, a la mala imagen que de ellos transmitió Platón. Sofista significaba simplemente “profesor”, y con el término se designaba a una serie de educadores que se ganaban la vida instruyendo jóvenes a cambio de una retribución.</p>
            <p>Eran dos los elementos de la sofística que despertaban el recelo, por decir lo menos, entre una nutrida parte de la población griega. El primero de ellos residía en que, contrario a los sabios de antaño, los sofistas no reunían en torno a sí a un grupo de discípulos por el mero placer de difundir sus ideas, sino que cobraban y vivían de ello. Esto, que probablemente hoy no nos parezca grave, era visto con escándalo por los sectores más esnobs y aristocráticos de la polis. En definitiva, y sin que hayan cambiado las cosas, los que despreciaban el “vil metal” eran precisamente aquellos que lo tenían garantizado y no tenían necesidad de ganárselo.</p>
            <p>En segundo lugar, y también como diferencia sustancial con los modelos del pasado, la educación impartida por los sofistas no tenía el objetivo teórico de alcanzar y descubrir la verdad, sino que su finalidad era eminentemente práctica: adquirir las técnicas necesarias para imponer el propio argumento. En efecto, en la democracia ateniense, regida con un sistema de participación directa de los ciudadanos en los asuntos de la polis, y con abundantes litigios y juicios, la capacidad de desenvolverse con habilidad en el arte de la palabra era imprescindible para el éxito en la política. En este contexto nacieron y se multiplicaron los sofistas, como maestros de la retórica y la oratoria cuya principal preocupación fue desarrollar y transmitir las técnicas necesarias para defender y convencer al público de un planteamiento, independientemente de que este fuera verdadero o no, moral o inmoral. Este énfasis práctico los condujo con frecuencia a posiciones escépticas o relativistas: no existía una verdad con mayúsculas, sino que todo dependía del punto de vista, de los usos y costumbres, de la fuerza de los argumentos. Para Protágoras “el hombre es la medida de todas las cosas” y, para Gorgias, nada existía; si existiera, sería incognoscible, y si existiera y fuera cognoscible, sería incomunicable.</p>
            <p class="reading-source">Tomado y adaptado de: Dal Maschio, E. (2016). <em>Platón. La verdad está en otra parte.</em> Emse Publishing.</p>
          </div>


        `
      }
    ],
    prompt: "¿Qué supuesto se encuentra presente en el tercer párrafo del texto?",
    options: [
      { letter: "A", text: "Que la búsqueda de la verdad no es un fin práctico." },
      { letter: "B", text: "Que la participación política en la actualidad no es alta." },
      { letter: "C", text: "Que los sofistas engañaban a sus discípulos con técnicas retóricas." },
      { letter: "D", text: "Que la búsqueda teórica de la verdad puede ayudar a vencer en un juicio." }
    ],
    correctAnswer: "A",
    explanation: "El tercer párrafo afirma que la educación sofista no buscaba alcanzar la verdad, sino desarrollar técnicas prácticas para imponer argumentos y convencer al público. Por eso, el supuesto presente es que la búsqueda de la verdad no constituye, en ese contexto, un fin práctico."
  }

  ,
  {
    uid: "s1-lect-032",
    session: 1,
    block: 2,
    number: 32,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación lógica entre afirmaciones",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 32",
    stem: "Responda de acuerdo con el texto sobre los sofistas y la educación práctica.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 31 Y 32 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Los sofistas y la educación práctica</h3>
            <p>Auténticas bestias negras para Platón, los sofistas fueron unos filósofos y educadores que dominaron la escena intelectual de Atenas a finales del siglo IV a. C. De hecho, la palabra “sofista” no tenía entonces la connotación peyorativa que tiene hoy y que debemos, en buena medida, a la mala imagen que de ellos transmitió Platón. Sofista significaba simplemente “profesor”, y con el término se designaba a una serie de educadores que se ganaban la vida instruyendo jóvenes a cambio de una retribución.</p>
            <p>Eran dos los elementos de la sofística que despertaban el recelo, por decir lo menos, entre una nutrida parte de la población griega. El primero de ellos residía en que, contrario a los sabios de antaño, los sofistas no reunían en torno a sí a un grupo de discípulos por el mero placer de difundir sus ideas, sino que cobraban y vivían de ello. Esto, que probablemente hoy no nos parezca grave, era visto con escándalo por los sectores más esnobs y aristocráticos de la polis. En definitiva, y sin que hayan cambiado las cosas, los que despreciaban el “vil metal” eran precisamente aquellos que lo tenían garantizado y no tenían necesidad de ganárselo.</p>
            <p>En segundo lugar, y también como diferencia sustancial con los modelos del pasado, la educación impartida por los sofistas no tenía el objetivo teórico de alcanzar y descubrir la verdad, sino que su finalidad era eminentemente práctica: adquirir las técnicas necesarias para imponer el propio argumento. En efecto, en la democracia ateniense, regida con un sistema de participación directa de los ciudadanos en los asuntos de la polis, y con abundantes litigios y juicios, la capacidad de desenvolverse con habilidad en el arte de la palabra era imprescindible para el éxito en la política. En este contexto nacieron y se multiplicaron los sofistas, como maestros de la retórica y la oratoria cuya principal preocupación fue desarrollar y transmitir las técnicas necesarias para defender y convencer al público de un planteamiento, independientemente de que este fuera verdadero o no, moral o inmoral. Este énfasis práctico los condujo con frecuencia a posiciones escépticas o relativistas: no existía una verdad con mayúsculas, sino que todo dependía del punto de vista, de los usos y costumbres, de la fuerza de los argumentos. Para Protágoras “el hombre es la medida de todas las cosas” y, para Gorgias, nada existía; si existiera, sería incognoscible, y si existiera y fuera cognoscible, sería incomunicable.</p>
            <p class="reading-source">Tomado y adaptado de: Dal Maschio, E. (2016). <em>Platón. La verdad está en otra parte.</em> Emse Publishing.</p>
          </div>


        

          <div class="fragment-card">
            <p><strong>Considere las siguientes afirmaciones del texto:</strong></p>
            <ol>
              <li>“no existía una verdad con mayúsculas, sino que todo dependía del punto de vista, de los usos y costumbres, de la fuerza de los argumentos”.</li>
              <li>“nada existía; si existiera, sería incognoscible, y si existiera y fuera cognoscible, sería incomunicable”.</li>
            </ol>
          </div>
        `
      }
    ],
    prompt: "La afirmación 1 NO justifica la afirmación 2 por la siguiente razón:",
    options: [
      { letter: "A", text: "Que todo dependa del punto de vista y la cultura prueba que nada existe." },
      { letter: "B", text: "Que todo dependa del punto de vista y la cultura no prueba que nada existe." },
      { letter: "C", text: "Que el hombre sea la medida de todas las cosas prueba que hay muchas verdades universales." },
      { letter: "D", text: "Que el hombre sea la medida de todas las cosas muestra que no dependen del punto de vista de alguien." }
    ],
    correctAnswer: "B",
    explanation: "La primera afirmación expresa una postura relativista: la verdad depende del punto de vista, la cultura y los argumentos. Sin embargo, de esa idea no se sigue necesariamente la tesis radical de que nada existe. Por eso, la opción B explica correctamente por qué la afirmación 1 no justifica la afirmación 2."
  }

  ,
  {
    uid: "s1-lect-033",
    session: 1,
    block: 2,
    number: 33,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Léxico en contexto",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 33",
    stem: "Responda de acuerdo con el texto “Ética para Amador (fragmento)”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 33 A 35 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Ética para Amador (fragmento)</h3>
            <p>Quieres darte la buena vida: estupendo. Pero también quieres que esa buena vida no sea la buena vida de una coliflor o de un escarabajo, con todo mi respeto para ambas especies, sino una buena vida humana. Es lo que te corresponde, creo yo. Y estoy seguro de que a ello no renunciarías por nada del mundo. <em>Ser humano</em>, ya lo hemos indicado antes, consiste principalmente en tener relaciones con los otros seres humanos.</p>
            <p>Si pudieras tener muchísimo dinero, una casa más lujosa que un palacio de las mil y una noches, las mejores ropas, los más exquisitos alimentos —en tu caso, muchísimas lentejas—, los más sofisticados aparatos, etc., pero todo ello a costa de no volver a ver ni a ser visto por ningún ser humano jamás, ¿estarías contento? ¿Cuánto tiempo podrías vivir así sin volverte loco? ¿No es la mayor de las locuras querer las cosas a costa de la relación con las personas?</p>
            <p>¡Pero si precisamente la gracia de todas esas cosas radica en que te permiten —o parecen permitirte— relacionarte más favorablemente con los demás! Por medio del dinero se espera poder deslumbrar o comprar a los otros: las ropas son para gustarles o para que nos envidien; y lo mismo la buena casa, los mejores vinos, etcétera. Muy pocas cosas conservan su gracia en la soledad; y si la soledad es completa y definitiva, todas las cosas resultan tristes inevitablemente. La buena vida humana es una buena vida entre seres humanos o de lo contrario puede que sea vida, pero no será ni buena ni humana.</p>
            <p class="reading-source">Tomado y adaptado de: Savater, F. (1991). <em>Ética para Amador.</em> Ariel.</p>
          </div>

        `
      }
    ],
    prompt: "Entre las siguientes opciones, ¿cuál podría reemplazar, sin cambiar el sentido, la palabra “deslumbrar” que aparece en la frase: “Por medio del dinero se espera poder deslumbrar o comprar a los otros [...]”?",
    options: [
      { letter: "A", text: "Encandilar." },
      { letter: "B", text: "Impresionar." },
      { letter: "C", text: "Ilusionar." },
      { letter: "D", text: "Engañar." }
    ],
    correctAnswer: "B",
    explanation: "En el contexto del texto, “deslumbrar” significa causar admiración o impresionar a los otros mediante el dinero o los bienes materiales. Por eso, la opción correcta es B."
  }

  ,
  {
    uid: "s1-lect-034",
    session: 1,
    block: 2,
    number: 34,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Función de fragmentos en el texto",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 34",
    stem: "Responda de acuerdo con el texto “Ética para Amador (fragmento)”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 33 A 35 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Ética para Amador (fragmento)</h3>
            <p>Quieres darte la buena vida: estupendo. Pero también quieres que esa buena vida no sea la buena vida de una coliflor o de un escarabajo, con todo mi respeto para ambas especies, sino una buena vida humana. Es lo que te corresponde, creo yo. Y estoy seguro de que a ello no renunciarías por nada del mundo. <em>Ser humano</em>, ya lo hemos indicado antes, consiste principalmente en tener relaciones con los otros seres humanos.</p>
            <p>Si pudieras tener muchísimo dinero, una casa más lujosa que un palacio de las mil y una noches, las mejores ropas, los más exquisitos alimentos —en tu caso, muchísimas lentejas—, los más sofisticados aparatos, etc., pero todo ello a costa de no volver a ver ni a ser visto por ningún ser humano jamás, ¿estarías contento? ¿Cuánto tiempo podrías vivir así sin volverte loco? ¿No es la mayor de las locuras querer las cosas a costa de la relación con las personas?</p>
            <p>¡Pero si precisamente la gracia de todas esas cosas radica en que te permiten —o parecen permitirte— relacionarte más favorablemente con los demás! Por medio del dinero se espera poder deslumbrar o comprar a los otros: las ropas son para gustarles o para que nos envidien; y lo mismo la buena casa, los mejores vinos, etcétera. Muy pocas cosas conservan su gracia en la soledad; y si la soledad es completa y definitiva, todas las cosas resultan tristes inevitablemente. La buena vida humana es una buena vida entre seres humanos o de lo contrario puede que sea vida, pero no será ni buena ni humana.</p>
            <p class="reading-source">Tomado y adaptado de: Savater, F. (1991). <em>Ética para Amador.</em> Ariel.</p>
          </div>

          <div class="fragment-card">
            <p><strong>Lea el siguiente fragmento del texto:</strong></p>
            <blockquote>“Quieres darte la buena vida: estupendo. Pero también quieres que esa buena vida no sea la buena vida de una coliflor o de un escarabajo, con todo mi respeto para ambas especies, sino una buena vida humana”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Qué función cumple este fragmento dentro del texto?",
    options: [
      { letter: "A", text: "Presenta la tesis general del texto." },
      { letter: "B", text: "Introduce el tema que se trata en el texto." },
      { letter: "C", text: "Expone la conclusión general del texto." },
      { letter: "D", text: "Sintetiza el contenido del texto." }
    ],
    correctAnswer: "B",
    explanation: "El fragmento inicial abre el tema de la buena vida humana y prepara el desarrollo posterior sobre la importancia de la relación con otros seres humanos. Por eso, cumple la función de introducir el tema del texto."
  }

  ,
  {
    uid: "s1-lect-035",
    session: 1,
    block: 2,
    number: 35,
    area: "Lectura Crítica",
    competencia: "Argumentación",
    componente: "Estrategias argumentativas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 35",
    stem: "Responda de acuerdo con el texto “Ética para Amador (fragmento)”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 33 A 35 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Ética para Amador (fragmento)</h3>
            <p>Quieres darte la buena vida: estupendo. Pero también quieres que esa buena vida no sea la buena vida de una coliflor o de un escarabajo, con todo mi respeto para ambas especies, sino una buena vida humana. Es lo que te corresponde, creo yo. Y estoy seguro de que a ello no renunciarías por nada del mundo. <em>Ser humano</em>, ya lo hemos indicado antes, consiste principalmente en tener relaciones con los otros seres humanos.</p>
            <p>Si pudieras tener muchísimo dinero, una casa más lujosa que un palacio de las mil y una noches, las mejores ropas, los más exquisitos alimentos —en tu caso, muchísimas lentejas—, los más sofisticados aparatos, etc., pero todo ello a costa de no volver a ver ni a ser visto por ningún ser humano jamás, ¿estarías contento? ¿Cuánto tiempo podrías vivir así sin volverte loco? ¿No es la mayor de las locuras querer las cosas a costa de la relación con las personas?</p>
            <p>¡Pero si precisamente la gracia de todas esas cosas radica en que te permiten —o parecen permitirte— relacionarte más favorablemente con los demás! Por medio del dinero se espera poder deslumbrar o comprar a los otros: las ropas son para gustarles o para que nos envidien; y lo mismo la buena casa, los mejores vinos, etcétera. Muy pocas cosas conservan su gracia en la soledad; y si la soledad es completa y definitiva, todas las cosas resultan tristes inevitablemente. La buena vida humana es una buena vida entre seres humanos o de lo contrario puede que sea vida, pero no será ni buena ni humana.</p>
            <p class="reading-source">Tomado y adaptado de: Savater, F. (1991). <em>Ética para Amador.</em> Ariel.</p>
          </div>

        `
      }
    ],
    prompt: "¿Qué tipo de estrategia argumentativa utiliza el autor para convencer al lector de su posición?",
    options: [
      { letter: "A", text: "El autor introduce el tema y la tesis con ironía, para hacer entender lo contrario de lo que dice, con la intención de restarle credibilidad a dicha tesis." },
      { letter: "B", text: "El autor contextualiza el problema sobre la buena vida, presenta algunas opiniones suyas sobre el tema y concluye con la tesis contraria." },
      { letter: "C", text: "El autor introduce el tema y la tesis, a través de diversas preguntas retóricas, ofreciendo ejemplos que lo conducen a una conclusión." },
      { letter: "D", text: "El autor contextualiza el problema sobre la buena vida, presenta su tesis y la defiende con la ayuda de ejemplos dados por autoridades en el tema." }
    ],
    correctAnswer: "C",
    explanation: "El autor guía al lector mediante preguntas retóricas y ejemplos relacionados con el dinero, la casa, la ropa y la soledad. Estos recursos conducen a la conclusión de que la buena vida humana requiere relación con otros seres humanos. La respuesta correcta es C."
  }

  ,
  {
    uid: "s1-lect-036",
    session: 1,
    block: 2,
    number: 36,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Función de conectores y expresiones",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 36",
    stem: "Responda de acuerdo con el texto “Nuestro cerebro, ¿hecho para la música?” (fragmento).",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 36 A 39 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Nuestro cerebro, ¿hecho para la música? <span class="subtle-title">(fragmento)</span></h3>
            <p>La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización. Nuestros antepasados, en ese entonces, ya tocaban flautas de hueso y percusiones. Los instrumentos se fueron diversificando y multiplicando, pasando por la creación de instrumentos de madera, cuerda y metal, hasta llegar a las guitarras eléctricas y consolas de música electrónica de hoy en día.</p>
            <p>Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata; incluso bebés de dos meses de nacidos se voltean cuando escuchan sonidos agradables y le dan la espalda a los disonantes. Dada su universalidad, entonces, ¿será que la música podría haber ayudado en la supervivencia humana de alguna forma? ¿Tendría alguna ventaja o beneficio? Algunos investigadores sugieren que puede haber ayudado en el cortejo. Otros dicen que promueve la cohesión de grupo, tal como lo hace hoy en día. Incluso, puede ser un simple accidente feliz, una dulzura auditiva, que casualmente terminó creando una rumba cerebral.</p>
            <p class="reading-source">Tomado y adaptado de: Pardo, E. (20 de marzo de 2021). <em>Nuestro cerebro, ¿hecho para la música?</em> Shots de Ciencia. Recuperado de: https://www.shotsdeciencia.com/post/nuestro-cerebro-hecho-para-la-m%C3%BAsica</p>
          </div>

          <div class="fragment-card">
            <p><strong>Considere el siguiente apartado del texto:</strong></p>
            <blockquote>“Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la función de la expresión “lo que”?",
    options: [
      { letter: "A", text: "Plantear dos opciones opuestas sobre una teoría." },
      { letter: "B", text: "Introducir una relación de causalidad entre la primera y la segunda idea." },
      { letter: "C", text: "Aclarar el sentido de la primera idea a partir de la segunda." },
      { letter: "D", text: "Añadir una idea similar a la que se presenta al principio de la oración." }
    ],
    correctAnswer: "B",
    explanation: "La expresión “lo que” conecta el hecho de que casi todas las sociedades hayan tenido música con la conclusión que se deriva de ello: que la apreciación por la música podría ser innata. Por eso introduce una relación causal o de consecuencia entre las dos ideas."
  }

  ,
  {
    uid: "s1-lect-037",
    session: 1,
    block: 2,
    number: 37,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia a partir de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 37",
    stem: "Responda de acuerdo con el texto “Nuestro cerebro, ¿hecho para la música?” (fragmento).",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 36 A 39 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Nuestro cerebro, ¿hecho para la música? <span class="subtle-title">(fragmento)</span></h3>
            <p>La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización. Nuestros antepasados, en ese entonces, ya tocaban flautas de hueso y percusiones. Los instrumentos se fueron diversificando y multiplicando, pasando por la creación de instrumentos de madera, cuerda y metal, hasta llegar a las guitarras eléctricas y consolas de música electrónica de hoy en día.</p>
            <p>Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata; incluso bebés de dos meses de nacidos se voltean cuando escuchan sonidos agradables y le dan la espalda a los disonantes. Dada su universalidad, entonces, ¿será que la música podría haber ayudado en la supervivencia humana de alguna forma? ¿Tendría alguna ventaja o beneficio? Algunos investigadores sugieren que puede haber ayudado en el cortejo. Otros dicen que promueve la cohesión de grupo, tal como lo hace hoy en día. Incluso, puede ser un simple accidente feliz, una dulzura auditiva, que casualmente terminó creando una rumba cerebral.</p>
            <p class="reading-source">Tomado y adaptado de: Pardo, E. (20 de marzo de 2021). <em>Nuestro cerebro, ¿hecho para la música?</em> Shots de Ciencia. Recuperado de: https://www.shotsdeciencia.com/post/nuestro-cerebro-hecho-para-la-m%C3%BAsica</p>
          </div>

        `
      }
    ],
    prompt: "La trompeta es un instrumento de metal. Teniendo en cuenta lo que dice el texto, la invención de la trompeta ocurrió:",
    options: [
      { letter: "A", text: "Antes de la invención de la flauta de hueso." },
      { letter: "B", text: "Antes de la aparición de los instrumentos de percusión." },
      { letter: "C", text: "Después de la aparición de los instrumentos de percusión." },
      { letter: "D", text: "Después de la aparición de la guitarra eléctrica." }
    ],
    correctAnswer: "C",
    explanation: "El texto señala que primero los antepasados tocaban flautas de hueso y percusiones, y luego los instrumentos se diversificaron hacia los de madera, cuerda y metal. Como la trompeta es de metal, su aparición ocurrió después de los instrumentos de percusión."
  }

  ,
  {
    uid: "s1-lect-038",
    session: 1,
    block: 2,
    number: 38,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Léxico en contexto",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 38",
    stem: "Responda de acuerdo con el texto “Nuestro cerebro, ¿hecho para la música?” (fragmento).",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 36 A 39 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Nuestro cerebro, ¿hecho para la música? <span class="subtle-title">(fragmento)</span></h3>
            <p>La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización. Nuestros antepasados, en ese entonces, ya tocaban flautas de hueso y percusiones. Los instrumentos se fueron diversificando y multiplicando, pasando por la creación de instrumentos de madera, cuerda y metal, hasta llegar a las guitarras eléctricas y consolas de música electrónica de hoy en día.</p>
            <p>Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata; incluso bebés de dos meses de nacidos se voltean cuando escuchan sonidos agradables y le dan la espalda a los disonantes. Dada su universalidad, entonces, ¿será que la música podría haber ayudado en la supervivencia humana de alguna forma? ¿Tendría alguna ventaja o beneficio? Algunos investigadores sugieren que puede haber ayudado en el cortejo. Otros dicen que promueve la cohesión de grupo, tal como lo hace hoy en día. Incluso, puede ser un simple accidente feliz, una dulzura auditiva, que casualmente terminó creando una rumba cerebral.</p>
            <p class="reading-source">Tomado y adaptado de: Pardo, E. (20 de marzo de 2021). <em>Nuestro cerebro, ¿hecho para la música?</em> Shots de Ciencia. Recuperado de: https://www.shotsdeciencia.com/post/nuestro-cerebro-hecho-para-la-m%C3%BAsica</p>
          </div>

        `
      }
    ],
    prompt: "En el texto, la palabra “disonantes” hace referencia a:",
    options: [
      { letter: "A", text: "Sonidos cautivantes." },
      { letter: "B", text: "Sonidos intensos." },
      { letter: "C", text: "Sonidos agudos." },
      { letter: "D", text: "Sonidos desagradables." }
    ],
    correctAnswer: "D",
    explanation: "El texto contrasta los sonidos agradables con los disonantes. Por oposición, “disonantes” se refiere a sonidos que no resultan agradables o armónicos. La respuesta correcta es D."
  }

  ,
  {
    uid: "s1-lect-039",
    session: 1,
    block: 2,
    number: 39,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Función de fragmentos en el texto",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 39",
    stem: "Responda de acuerdo con el texto “Nuestro cerebro, ¿hecho para la música?” (fragmento).",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 36 A 39 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Nuestro cerebro, ¿hecho para la música? <span class="subtle-title">(fragmento)</span></h3>
            <p>La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización. Nuestros antepasados, en ese entonces, ya tocaban flautas de hueso y percusiones. Los instrumentos se fueron diversificando y multiplicando, pasando por la creación de instrumentos de madera, cuerda y metal, hasta llegar a las guitarras eléctricas y consolas de música electrónica de hoy en día.</p>
            <p>Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata; incluso bebés de dos meses de nacidos se voltean cuando escuchan sonidos agradables y le dan la espalda a los disonantes. Dada su universalidad, entonces, ¿será que la música podría haber ayudado en la supervivencia humana de alguna forma? ¿Tendría alguna ventaja o beneficio? Algunos investigadores sugieren que puede haber ayudado en el cortejo. Otros dicen que promueve la cohesión de grupo, tal como lo hace hoy en día. Incluso, puede ser un simple accidente feliz, una dulzura auditiva, que casualmente terminó creando una rumba cerebral.</p>
            <p class="reading-source">Tomado y adaptado de: Pardo, E. (20 de marzo de 2021). <em>Nuestro cerebro, ¿hecho para la música?</em> Shots de Ciencia. Recuperado de: https://www.shotsdeciencia.com/post/nuestro-cerebro-hecho-para-la-m%C3%BAsica</p>
          </div>

          <div class="fragment-card">
            <p><strong>Considere el siguiente fragmento del texto:</strong></p>
            <blockquote>“La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Qué función cumple el fragmento en el texto?",
    options: [
      { letter: "A", text: "Presentar la tesis central del texto." },
      { letter: "B", text: "Introducir el tema que se trata en el texto." },
      { letter: "C", text: "Resumir el contenido del texto." },
      { letter: "D", text: "Plantear la conclusión central del texto." }
    ],
    correctAnswer: "B",
    explanation: "El fragmento inicial ubica al lector en el tema general del texto: la relación histórica entre los seres humanos y la música. No presenta la conclusión ni resume todo el contenido, sino que introduce el tema que será desarrollado."
  }

  ,
  {
    uid: "s1-lect-040",
    session: 1,
    block: 2,
    number: 40,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Estrategias retóricas y argumentativas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 40",
    stem: "Responda de acuerdo con el texto adaptado de Vargas Llosa, “Parábola de la solitaria”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 40 A 42 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p><strong>Querido amigo,</strong></p>
            <p><strong>Usted ha decidido dedicarse a la literatura, ¿ahora qué?</strong></p>
            <p>Su decisión de asumir su afición por la literatura como un destino deberá convertirse en servidumbre, en nada menos que esclavitud. Para explicarlo de una manera gráfica, le diré que acaba usted de hacer algo que, por lo visto, hacían en el siglo XIX algunas damas espantadas con el grosor de su cuerpo, que, a fin de recobrar una silueta de sílfide, se tragaban una solitaria. ¿Ha tenido usted ocasión de ver a alguien que lleva en sus entrañas ese horrendo parásito? Yo sí, y puedo asegurarle que aquellas damas eran unas heroínas, unas mártires de la belleza. A comienzos de los años sesenta, en París, yo tenía un magnífico amigo, José María, un muchacho español, pintor y cineasta, que padeció esa enfermedad. Una vez que la solitaria se instala en el organismo se consubstancia con él, se alimenta de él, crece y se fortalece a expensas de él, y es dificilísimo expulsarla de ese cuerpo del que se aprovecha, al que tiene colonizado. José María enflaquecía, a pesar de que debía comer y beber líquidos (leche, sobre todo) constantemente para aplacar la ansiedad del animal aposentado en sus entrañas, pues, si no, su malestar se volvía insoportable. Pero todo lo que comía y bebía no era para su gusto y placer, sino para los de la solitaria. Un día, que estábamos conversando en un pequeño bistrot de Montparnasse, me sorprendió con esta confesión: “Nosotros hacemos tantas cosas juntos. Vamos al cine, a exposiciones, a recorrer librerías, y discutimos horas de horas sobre política, libros, amigos comunes. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria. Esa es la impresión que tengo: que todo en mi vida, ahora, no lo vivo para mí, sino para ese ser que llevo adentro, del que ya no soy más que un sirviente”.</p>
            <p>Desde entonces, me gusta comparar la situación del escritor con la de mi amigo José María cuando llevaba adentro la solitaria.</p>
            <p class="reading-source">Tomado y adaptado de: Vargas Llosa, M. (2011). Parábola de la solitaria. En M. Vargas Llosa (Ed.). <em>Cartas a un joven novelista</em> (pp. 11-22). Madrid: Alfaguara.</p>
          </div>
`
      }
    ],
    prompt: "Según el autor, la afición por la literatura puede convertirse en esclavitud. ¿Qué estrategia retórica usa el autor para ilustrar esto?",
    options: [
      { letter: "A", text: "Contraste." },
      { letter: "B", text: "Exageración." },
      { letter: "C", text: "Comparación." },
      { letter: "D", text: "Cita de autoridades." }
    ],
    correctAnswer: "C",
    explanation: "El autor compara la situación del escritor con la de José María cuando llevaba una solitaria dentro de su organismo. Esa comparación ilustra cómo la afición por la literatura puede convertirse en una forma de servidumbre o esclavitud."
  }
  ,
  {
    uid: "s1-lect-041",
    session: 1,
    block: 2,
    number: 41,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Localización de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 41",
    stem: "Responda de acuerdo con el texto adaptado de Vargas Llosa, “Parábola de la solitaria”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 40 A 42 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p><strong>Querido amigo,</strong></p>
            <p><strong>Usted ha decidido dedicarse a la literatura, ¿ahora qué?</strong></p>
            <p>Su decisión de asumir su afición por la literatura como un destino deberá convertirse en servidumbre, en nada menos que esclavitud. Para explicarlo de una manera gráfica, le diré que acaba usted de hacer algo que, por lo visto, hacían en el siglo XIX algunas damas espantadas con el grosor de su cuerpo, que, a fin de recobrar una silueta de sílfide, se tragaban una solitaria. ¿Ha tenido usted ocasión de ver a alguien que lleva en sus entrañas ese horrendo parásito? Yo sí, y puedo asegurarle que aquellas damas eran unas heroínas, unas mártires de la belleza. A comienzos de los años sesenta, en París, yo tenía un magnífico amigo, José María, un muchacho español, pintor y cineasta, que padeció esa enfermedad. Una vez que la solitaria se instala en el organismo se consubstancia con él, se alimenta de él, crece y se fortalece a expensas de él, y es dificilísimo expulsarla de ese cuerpo del que se aprovecha, al que tiene colonizado. José María enflaquecía, a pesar de que debía comer y beber líquidos (leche, sobre todo) constantemente para aplacar la ansiedad del animal aposentado en sus entrañas, pues, si no, su malestar se volvía insoportable. Pero todo lo que comía y bebía no era para su gusto y placer, sino para los de la solitaria. Un día, que estábamos conversando en un pequeño bistrot de Montparnasse, me sorprendió con esta confesión: “Nosotros hacemos tantas cosas juntos. Vamos al cine, a exposiciones, a recorrer librerías, y discutimos horas de horas sobre política, libros, amigos comunes. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria. Esa es la impresión que tengo: que todo en mi vida, ahora, no lo vivo para mí, sino para ese ser que llevo adentro, del que ya no soy más que un sirviente”.</p>
            <p>Desde entonces, me gusta comparar la situación del escritor con la de mi amigo José María cuando llevaba adentro la solitaria.</p>
            <p class="reading-source">Tomado y adaptado de: Vargas Llosa, M. (2011). Parábola de la solitaria. En M. Vargas Llosa (Ed.). <em>Cartas a un joven novelista</em> (pp. 11-22). Madrid: Alfaguara.</p>
          </div>
`
      }
    ],
    prompt: "El fragmento del texto que responde la pregunta “¿cómo actúa la solitaria dentro del organismo?” es:",
    options: [
      { letter: "A", text: "Pero todo lo que comía y bebía no era para su gusto y placer, sino para los de la solitaria." },
      { letter: "B", text: "Una vez que la solitaria se instala en el organismo se consubstancia con él, se alimenta de él, crece y se fortalece a expensas de él." },
      { letter: "C", text: "José María enflaquecía a pesar de que debía comer y beber líquidos (leche, sobre todo) constantemente para aplacar la ansiedad del animal aposentado en sus entrañas." },
      { letter: "D", text: "Nosotros hacemos tantas cosas juntos. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria." }
    ],
    correctAnswer: "B",
    explanation: "La opción B responde directamente cómo actúa la solitaria dentro del organismo: se instala, se consubstancia con él, se alimenta de él, crece y se fortalece a sus expensas."
  }
  ,
  {
    uid: "s1-lect-042",
    session: 1,
    block: 2,
    number: 42,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Caracterización de personajes y situaciones",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 42",
    stem: "Responda de acuerdo con el texto adaptado de Vargas Llosa, “Parábola de la solitaria”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 40 A 42 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p><strong>Querido amigo,</strong></p>
            <p><strong>Usted ha decidido dedicarse a la literatura, ¿ahora qué?</strong></p>
            <p>Su decisión de asumir su afición por la literatura como un destino deberá convertirse en servidumbre, en nada menos que esclavitud. Para explicarlo de una manera gráfica, le diré que acaba usted de hacer algo que, por lo visto, hacían en el siglo XIX algunas damas espantadas con el grosor de su cuerpo, que, a fin de recobrar una silueta de sílfide, se tragaban una solitaria. ¿Ha tenido usted ocasión de ver a alguien que lleva en sus entrañas ese horrendo parásito? Yo sí, y puedo asegurarle que aquellas damas eran unas heroínas, unas mártires de la belleza. A comienzos de los años sesenta, en París, yo tenía un magnífico amigo, José María, un muchacho español, pintor y cineasta, que padeció esa enfermedad. Una vez que la solitaria se instala en el organismo se consubstancia con él, se alimenta de él, crece y se fortalece a expensas de él, y es dificilísimo expulsarla de ese cuerpo del que se aprovecha, al que tiene colonizado. José María enflaquecía, a pesar de que debía comer y beber líquidos (leche, sobre todo) constantemente para aplacar la ansiedad del animal aposentado en sus entrañas, pues, si no, su malestar se volvía insoportable. Pero todo lo que comía y bebía no era para su gusto y placer, sino para los de la solitaria. Un día, que estábamos conversando en un pequeño bistrot de Montparnasse, me sorprendió con esta confesión: “Nosotros hacemos tantas cosas juntos. Vamos al cine, a exposiciones, a recorrer librerías, y discutimos horas de horas sobre política, libros, amigos comunes. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria. Esa es la impresión que tengo: que todo en mi vida, ahora, no lo vivo para mí, sino para ese ser que llevo adentro, del que ya no soy más que un sirviente”.</p>
            <p>Desde entonces, me gusta comparar la situación del escritor con la de mi amigo José María cuando llevaba adentro la solitaria.</p>
            <p class="reading-source">Tomado y adaptado de: Vargas Llosa, M. (2011). Parábola de la solitaria. En M. Vargas Llosa (Ed.). <em>Cartas a un joven novelista</em> (pp. 11-22). Madrid: Alfaguara.</p>
          </div>

          <div class="fragment-card">
            <p><strong>Considere el siguiente fragmento del texto:</strong></p>
            <blockquote>Un día, que estábamos conversando en un pequeño bistrot de Montparnasse, me sorprendió con esta confesión: “Nosotros hacemos tantas cosas juntos. Vamos al cine, a exposiciones, a recorrer librerías, y discutimos horas de horas sobre política, libros, amigos comunes. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria. Esa es la impresión que tengo: que todo en mi vida, ahora, no lo vivo para mí, sino para ese ser que llevo adentro, del que ya no soy más que un sirviente”.</blockquote>
          </div>
`
      }
    ],
    prompt: "El anterior fragmento hace una caracterización de",
    options: [
      { letter: "A", text: "la libertad de José María." },
      { letter: "B", text: "la esclavitud de José María." },
      { letter: "C", text: "la soledad de José María." },
      { letter: "D", text: "la inteligencia de José María." }
    ],
    correctAnswer: "B",
    explanation: "El fragmento muestra que José María siente que ya no vive para sí mismo, sino para la solitaria, y que se considera un sirviente de ese ser. Por eso caracteriza su esclavitud."
  }
  ,
  {
    uid: "s1-lect-043",
    session: 1,
    block: 2,
    number: 43,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Paráfrasis y significado contextual",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 43",
    stem: "Responda de acuerdo con la infografía “Petricor: el olor de la lluvia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card petrichor-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 43 A 46 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="petrichor-title">PETRICOR:<span>EL OLOR DE LA LLUVIA</span></div>
            <div class="petrichor-strip">
              <div class="rain-lines" aria-hidden="true"></div>
              <div class="petrichor-bubble left">CUANDO LAS GOTAS DE LLUVIA IMPACTAN CONTRA EL SUELO, SE FORMAN BURBUJAS DE AIRE.</div>
              <div class="puddle splash"><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="petrichor-strip">
              <div class="puddle large"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="petrichor-bubble right">ESTAS BURBUJAS “ATRAPAN” PARTÍCULAS DE LA TIERRA (ACEITES Y QUÍMICOS PRODUCIDOS POR BACTERIAS).</div>
            </div>
            <div class="petrichor-strip">
              <div class="petrichor-bubble left bottom">LAS BURBUJAS HACEN EFERVESCENCIA COMO CHAMPAÑA Y ESPARCEN LAS PARTÍCULAS EN EL AMBIENTE.</div>
              <div class="puddle flat"><span></span><span></span><span></span></div>
              <div class="particles" aria-hidden="true">✦ · ✧ · ✦ ·</div>
            </div>
            <div class="petrichor-close">
              <p>EL CONJUNTO DE PARTÍCULAS ES LO QUE PRODUCE ESE OLOR LLAMADO “PETRICOR”</p>
              <span class="arrow-line">→</span>
              <p>O COMO LO CONOCES TÚ:<br><strong>TIERRA MOJADA</strong></p>
            </div>
            <p class="reading-source">Fuente: “How the Smell of Rain Bubbles from the Ground” - The New York Times. Pictoline.com</p>
          </div>

          <div class="fragment-card">
            <p><strong>Considere el siguiente fragmento del texto:</strong> “Las burbujas hacen efervescencia como champaña”.</p>
          </div>`
      }
    ],
    prompt: "¿Cuál de las siguientes opciones expresa el mismo significado que este fragmento?",
    options: [
      { letter: "A", text: "Las burbujas de agua están llenas de alcohol, al igual que las burbujas de champaña." },
      { letter: "B", text: "El agua hierve de la misma manera que la champaña crea burbujas." },
      { letter: "C", text: "El gas sale de las burbujas de agua del mismo modo que de las burbujas de champaña." },
      { letter: "D", text: "Las burbujas que salen de la champaña son del mismo color que las del agua." }
    ],
    correctAnswer: "C",
    explanation: "La expresión compara la efervescencia de las burbujas con el comportamiento de la champaña. Es decir, el gas sale de las burbujas de manera semejante."
  }
  ,
  {
    uid: "s1-lect-044",
    session: 1,
    block: 2,
    number: 44,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Función de partes del texto",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 44",
    stem: "Responda de acuerdo con la infografía “Petricor: el olor de la lluvia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card petrichor-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 43 A 46 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="petrichor-title">PETRICOR:<span>EL OLOR DE LA LLUVIA</span></div>
            <div class="petrichor-strip">
              <div class="rain-lines" aria-hidden="true"></div>
              <div class="petrichor-bubble left">CUANDO LAS GOTAS DE LLUVIA IMPACTAN CONTRA EL SUELO, SE FORMAN BURBUJAS DE AIRE.</div>
              <div class="puddle splash"><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="petrichor-strip">
              <div class="puddle large"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="petrichor-bubble right">ESTAS BURBUJAS “ATRAPAN” PARTÍCULAS DE LA TIERRA (ACEITES Y QUÍMICOS PRODUCIDOS POR BACTERIAS).</div>
            </div>
            <div class="petrichor-strip">
              <div class="petrichor-bubble left bottom">LAS BURBUJAS HACEN EFERVESCENCIA COMO CHAMPAÑA Y ESPARCEN LAS PARTÍCULAS EN EL AMBIENTE.</div>
              <div class="puddle flat"><span></span><span></span><span></span></div>
              <div class="particles" aria-hidden="true">✦ · ✧ · ✦ ·</div>
            </div>
            <div class="petrichor-close">
              <p>EL CONJUNTO DE PARTÍCULAS ES LO QUE PRODUCE ESE OLOR LLAMADO “PETRICOR”</p>
              <span class="arrow-line">→</span>
              <p>O COMO LO CONOCES TÚ:<br><strong>TIERRA MOJADA</strong></p>
            </div>
            <p class="reading-source">Fuente: “How the Smell of Rain Bubbles from the Ground” - The New York Times. Pictoline.com</p>
          </div>
`
      }
    ],
    prompt: "Teniendo en cuenta el proceso descrito en el texto, ¿qué función cumple el último cuadro?",
    options: [
      { letter: "A", text: "Sintetiza el contenido del texto." },
      { letter: "B", text: "Presenta los contenidos del texto." },
      { letter: "C", text: "Anuncia la estructura del texto." },
      { letter: "D", text: "Funciona como el cierre del texto." }
    ],
    correctAnswer: "D",
    explanation: "El último cuadro cierra la explicación al nombrar el fenómeno descrito: el conjunto de partículas produce el olor llamado petricor, conocido como tierra mojada."
  }
  ,
  {
    uid: "s1-lect-045",
    session: 1,
    block: 2,
    number: 45,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relaciones semánticas y conectores",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 45",
    stem: "Responda de acuerdo con la infografía “Petricor: el olor de la lluvia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card petrichor-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 43 A 46 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="petrichor-title">PETRICOR:<span>EL OLOR DE LA LLUVIA</span></div>
            <div class="petrichor-strip">
              <div class="rain-lines" aria-hidden="true"></div>
              <div class="petrichor-bubble left">CUANDO LAS GOTAS DE LLUVIA IMPACTAN CONTRA EL SUELO, SE FORMAN BURBUJAS DE AIRE.</div>
              <div class="puddle splash"><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="petrichor-strip">
              <div class="puddle large"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="petrichor-bubble right">ESTAS BURBUJAS “ATRAPAN” PARTÍCULAS DE LA TIERRA (ACEITES Y QUÍMICOS PRODUCIDOS POR BACTERIAS).</div>
            </div>
            <div class="petrichor-strip">
              <div class="petrichor-bubble left bottom">LAS BURBUJAS HACEN EFERVESCENCIA COMO CHAMPAÑA Y ESPARCEN LAS PARTÍCULAS EN EL AMBIENTE.</div>
              <div class="puddle flat"><span></span><span></span><span></span></div>
              <div class="particles" aria-hidden="true">✦ · ✧ · ✦ ·</div>
            </div>
            <div class="petrichor-close">
              <p>EL CONJUNTO DE PARTÍCULAS ES LO QUE PRODUCE ESE OLOR LLAMADO “PETRICOR”</p>
              <span class="arrow-line">→</span>
              <p>O COMO LO CONOCES TÚ:<br><strong>TIERRA MOJADA</strong></p>
            </div>
            <p class="reading-source">Fuente: “How the Smell of Rain Bubbles from the Ground” - The New York Times. Pictoline.com</p>
          </div>

          <div class="fragment-card">
            <p><strong>En el último recuadro se presentan dos enunciados:</strong></p>
            <p>1. “El conjunto de partículas es lo que produce ese olor llamado petricor”; 2. “o como lo conoces tú: tierra mojada”.</p>
          </div>`
      }
    ],
    prompt: "¿Qué relación establece la palabra “o” entre estas dos frases?",
    options: [
      { letter: "A", text: "Permite establecer una relación de oposición, pues el segundo enunciado se opone al primero." },
      { letter: "B", text: "Permite establecer una relación de causa-efecto, pues el primer enunciado es la causa del segundo." },
      { letter: "C", text: "Permite expresar una alternativa, pues el segundo enunciado presenta otra manera de denominar al primero." },
      { letter: "D", text: "Permite expresar una adición, pues el segundo enunciado agrega nuevas ideas al tema presentado por el primero." }
    ],
    correctAnswer: "C",
    explanation: "La palabra “o” introduce una alternativa de denominación: petricor es el nombre técnico, mientras que tierra mojada es una forma común de llamar el mismo olor."
  }
  ,
  {
    uid: "s1-lect-046",
    session: 1,
    block: 2,
    number: 46,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Estrategias discursivas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 46",
    stem: "Responda de acuerdo con la infografía “Petricor: el olor de la lluvia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card petrichor-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 43 A 46 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="petrichor-title">PETRICOR:<span>EL OLOR DE LA LLUVIA</span></div>
            <div class="petrichor-strip">
              <div class="rain-lines" aria-hidden="true"></div>
              <div class="petrichor-bubble left">CUANDO LAS GOTAS DE LLUVIA IMPACTAN CONTRA EL SUELO, SE FORMAN BURBUJAS DE AIRE.</div>
              <div class="puddle splash"><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="petrichor-strip">
              <div class="puddle large"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="petrichor-bubble right">ESTAS BURBUJAS “ATRAPAN” PARTÍCULAS DE LA TIERRA (ACEITES Y QUÍMICOS PRODUCIDOS POR BACTERIAS).</div>
            </div>
            <div class="petrichor-strip">
              <div class="petrichor-bubble left bottom">LAS BURBUJAS HACEN EFERVESCENCIA COMO CHAMPAÑA Y ESPARCEN LAS PARTÍCULAS EN EL AMBIENTE.</div>
              <div class="puddle flat"><span></span><span></span><span></span></div>
              <div class="particles" aria-hidden="true">✦ · ✧ · ✦ ·</div>
            </div>
            <div class="petrichor-close">
              <p>EL CONJUNTO DE PARTÍCULAS ES LO QUE PRODUCE ESE OLOR LLAMADO “PETRICOR”</p>
              <span class="arrow-line">→</span>
              <p>O COMO LO CONOCES TÚ:<br><strong>TIERRA MOJADA</strong></p>
            </div>
            <p class="reading-source">Fuente: “How the Smell of Rain Bubbles from the Ground” - The New York Times. Pictoline.com</p>
          </div>
`
      }
    ],
    prompt: "A partir de la lectura de la infografía, ¿qué tipo de estrategia utiliza el autor del texto para lograr su propósito?",
    options: [
      { letter: "A", text: "Muestra las similitudes y las diferencias entre dos temas con el propósito de demostrar preferencia." },
      { letter: "B", text: "Utiliza detalles y lenguaje figurado con el fin de apoyar una impresión dominante con respecto al tema." },
      { letter: "C", text: "Explica el significado de un término relevante para el texto y así deja claro cómo este se va a entender." },
      { letter: "D", text: "Señala y explica pasos o etapas según sus características." }
    ],
    correctAnswer: "C",
    explanation: "La infografía explica el significado del término petricor y lo relaciona con una expresión conocida por el lector: tierra mojada. Por eso, la estrategia consiste en definir y aclarar un término relevante."
  }

  ,
  {
    uid: "s1-lect-047",
    session: 1,
    block: 2,
    number: 47,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Identificación de tesis central",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 47",
    stem: "Responda de acuerdo con el texto “La verdad en la infancia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card infancia-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 47 Y 48 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>La verdad en la infancia</h3>
            <p>En la vasta comedia de los sentimientos y de las pasiones humanas, la infancia representa la única certeza de sinceridad. Nos hacemos hombres adultos, nos hacemos viejos, maduramos principal y casi exclusivamente para mentir, para disimular, para fingir acerca del amor, de la amistad, del aprecio, entre otras cosas. Sobre ninguna de tales categorías morales conoce la infancia el recurso de la hipocresía. Los niños aman y detestan integral, honda y sinceramente con diáfana lealtad. Confiesan su desamor por una cosa o por una persona, con esplendorosa claridad, sin agregar vanas razones al mandato interior que los fuerza a declarar su pueril odio o abominación. Afirman, de la misma manera honesta, su prodigiosa ternura por una persona o un juguete, por un desaprovechado trozo de madera, por un inservible artefacto, resto de un naufragio de cosas domésticas, por un perro de ojos tristes y de estampa maltrecha, por un gato envejecido y cojo, por una piedrecilla minúscula, cuyos hostiles bordes se han ido suavizando al roce de las caricias entre las manos incansables. Los niños aman el viento y la lluvia, la tierra mojada, el agua que brota y que salta en los estanques públicos, el sol y el cielo, la yerba, los árboles, la luz, los colores, todo el universo real y todo el universo irreal de sus sueños.</p>
            <p class="reading-source">Tomado y adaptado de: Téllez, H. (1946). Bagatela sobre la infancia. En Hernando Téllez (Ed.), <em>Luces en el bosque</em> (pp. 141-142). Ediciones Librería Siglo XX.</p>
          </div>
`
      }
    ],
    prompt: "¿Cuál de las siguientes opciones presenta la idea que defiende el texto?",
    options: [
      { letter: "A", text: "Cuando se es viejo siempre se ama con libertad." },
      { letter: "B", text: "Cuando se es niño siempre se ama con claridad." },
      { letter: "C", text: "Cuando se es viejo siempre se miente." },
      { letter: "D", text: "Cuando se es niño siempre se dice la verdad." }
    ],
    correctAnswer: "D",
    explanation: "El texto defiende la idea de que la infancia representa una certeza de sinceridad: los niños aman, detestan y expresan lo que sienten con claridad, sin hipocresía. Por eso, la opción correcta es D."
  }
  ,
  {
    uid: "s1-lect-048",
    session: 1,
    block: 2,
    number: 48,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Estrategia argumentativa",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 48",
    stem: "Responda de acuerdo con el texto “La verdad en la infancia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card infancia-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 47 Y 48 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>La verdad en la infancia</h3>
            <p>En la vasta comedia de los sentimientos y de las pasiones humanas, la infancia representa la única certeza de sinceridad. Nos hacemos hombres adultos, nos hacemos viejos, maduramos principal y casi exclusivamente para mentir, para disimular, para fingir acerca del amor, de la amistad, del aprecio, entre otras cosas. Sobre ninguna de tales categorías morales conoce la infancia el recurso de la hipocresía. Los niños aman y detestan integral, honda y sinceramente con diáfana lealtad. Confiesan su desamor por una cosa o por una persona, con esplendorosa claridad, sin agregar vanas razones al mandato interior que los fuerza a declarar su pueril odio o abominación. Afirman, de la misma manera honesta, su prodigiosa ternura por una persona o un juguete, por un desaprovechado trozo de madera, por un inservible artefacto, resto de un naufragio de cosas domésticas, por un perro de ojos tristes y de estampa maltrecha, por un gato envejecido y cojo, por una piedrecilla minúscula, cuyos hostiles bordes se han ido suavizando al roce de las caricias entre las manos incansables. Los niños aman el viento y la lluvia, la tierra mojada, el agua que brota y que salta en los estanques públicos, el sol y el cielo, la yerba, los árboles, la luz, los colores, todo el universo real y todo el universo irreal de sus sueños.</p>
            <p class="reading-source">Tomado y adaptado de: Téllez, H. (1946). Bagatela sobre la infancia. En Hernando Téllez (Ed.), <em>Luces en el bosque</em> (pp. 141-142). Ediciones Librería Siglo XX.</p>
          </div>
`
      }
    ],
    prompt: "¿Cuál es la estrategia argumentativa usada por el autor?",
    options: [
      { letter: "A", text: "El autor presenta el tema, seguido de una tesis y de una antítesis, y concluye con una síntesis." },
      { letter: "B", text: "El autor emprende la tarea de defender una tesis enumerando evidencias a favor de ella." },
      { letter: "C", text: "El autor presenta diferentes argumentos y concluye refutando esos argumentos." },
      { letter: "D", text: "El autor expone una tesis, pero no presenta argumentos para apoyarla." }
    ],
    correctAnswer: "B",
    explanation: "El autor sostiene la tesis de que la infancia es sincera y la apoya mediante una enumeración de evidencias: los niños aman, detestan, confiesan y afirman sus sentimientos sin hipocresía. Por eso, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-lect-049",
    session: 1,
    block: 2,
    number: 49,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia a partir de información textual y paratextual",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 49",
    stem: "Responda de acuerdo con el cómic sobre el Corán.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card comic-card riad-comic-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 49 A 51 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="comic-grid" aria-label="Cómic sobre la recuperación de lectura del Corán">
              <section class="comic-panel">
                <div class="caption-box">El director de la escuela y mi padre creían que mi nivel de Corán* era muy deficiente.</div>
                <div class="comic-scene school-scene"><span>Escuela</span><span>Niños en el patio</span></div>
                <span class="panel-number">1</span>
              </section>
              <section class="comic-panel">
                <div class="comic-scene desk-scene"><span>El árabe del Corán no es el mismo que el que se hablaba en clase.</span></div>
                <span class="panel-number">2</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Así que me obligaron a pasarme todos los recreos haciendo recuperación con la maestra.</div>
                <div class="speech teacher">¡Venga, Riad!</div>
                <div class="speech child">Explícame de qué habla este versículo.</div>
                <div class="thought">Como todo el mundo quería matarme a la hora del recreo, me venía bien.</div>
                <span class="panel-number">3</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Yo me preguntaba si iba en serio o disimulaba. Si apenas conseguía leer...</div>
                <div class="speech teacher">Yo... No sé...</div>
                <div class="speech child big">BUAAA</div>
                <span class="panel-number">4</span>
              </section>
              <section class="comic-panel">
                <div class="speech teacher wide">Venga, no pasa nada, volvemos a empezar, escucha bien.</div>
                <div class="comic-scene reading-scene"><span>Libro abierto sobre el pupitre</span></div>
                <span class="panel-number">5</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Olía a una fragancia jabonosa y, de fondo, a un sudor embriagador y reconfortante.</div>
                <div class="speech teacher">Bismilá arramán arrahim...</div>
                <div class="thought child-note">Escucharla era muy agradable.</div>
                <span class="panel-number">6</span>
              </section>
            </div>
            <p class="reading-note"><strong>*Corán:</strong> Libro sagrado para los musulmanes.</p>
            <p class="reading-source">Sattouf, R. (2019). <em>El árabe del futuro 4. Una juventud en Oriente Medio (1987-1992)</em>. España: Editorial Salamandra.</p>
          </div>
`
      }
    ],
    prompt: "El texto en árabe al que se refieren en los recuadros está dividido en versículos. Uno podría deducir que se trata de:",
    options: [
      { letter: "A", text: "Un diccionario de una lengua de Oriente Medio." },
      { letter: "B", text: "Un texto religioso como la Biblia." },
      { letter: "C", text: "Una colección de cuentos de los hermanos Grimm." },
      { letter: "D", text: "Una novela como María, de Jorge Isaacs." }
    ],
    correctAnswer: "B",
    explanation: "El texto menciona el Corán y la nota aclara que es el libro sagrado para los musulmanes. Además, se habla de versículos, una forma de organización propia de textos religiosos. Por eso, la opción correcta es B."
  }
  ,
  {
    uid: "s1-lect-050",
    session: 1,
    block: 2,
    number: 50,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre texto verbal y elementos gráficos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 50",
    stem: "Responda de acuerdo con el cómic sobre el Corán.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card comic-card riad-comic-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 49 A 51 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="comic-grid" aria-label="Cómic sobre la recuperación de lectura del Corán">
              <section class="comic-panel">
                <div class="caption-box">El director de la escuela y mi padre creían que mi nivel de Corán* era muy deficiente.</div>
                <div class="comic-scene school-scene"><span>Escuela</span><span>Niños en el patio</span></div>
                <span class="panel-number">1</span>
              </section>
              <section class="comic-panel">
                <div class="comic-scene desk-scene"><span>El árabe del Corán no es el mismo que el que se hablaba en clase.</span></div>
                <span class="panel-number">2</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Así que me obligaron a pasarme todos los recreos haciendo recuperación con la maestra.</div>
                <div class="speech teacher">¡Venga, Riad!</div>
                <div class="speech child">Explícame de qué habla este versículo.</div>
                <div class="thought">Como todo el mundo quería matarme a la hora del recreo, me venía bien.</div>
                <span class="panel-number">3</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Yo me preguntaba si iba en serio o disimulaba. Si apenas conseguía leer...</div>
                <div class="speech teacher">Yo... No sé...</div>
                <div class="speech child big">BUAAA</div>
                <span class="panel-number">4</span>
              </section>
              <section class="comic-panel">
                <div class="speech teacher wide">Venga, no pasa nada, volvemos a empezar, escucha bien.</div>
                <div class="comic-scene reading-scene"><span>Libro abierto sobre el pupitre</span></div>
                <span class="panel-number">5</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Olía a una fragancia jabonosa y, de fondo, a un sudor embriagador y reconfortante.</div>
                <div class="speech teacher">Bismilá arramán arrahim...</div>
                <div class="thought child-note">Escucharla era muy agradable.</div>
                <span class="panel-number">6</span>
              </section>
            </div>
            <p class="reading-note"><strong>*Corán:</strong> Libro sagrado para los musulmanes.</p>
            <p class="reading-source">Sattouf, R. (2019). <em>El árabe del futuro 4. Una juventud en Oriente Medio (1987-1992)</em>. España: Editorial Salamandra.</p>
          </div>
`
      }
    ],
    prompt: "En el sexto recuadro del cómic, ¿cuál es la relación entre el texto en cursiva debajo de la flecha y el texto dentro del globo?",
    options: [
      { letter: "A", text: "Mediante el texto en cursiva la mujer corrige la pronunciación de la niña, cuyas palabras aparecen en el globo." },
      { letter: "B", text: "Con el texto en el globo la niña busca hacer una pregunta, que la mujer responde con el texto en cursiva." },
      { letter: "C", text: "Mediante el texto en cursiva la niña expresa gusto por la voz de la mujer, cuyas palabras están en el globo." },
      { letter: "D", text: "Con el texto en el globo la mujer responde las observaciones de la niña, que aparecen en cursiva." }
    ],
    correctAnswer: "C",
    explanation: "En el sexto recuadro, el globo presenta las palabras que pronuncia la maestra. El texto en cursiva, debajo de la flecha, corresponde a la voz de la niña narradora, quien expresa que escucharla era agradable. Por eso, la respuesta correcta es C."
  }
  ,
  {
    uid: "s1-lect-051",
    session: 1,
    block: 2,
    number: 51,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Voces narrativas y punto de vista",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 51",
    stem: "Responda de acuerdo con el cómic sobre el Corán.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card comic-card riad-comic-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 49 A 51 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="comic-grid" aria-label="Cómic sobre la recuperación de lectura del Corán">
              <section class="comic-panel">
                <div class="caption-box">El director de la escuela y mi padre creían que mi nivel de Corán* era muy deficiente.</div>
                <div class="comic-scene school-scene"><span>Escuela</span><span>Niños en el patio</span></div>
                <span class="panel-number">1</span>
              </section>
              <section class="comic-panel">
                <div class="comic-scene desk-scene"><span>El árabe del Corán no es el mismo que el que se hablaba en clase.</span></div>
                <span class="panel-number">2</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Así que me obligaron a pasarme todos los recreos haciendo recuperación con la maestra.</div>
                <div class="speech teacher">¡Venga, Riad!</div>
                <div class="speech child">Explícame de qué habla este versículo.</div>
                <div class="thought">Como todo el mundo quería matarme a la hora del recreo, me venía bien.</div>
                <span class="panel-number">3</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Yo me preguntaba si iba en serio o disimulaba. Si apenas conseguía leer...</div>
                <div class="speech teacher">Yo... No sé...</div>
                <div class="speech child big">BUAAA</div>
                <span class="panel-number">4</span>
              </section>
              <section class="comic-panel">
                <div class="speech teacher wide">Venga, no pasa nada, volvemos a empezar, escucha bien.</div>
                <div class="comic-scene reading-scene"><span>Libro abierto sobre el pupitre</span></div>
                <span class="panel-number">5</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Olía a una fragancia jabonosa y, de fondo, a un sudor embriagador y reconfortante.</div>
                <div class="speech teacher">Bismilá arramán arrahim...</div>
                <div class="thought child-note">Escucharla era muy agradable.</div>
                <span class="panel-number">6</span>
              </section>
            </div>
            <p class="reading-note"><strong>*Corán:</strong> Libro sagrado para los musulmanes.</p>
            <p class="reading-source">Sattouf, R. (2019). <em>El árabe del futuro 4. Una juventud en Oriente Medio (1987-1992)</em>. España: Editorial Salamandra.</p>
          </div>
`
      }
    ],
    prompt: "Los rectángulos de texto que aparecen en la parte superior de los recuadros 1, 3, 4 y 6 corresponden a la voz de:",
    options: [
      { letter: "A", text: "La maestra que aparece en el cómic, que cuenta todo en tercera persona." },
      { letter: "B", text: "El director de la escuela, que no aparece en los recuadros pero conoció la historia." },
      { letter: "C", text: "El padre de la niña del cómic, que recuerda los eventos en segunda persona." },
      { letter: "D", text: "La niña de la historia, que hace su relato en primera persona." }
    ],
    correctAnswer: "D",
    explanation: "Los recuadros superiores usan expresiones como “mi padre”, “me obligaron” y “yo me preguntaba”, por lo que corresponden a una narración en primera persona realizada por la niña de la historia. La respuesta correcta es D."
  }

  ,
  {
    uid: "s1-lect-052",
    session: 1,
    block: 2,
    number: 52,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre enunciados y función argumentativa",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 52",
    stem: "Responda de acuerdo con el texto sobre los horóscopos.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading horoscope-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 52 Y 53 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Me pregunto qué diría un comité de ética si un periódico indujera a sus lectores a cambiar comportamientos, a vender o comprar propiedades, a suspender relaciones amorosas o a cambiar de trabajo. Todo eso con el agravante de que la intromisión proviene de afirmaciones sin base científica o factual, producto de la pluma de alguien que ya ha demostrado estar equivocado y se lucra de la ingenuidad de la gente. Pues eso es exactamente lo que pasa con los horóscopos que nos inundan por esta época, incluso en los medios de la mayor seriedad.</p>
            <p>Horóscopos y cartas astrales se basan en creencias y mitos de diversas culturas, en escritos antiguos que están equivocados y se contradicen en sus predicciones. Los signos del Zodíaco, por ejemplo, no son 12 sino 13, y hay quienes piensan que 14. Los astrólogos esconden ese hecho, que nos obligaría a reubicarnos en signos diferentes al nuestro tradicional, cambiando el análisis de personalidad y las predicciones de toda la vida. ¡Qué oso!</p>
            <p>El nombre y carácter de los signos se derivan de lo que creían ver en las estrellas astrónomos de la Antigüedad. Podrían haber imaginado cosas distintas. Hoy, por ejemplo, no verían una balanza (pieza de museo) en los astros del signo Libra. Quizás verían un brasier, y eso nos daría a los del signo nuestra proverbial fama de equilibrados.</p>
            <p>En los análisis de personalidad hacen afirmaciones generales que le cuadran a cualquiera. Aprovechan lo que en psicología se llama efecto Forer. Forer sometió a sus estudiantes a un test que supuestamente había elaborado para definir la personalidad. Posteriormente, le entregó a cada uno su resultado y le pidió que calificara su precisión de 0 a 5. El test recibió una excelente calificación promedio de 4,2.</p>
            <p>El asunto fue que Forer no leyó los exámenes y entregó a todos los estudiantes el mismo resultado. Este le decía al examinado que tenía gran necesidad de aprecio, pero que era crítico consigo mismo. Que trataba de compensar sus debilidades, y así muchas otras cosas, muy personales e íntimas. El texto les cuadró a todos. Así, la mayoría de astrólogos usan esa técnica, y la gente siente que acertaron.</p>
            <p>Algunos se arriesgan a pronósticos más precisos, y en ellos casi siempre se equivocan, pero nos recuerdan solo sus aciertos. Este año habrá quienes se vanagloriarán de haber predicho la muerte de Fidel Castro; no nos recordarán que llevan 10 años prediciéndola. Busquen en la web las predicciones de sus astrólogos preferidos para el 2016. Una conocida astróloga mexicana pronosticó la caída de Maduro y que Jeb Bush iba a ser presidente. Otro lamentó informarnos que el papa Francisco sufriría una grave enfermedad. Acertó, eso sí, al predecir que en el mundo habría más refugiados.</p>
            <p>A mí, el astrólogo colombiano de cabecera me predijo que iba a participar en eventos al aire libre y me recomendó utilizar mi capacidad creativa para labrarme un buen futuro. Comparto feliz estas buenas predicciones con otros 625 millones de terrícolas.</p>
            <p class="reading-source">Tomado y adaptado de: Wasserman, M. (22 de diciembre de 2016). Otra vez “horoscopeando”. <em>El Tiempo</em>. Recuperado de http://www.eltiempo.com/archivo/documento/CMS-16778742</p>
          </article>
`
      }
    ],
    prompt: "Considere las siguientes predicciones, presentadas en el penúltimo párrafo del texto: 1) El papa Francisco sufrirá una grave enfermedad. 2) En el mundo habrá más refugiados. ¿Cuál es la relación entre estas dos afirmaciones?",
    options: [
      { letter: "A", text: "Son complementarias, puesto que ambas sirven para probar que las predicciones específicas de los astrólogos son ciertas." },
      { letter: "B", text: "Tienen la misma función, ya que ambas prueban que las predicciones generales de los astrólogos suelen resultar falsas." },
      { letter: "C", text: "Son contradictorias, puesto que 1) dice lo contrario que 2), mostrando que los horóscopos son una práctica incoherente." },
      { letter: "D", text: "Tienen funciones opuestas, ya que 1) prueba que las predicciones particulares fallan, y 2) que las generales aciertan." }
    ],
    correctAnswer: "D",
    explanation: "En el penúltimo párrafo, el autor muestra que las predicciones específicas suelen fallar, como la enfermedad grave del papa Francisco, mientras que una predicción general puede parecer acertada, como afirmar que habría más refugiados. Por eso, las dos afirmaciones cumplen funciones opuestas. La respuesta correcta es D."
  }
  ,
  {
    uid: "s1-lect-053",
    session: 1,
    block: 2,
    number: 53,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Uso de evidencia en la argumentación",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 53",
    stem: "Responda de acuerdo con el texto sobre los horóscopos.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading horoscope-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 52 Y 53 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Me pregunto qué diría un comité de ética si un periódico indujera a sus lectores a cambiar comportamientos, a vender o comprar propiedades, a suspender relaciones amorosas o a cambiar de trabajo. Todo eso con el agravante de que la intromisión proviene de afirmaciones sin base científica o factual, producto de la pluma de alguien que ya ha demostrado estar equivocado y se lucra de la ingenuidad de la gente. Pues eso es exactamente lo que pasa con los horóscopos que nos inundan por esta época, incluso en los medios de la mayor seriedad.</p>
            <p>Horóscopos y cartas astrales se basan en creencias y mitos de diversas culturas, en escritos antiguos que están equivocados y se contradicen en sus predicciones. Los signos del Zodíaco, por ejemplo, no son 12 sino 13, y hay quienes piensan que 14. Los astrólogos esconden ese hecho, que nos obligaría a reubicarnos en signos diferentes al nuestro tradicional, cambiando el análisis de personalidad y las predicciones de toda la vida. ¡Qué oso!</p>
            <p>El nombre y carácter de los signos se derivan de lo que creían ver en las estrellas astrónomos de la Antigüedad. Podrían haber imaginado cosas distintas. Hoy, por ejemplo, no verían una balanza (pieza de museo) en los astros del signo Libra. Quizás verían un brasier, y eso nos daría a los del signo nuestra proverbial fama de equilibrados.</p>
            <p>En los análisis de personalidad hacen afirmaciones generales que le cuadran a cualquiera. Aprovechan lo que en psicología se llama efecto Forer. Forer sometió a sus estudiantes a un test que supuestamente había elaborado para definir la personalidad. Posteriormente, le entregó a cada uno su resultado y le pidió que calificara su precisión de 0 a 5. El test recibió una excelente calificación promedio de 4,2.</p>
            <p>El asunto fue que Forer no leyó los exámenes y entregó a todos los estudiantes el mismo resultado. Este le decía al examinado que tenía gran necesidad de aprecio, pero que era crítico consigo mismo. Que trataba de compensar sus debilidades, y así muchas otras cosas, muy personales e íntimas. El texto les cuadró a todos. Así, la mayoría de astrólogos usan esa técnica, y la gente siente que acertaron.</p>
            <p>Algunos se arriesgan a pronósticos más precisos, y en ellos casi siempre se equivocan, pero nos recuerdan solo sus aciertos. Este año habrá quienes se vanagloriarán de haber predicho la muerte de Fidel Castro; no nos recordarán que llevan 10 años prediciéndola. Busquen en la web las predicciones de sus astrólogos preferidos para el 2016. Una conocida astróloga mexicana pronosticó la caída de Maduro y que Jeb Bush iba a ser presidente. Otro lamentó informarnos que el papa Francisco sufriría una grave enfermedad. Acertó, eso sí, al predecir que en el mundo habría más refugiados.</p>
            <p>A mí, el astrólogo colombiano de cabecera me predijo que iba a participar en eventos al aire libre y me recomendó utilizar mi capacidad creativa para labrarme un buen futuro. Comparto feliz estas buenas predicciones con otros 625 millones de terrícolas.</p>
            <p class="reading-source">Tomado y adaptado de: Wasserman, M. (22 de diciembre de 2016). Otra vez “horoscopeando”. <em>El Tiempo</em>. Recuperado de http://www.eltiempo.com/archivo/documento/CMS-16778742</p>
          </article>
`
      }
    ],
    prompt: "Considere los párrafos 4 y 5 del texto. En ellos, el autor busca mostrar que los análisis de personalidad a veces son engañosos. El experimento realizado por Forer logra apoyar bien esa idea, pues en este se evidencia que",
    options: [
      { letter: "A", text: "la mayoría de la gente es proclive a creer en los test de personalidad, sobre todo si estos afirman cosas positivas." },
      { letter: "B", text: "los estudiantes están sesgados y predispuestos a considerar como verdadero lo que su profesor de psicología les dice." },
      { letter: "C", text: "debido a las diferencias normales entre sus personalidades, los estudiantes no le otorgaron a la prueba una calificación más alta." },
      { letter: "D", text: "a pesar de las diferentes personalidades de los estudiantes, todos ellos se sintieron identificados con una misma descripción general." }
    ],
    correctAnswer: "D",
    explanation: "El experimento de Forer apoya la idea de que ciertas descripciones generales parecen ajustarse a cualquiera: todos los estudiantes recibieron el mismo resultado y, aun así, lo calificaron como preciso. Por eso, la respuesta correcta es D."
  }

  ,
  {
    uid: "s1-lect-054",
    session: 1,
    block: 2,
    number: 54,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Ubicación de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 54",
    stem: "Responda de acuerdo con el texto sobre la firma del armisticio.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading war-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 54 A 57 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>El tren se detuvo en el interior del bosque. La niebla envolvía los robles alrededor del claro. Eran las 7 a. m. del 8 de noviembre de 1918. Estaba finalizando la Primera Guerra Mundial. Estaba empezando la Segunda.</p>
            <p>Desde el último coche, cuya tapicería de raso verde era una reliquia de los tiempos en que había sido el vagón privado del emperador Napoleón III de Francia, los pasajeros pudieron ver otro coche en un apartadero. Ignoraban dónde estaban, pero sabían que aquella era la última parada de un viaje de pesadilla... un viaje, que esperaban, pondría fin a los combates.</p>
            <p>Un oficial del ejército francés apareció en la puerta para informar a los recién llegados, seis alemanes, que el mariscal Ferdinand Foch, supremo comandante de las fuerzas aliadas, les recibiría a las 9 a. m. Para Matthias Erzberger, portavoz del grupo, la perspectiva de esperar solo podía aumentar su incomodidad. Le dolía el pesado cuerpo, su sombrero estaba aplastado y, en algún lugar del camino había perdido las gafas.</p>
            <p>Unos minutos antes de las 9 a. m., los alemanes cruzaron un caminillo de tablillas que había sido colocado entre las vías y entraron en el cuartel de Foch, un antiguo coche-cama francés. Luego, de porte erguido a la edad de 67 años, apareció Foch, acompañado por el Primer Lord de la Marina de Inglaterra, almirante Rosslyn Wemyss.</p>
            <p>Foch se mostró glacialmente formal:</p>
            <p>— ¿Qué trae a estos caballeros por aquí? ¿Qué quieren de mí?</p>
            <p>Erzberger dijo que habían ido con el fin de recibir las propuestas aliadas para una tregua.</p>
            <p>— No tengo ninguna propuesta que hacer —dijo Foch.</p>
            <p>Hubo un momento de consternación; uno de los alemanes preguntó cómo quería que se expresaran.</p>
            <p>— ¿Desean una tregua? —respondió Foch—. Si es así, les puedo comunicar las condiciones bajo las cuales la pueden obtener.</p>
            <p>Pidieron tregua.</p>
            <p>El silencio fue absoluto mientras un edecán leía las condiciones. Foch permaneció sentado como una estatua. El almirante jugaba con su monóculo. Mientras escuchaban, los alemanes quedaron aturdidos, comprendiendo por primera vez la magnitud de su derrota.</p>
            <p>Tres días más tarde, el 11 de noviembre de 1918, a las 5:20 a. m., en el mismo vagón, Erzberger firmó la tregua y, al hacerlo, su propia sentencia de muerte. Tres años después sería abatido a tiros por compatriotas resentidos, un par de exoficiales del ejército, nacionalistas y fanáticos.</p>
            <p>La intransigencia de Foch y el fatídico destino de Erzberger son vívidos ejemplos de las fuerzas desatadas al final del primer gran conflicto, que condujeron —y hoy nos parece inevitable— al segundo. Estas fuerzas, compuestas de rencor y orgullo, tanto en los alemanes como en sus vencedores, iban a cobrar impulso aún después de que se acallaran las armas.</p>
            <p class="source-note">Tomado y adaptado de: Elson, R. (1995). <em>La Segunda Guerra Mundial. El preludio de la guerra I.</em> Barcelona: Ediciones Folio.</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con el texto, la firma del armisticio se da en",
    options: [
      { letter: "A", text: "una zona neutral para aliados y alemanes." },
      { letter: "B", text: "un vagón de tren en territorio aliado." },
      { letter: "C", text: "un batallón militar del ejército francés." },
      { letter: "D", text: "una estación de tren en medio de un bosque." }
    ],
    correctAnswer: "B",
    explanation: "El texto indica que tres días después, el 11 de noviembre de 1918, Erzberger firmó la tregua “en el mismo vagón”. Además, ese vagón correspondía al cuartel de Foch, un antiguo coche-cama francés, es decir, en territorio aliado. Por eso, la respuesta correcta es B."
  },
  {
    uid: "s1-lect-055",
    session: 1,
    block: 2,
    number: 55,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia y caracterización de personajes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 55",
    stem: "Responda de acuerdo con el texto sobre la situación de los delegados alemanes.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading war-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 54 A 57 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>El tren se detuvo en el interior del bosque. La niebla envolvía los robles alrededor del claro. Eran las 7 a. m. del 8 de noviembre de 1918. Estaba finalizando la Primera Guerra Mundial. Estaba empezando la Segunda.</p>
            <p>Desde el último coche, cuya tapicería de raso verde era una reliquia de los tiempos en que había sido el vagón privado del emperador Napoleón III de Francia, los pasajeros pudieron ver otro coche en un apartadero. Ignoraban dónde estaban, pero sabían que aquella era la última parada de un viaje de pesadilla... un viaje, que esperaban, pondría fin a los combates.</p>
            <p>Un oficial del ejército francés apareció en la puerta para informar a los recién llegados, seis alemanes, que el mariscal Ferdinand Foch, supremo comandante de las fuerzas aliadas, les recibiría a las 9 a. m. Para Matthias Erzberger, portavoz del grupo, la perspectiva de esperar solo podía aumentar su incomodidad. Le dolía el pesado cuerpo, su sombrero estaba aplastado y, en algún lugar del camino había perdido las gafas.</p>
            <p>Unos minutos antes de las 9 a. m., los alemanes cruzaron un caminillo de tablillas que había sido colocado entre las vías y entraron en el cuartel de Foch, un antiguo coche-cama francés. Luego, de porte erguido a la edad de 67 años, apareció Foch, acompañado por el Primer Lord de la Marina de Inglaterra, almirante Rosslyn Wemyss.</p>
            <p>Foch se mostró glacialmente formal:</p>
            <p>— ¿Qué trae a estos caballeros por aquí? ¿Qué quieren de mí?</p>
            <p>Erzberger dijo que habían ido con el fin de recibir las propuestas aliadas para una tregua.</p>
            <p>— No tengo ninguna propuesta que hacer —dijo Foch.</p>
            <p>Hubo un momento de consternación; uno de los alemanes preguntó cómo quería que se expresaran.</p>
            <p>— ¿Desean una tregua? —respondió Foch—. Si es así, les puedo comunicar las condiciones bajo las cuales la pueden obtener.</p>
            <p>Pidieron tregua.</p>
            <p>El silencio fue absoluto mientras un edecán leía las condiciones. Foch permaneció sentado como una estatua. El almirante jugaba con su monóculo. Mientras escuchaban, los alemanes quedaron aturdidos, comprendiendo por primera vez la magnitud de su derrota.</p>
            <p>Tres días más tarde, el 11 de noviembre de 1918, a las 5:20 a. m., en el mismo vagón, Erzberger firmó la tregua y, al hacerlo, su propia sentencia de muerte. Tres años después sería abatido a tiros por compatriotas resentidos, un par de exoficiales del ejército, nacionalistas y fanáticos.</p>
            <p>La intransigencia de Foch y el fatídico destino de Erzberger son vívidos ejemplos de las fuerzas desatadas al final del primer gran conflicto, que condujeron —y hoy nos parece inevitable— al segundo. Estas fuerzas, compuestas de rencor y orgullo, tanto en los alemanes como en sus vencedores, iban a cobrar impulso aún después de que se acallaran las armas.</p>
            <p class="source-note">Tomado y adaptado de: Elson, R. (1995). <em>La Segunda Guerra Mundial. El preludio de la guerra I.</em> Barcelona: Ediciones Folio.</p>
          </article>
        `
      }
    ],
    prompt: "Es posible describir a los alemanes como",
    options: [
      { letter: "A", text: "desesperados, pues hicieron un largo viaje para poder hablar con Foch." },
      { letter: "B", text: "vencidos, pero ignorantes de su situación real." },
      { letter: "C", text: "indecisos, pues les tomó alrededor de tres días decidir firmar el armisticio." },
      { letter: "D", text: "combativos, pero con voluntad de hacer la paz." }
    ],
    correctAnswer: "B",
    explanation: "Los alemanes ya estaban vencidos, pero el texto señala que al escuchar las condiciones quedaron aturdidos y comprendieron por primera vez la magnitud de su derrota. Por eso, la respuesta correcta es B."
  },
  {
    uid: "s1-lect-056",
    session: 1,
    block: 2,
    number: 56,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Identificación de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 56",
    stem: "Responda de acuerdo con el texto sobre Matthias Erzberger.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading war-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 54 A 57 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>El tren se detuvo en el interior del bosque. La niebla envolvía los robles alrededor del claro. Eran las 7 a. m. del 8 de noviembre de 1918. Estaba finalizando la Primera Guerra Mundial. Estaba empezando la Segunda.</p>
            <p>Desde el último coche, cuya tapicería de raso verde era una reliquia de los tiempos en que había sido el vagón privado del emperador Napoleón III de Francia, los pasajeros pudieron ver otro coche en un apartadero. Ignoraban dónde estaban, pero sabían que aquella era la última parada de un viaje de pesadilla... un viaje, que esperaban, pondría fin a los combates.</p>
            <p>Un oficial del ejército francés apareció en la puerta para informar a los recién llegados, seis alemanes, que el mariscal Ferdinand Foch, supremo comandante de las fuerzas aliadas, les recibiría a las 9 a. m. Para Matthias Erzberger, portavoz del grupo, la perspectiva de esperar solo podía aumentar su incomodidad. Le dolía el pesado cuerpo, su sombrero estaba aplastado y, en algún lugar del camino había perdido las gafas.</p>
            <p>Unos minutos antes de las 9 a. m., los alemanes cruzaron un caminillo de tablillas que había sido colocado entre las vías y entraron en el cuartel de Foch, un antiguo coche-cama francés. Luego, de porte erguido a la edad de 67 años, apareció Foch, acompañado por el Primer Lord de la Marina de Inglaterra, almirante Rosslyn Wemyss.</p>
            <p>Foch se mostró glacialmente formal:</p>
            <p>— ¿Qué trae a estos caballeros por aquí? ¿Qué quieren de mí?</p>
            <p>Erzberger dijo que habían ido con el fin de recibir las propuestas aliadas para una tregua.</p>
            <p>— No tengo ninguna propuesta que hacer —dijo Foch.</p>
            <p>Hubo un momento de consternación; uno de los alemanes preguntó cómo quería que se expresaran.</p>
            <p>— ¿Desean una tregua? —respondió Foch—. Si es así, les puedo comunicar las condiciones bajo las cuales la pueden obtener.</p>
            <p>Pidieron tregua.</p>
            <p>El silencio fue absoluto mientras un edecán leía las condiciones. Foch permaneció sentado como una estatua. El almirante jugaba con su monóculo. Mientras escuchaban, los alemanes quedaron aturdidos, comprendiendo por primera vez la magnitud de su derrota.</p>
            <p>Tres días más tarde, el 11 de noviembre de 1918, a las 5:20 a. m., en el mismo vagón, Erzberger firmó la tregua y, al hacerlo, su propia sentencia de muerte. Tres años después sería abatido a tiros por compatriotas resentidos, un par de exoficiales del ejército, nacionalistas y fanáticos.</p>
            <p>La intransigencia de Foch y el fatídico destino de Erzberger son vívidos ejemplos de las fuerzas desatadas al final del primer gran conflicto, que condujeron —y hoy nos parece inevitable— al segundo. Estas fuerzas, compuestas de rencor y orgullo, tanto en los alemanes como en sus vencedores, iban a cobrar impulso aún después de que se acallaran las armas.</p>
            <p class="source-note">Tomado y adaptado de: Elson, R. (1995). <em>La Segunda Guerra Mundial. El preludio de la guerra I.</em> Barcelona: Ediciones Folio.</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con el texto, Matthias Erzberger era",
    options: [
      { letter: "A", text: "un político francés que sirvió como mediador en la negociación entre los alemanes y Foch." },
      { letter: "B", text: "un diplomático alemán encargado de negociar con el supremo comandante de las fuerzas aliadas." },
      { letter: "C", text: "un oficial del ejército aliado que acompañó a los alemanes al momento de negociar con Foch." },
      { letter: "D", text: "un edecán encargado de comandar el grupo de negociación conformado por alemanes y aliados." }
    ],
    correctAnswer: "B",
    explanation: "El texto presenta a Matthias Erzberger como portavoz del grupo de alemanes y muestra que fue quien explicó a Foch que habían ido a recibir las propuestas aliadas para una tregua. Por eso, la respuesta correcta es B."
  },
  {
    uid: "s1-lect-057",
    session: 1,
    block: 2,
    number: 57,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre textos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 57",
    stem: "Responda de acuerdo con el texto principal y el fragmento complementario.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading war-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 54 A 57 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>El tren se detuvo en el interior del bosque. La niebla envolvía los robles alrededor del claro. Eran las 7 a. m. del 8 de noviembre de 1918. Estaba finalizando la Primera Guerra Mundial. Estaba empezando la Segunda.</p>
            <p>Desde el último coche, cuya tapicería de raso verde era una reliquia de los tiempos en que había sido el vagón privado del emperador Napoleón III de Francia, los pasajeros pudieron ver otro coche en un apartadero. Ignoraban dónde estaban, pero sabían que aquella era la última parada de un viaje de pesadilla... un viaje, que esperaban, pondría fin a los combates.</p>
            <p>Un oficial del ejército francés apareció en la puerta para informar a los recién llegados, seis alemanes, que el mariscal Ferdinand Foch, supremo comandante de las fuerzas aliadas, les recibiría a las 9 a. m. Para Matthias Erzberger, portavoz del grupo, la perspectiva de esperar solo podía aumentar su incomodidad. Le dolía el pesado cuerpo, su sombrero estaba aplastado y, en algún lugar del camino había perdido las gafas.</p>
            <p>Unos minutos antes de las 9 a. m., los alemanes cruzaron un caminillo de tablillas que había sido colocado entre las vías y entraron en el cuartel de Foch, un antiguo coche-cama francés. Luego, de porte erguido a la edad de 67 años, apareció Foch, acompañado por el Primer Lord de la Marina de Inglaterra, almirante Rosslyn Wemyss.</p>
            <p>Foch se mostró glacialmente formal:</p>
            <p>— ¿Qué trae a estos caballeros por aquí? ¿Qué quieren de mí?</p>
            <p>Erzberger dijo que habían ido con el fin de recibir las propuestas aliadas para una tregua.</p>
            <p>— No tengo ninguna propuesta que hacer —dijo Foch.</p>
            <p>Hubo un momento de consternación; uno de los alemanes preguntó cómo quería que se expresaran.</p>
            <p>— ¿Desean una tregua? —respondió Foch—. Si es así, les puedo comunicar las condiciones bajo las cuales la pueden obtener.</p>
            <p>Pidieron tregua.</p>
            <p>El silencio fue absoluto mientras un edecán leía las condiciones. Foch permaneció sentado como una estatua. El almirante jugaba con su monóculo. Mientras escuchaban, los alemanes quedaron aturdidos, comprendiendo por primera vez la magnitud de su derrota.</p>
            <p>Tres días más tarde, el 11 de noviembre de 1918, a las 5:20 a. m., en el mismo vagón, Erzberger firmó la tregua y, al hacerlo, su propia sentencia de muerte. Tres años después sería abatido a tiros por compatriotas resentidos, un par de exoficiales del ejército, nacionalistas y fanáticos.</p>
            <p>La intransigencia de Foch y el fatídico destino de Erzberger son vívidos ejemplos de las fuerzas desatadas al final del primer gran conflicto, que condujeron —y hoy nos parece inevitable— al segundo. Estas fuerzas, compuestas de rencor y orgullo, tanto en los alemanes como en sus vencedores, iban a cobrar impulso aún después de que se acallaran las armas.</p>
            <p class="source-note">Tomado y adaptado de: Elson, R. (1995). <em>La Segunda Guerra Mundial. El preludio de la guerra I.</em> Barcelona: Ediciones Folio.</p>
          </article>

          <article class="reading-card prose-reading fragment-reading">
            <p><strong>Considere el siguiente fragmento:</strong></p>
            <p>Las cláusulas territoriales del Tratado de Versalles [el acuerdo de paz firmado en 1919 entre aliados y alemanes tras finalizar la Primera Guerra Mundial] dejaban a Alemania prácticamente intacta. Seguía siendo el más grande de los bloques raciales homogéneos de Europa.</p>
            <p>Cuando el mariscal Foch se enteró de la firma del Tratado de Paz de Versalles, comentó con singular acierto: "Esto no es la paz. Es una tregua por veinte años".</p>
            <p class="source-note">Tomado y adaptado de: Churchill, W. (1986). <em>The Second World War. The Gathering Storm.</em> Mariner Books.</p>
          </article>
        `
      }
    ],
    prompt: "¿Qué relación guarda el anterior fragmento con el texto principal?",
    options: [
      { letter: "A", text: "Lo complementa, pues muestra un aspecto desconocido del mariscal Foch que está en contra de aceptar el armisticio." },
      { letter: "B", text: "Lo contradice, pues en el texto principal se advierte que Foch apoyaba las condiciones impuestas a los alemanes para la firma del armisticio." },
      { letter: "C", text: "Lo complementa, pues da más razones para asegurar que el fin de la Primera Guerra Mundial fue el inicio de la Segunda." },
      { letter: "D", text: "Lo contradice, pues en el texto principal se advierte que el fin de la Primera Guerra Mundial solo tuvo consecuencias negativas para Alemania." }
    ],
    correctAnswer: "C",
    explanation: "El fragmento complementa el texto principal porque añade otra razón para sostener que el cierre de la Primera Guerra Mundial no resolvió el conflicto de fondo, sino que dejó condiciones que anticipaban la Segunda Guerra Mundial. Por eso, la respuesta correcta es C."
  }


,
  {
    uid: "s1-lect-058",
    session: 1,
    block: 2,
    number: 58,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre enunciados",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 58",
    stem: "Responda de acuerdo con el texto sobre la preservación de las especies.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading ecology-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 58 Y 59 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Existen argumentos en contra de la preservación de las especies, esgrimidos por quienes no consideran fatal que la humanidad colabore en la desaparición del escenario de otras especies. Quizás el más extendido es el de que la extinción es un proceso evolutivo perfectamente natural, que se ha venido produciendo durante millones de años con o sin la participación humana. ¿Por qué hay que preocuparse si en realidad se está ayudando a la naturaleza a seguir su curso?</p>
            <p>Cuando en 1859, Charles Darwin expuso la teoría de la evolución, junto a las correspondientes pruebas a su favor, no proponía solo la selección natural como fuerza directriz del proceso evolutivo, sino que reconocía también la inevitabilidad de la extinción. Decía Darwin que "como las nuevas formas se producen lenta y constantemente, a menos que admitamos que el número de formas específicas puede seguir aumentando perpetua y casi indefinidamente, es inevitable que haya grupos que se extingan".</p>
            <p>Antes de Darwin, la idea de la extinción ya había sido tratada por varios geólogos y naturalistas; sin embargo, a mediados del siglo XIX, el concepto resultaba escandaloso para la mayoría de personas. Se creía que todo ser vivo había sido creado por Dios, según una secuencia de complejidad creciente, y que las especies aparecieron en un único acto creador, así que la visión “creacionista” de las especies no contemplaba la extinción. No obstante, actualmente parece haberse cerrado el ciclo; no solo ya no escandaliza la idea de la extinción, sino que se toma el nombre de Darwin en vano cuando se pretende justificar el exterminio de las otras especies a manos del <em>Homo sapiens</em>.</p>
            <p>Es evidente que quienes recurren a este tipo de argumentos pasan por alto un dato importante, y es que la humanidad ya ha elevado la tasa de extinción de especies muy por encima de las tasas históricas de aparición de las mismas. Las especies desaparecen ahora mucho más deprisa de lo que aparecen, y la tasa de desaparición promete seguir aumentando vertiginosamente. El argumento que justifica el exterminio recuerda a aquel hombre que, al ver cómo el agua escapaba por unas grietas cada vez más anchas del muro de una gran presa, decía a las gentes que vivían río abajo: "No hay por qué preocuparse; después de todo, el agua siempre ha salido por el sobradero".</p>
            <p class="source-note">Tomado de: Ehrlich, P. R. y Ehrlich, A. H. (1987). <em>Extinción.</em> Barcelona: Salvat Editores.</p>
          </article>
        `
      }
    ],
    prompt: "Considere el siguiente fragmento del texto: “Quizás el [argumento contra la preservación de las especies] más extendido es el de que la extinción es un proceso evolutivo perfectamente natural, que se ha venido produciendo durante millones de años con o sin la participación humana. ¿Por qué hay que preocuparse si en realidad se está ayudando a la naturaleza a seguir su curso?”. ¿Cuál es la relación entre los dos enunciados que componen este fragmento?",
    options: [
      { letter: "A", text: "La pregunta pone en duda la tesis de la frase que la precede." },
      { letter: "B", text: "Los enunciados se oponen entre sí." },
      { letter: "C", text: "La pregunta busca aclarar una idea de la frase que la precede." },
      { letter: "D", text: "Los enunciados apoyan una misma tesis." }
    ],
    correctAnswer: "A",
    explanation: "La pregunta final introduce un cuestionamiento retórico frente a la afirmación anterior: si la extinción se presenta como natural, entonces se pone en duda la necesidad de preocuparse por ella. Por eso, la respuesta correcta es A."
  },
  {
    uid: "s1-lect-059",
    session: 1,
    block: 2,
    number: 59,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre textos y argumentos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 59",
    stem: "Responda de acuerdo con el texto principal y el texto complementario.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading ecology-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 58 Y 59 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Existen argumentos en contra de la preservación de las especies, esgrimidos por quienes no consideran fatal que la humanidad colabore en la desaparición del escenario de otras especies. Quizás el más extendido es el de que la extinción es un proceso evolutivo perfectamente natural, que se ha venido produciendo durante millones de años con o sin la participación humana. ¿Por qué hay que preocuparse si en realidad se está ayudando a la naturaleza a seguir su curso?</p>
            <p>Cuando en 1859, Charles Darwin expuso la teoría de la evolución, junto a las correspondientes pruebas a su favor, no proponía solo la selección natural como fuerza directriz del proceso evolutivo, sino que reconocía también la inevitabilidad de la extinción. Decía Darwin que "como las nuevas formas se producen lenta y constantemente, a menos que admitamos que el número de formas específicas puede seguir aumentando perpetua y casi indefinidamente, es inevitable que haya grupos que se extingan".</p>
            <p>Antes de Darwin, la idea de la extinción ya había sido tratada por varios geólogos y naturalistas; sin embargo, a mediados del siglo XIX, el concepto resultaba escandaloso para la mayoría de personas. Se creía que todo ser vivo había sido creado por Dios, según una secuencia de complejidad creciente, y que las especies aparecieron en un único acto creador, así que la visión “creacionista” de las especies no contemplaba la extinción. No obstante, actualmente parece haberse cerrado el ciclo; no solo ya no escandaliza la idea de la extinción, sino que se toma el nombre de Darwin en vano cuando se pretende justificar el exterminio de las otras especies a manos del <em>Homo sapiens</em>.</p>
            <p>Es evidente que quienes recurren a este tipo de argumentos pasan por alto un dato importante, y es que la humanidad ya ha elevado la tasa de extinción de especies muy por encima de las tasas históricas de aparición de las mismas. Las especies desaparecen ahora mucho más deprisa de lo que aparecen, y la tasa de desaparición promete seguir aumentando vertiginosamente. El argumento que justifica el exterminio recuerda a aquel hombre que, al ver cómo el agua escapaba por unas grietas cada vez más anchas del muro de una gran presa, decía a las gentes que vivían río abajo: "No hay por qué preocuparse; después de todo, el agua siempre ha salido por el sobradero".</p>
            <p class="source-note">Tomado de: Ehrlich, P. R. y Ehrlich, A. H. (1987). <em>Extinción.</em> Barcelona: Salvat Editores.</p>
          </article>

          <article class="reading-card prose-reading fragment-reading">
            <p><strong>Considere el siguiente texto:</strong></p>
            <p>"¡Ah, la madre naturaleza necesita favores! Debió pensarlo cuando nos asoló con inundaciones, sequías y monos enfermos. ¿Ella inició la lucha por sobrevivir y ahora quiere renunciar porque está perdiendo? Pues yo digo, ¡mala noche!" (Montgomery Burns, <em>Los Simpsons</em>).</p>
          </article>
        `
      }
    ],
    prompt: "Quienes están en contra de la preservación de las especies podrían argumentar que la idea del párrafo anterior",
    options: [
      { letter: "A", text: "contradice su tesis, porque favorece el rechazo del autor a quienes dudan de la extinción." },
      { letter: "B", text: "complementa su tesis, porque contradice la defensa del autor de que la extinción es antinatural." },
      { letter: "C", text: "debilita su tesis, porque caricaturiza el argumento de que la extinción es aceptable por tratarse de un proceso natural." },
      { letter: "D", text: "apoya su tesis, porque presenta una nueva manera de comprender la teoría de la inevitabilidad de la extinción." }
    ],
    correctAnswer: "B",
    explanation: "Desde la postura de quienes se oponen a la preservación, el texto de Montgomery Burns podría usarse para reforzar la idea de que la naturaleza funciona por lucha y pérdida, y que no habría que intervenir para proteger especies. Por eso, la respuesta correcta es B."
  }


,
  {
    uid: "s1-lect-060",
    session: 1,
    block: 2,
    number: 60,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 60",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `Considere la siguiente oración del texto:<br><br><em>"Es difícil, por no decir imposible, diseñar un ordenador que sea obedientemente útil y, al mismo tiempo, inmune a la infección".</em><br><br>En la oración anterior, la palabra "inmune" se podría reemplazar por`,
    options: [
      { letter: "A", text: "inatacable." },
      { letter: "B", text: "proclive." },
      { letter: "C", text: "invulnerable." },
      { letter: "D", text: "propenso." }
    ],
    correctAnswer: "C",
    explanation: "En el contexto, 'inmune' significa que no puede ser afectado o vulnerado por la infección. La palabra más cercana es 'invulnerable'. Por eso, la respuesta correcta es C."
  }
,
  {
    uid: "s1-lect-061",
    session: 1,
    block: 2,
    number: 61,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Interpretación de sentido local",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 61",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `Considere el siguiente enunciado del texto:<br><br><em>"Simplemente, [los computadores] obedecen, como se supone que lo hacen los soldados".</em><br><br>Lo que el autor quiere decir con este enunciado es que los computadores`,
    options: [
      { letter: "A", text: "siempre están expuestos a los virus." },
      { letter: "B", text: "desconocen si una instrucción es correcta." },
      { letter: "C", text: "siguen las órdenes sin cuestionarlas." },
      { letter: "D", text: "son capaces de tomar decisiones." }
    ],
    correctAnswer: "C",
    explanation: "La comparación con los soldados resalta la obediencia automática de los computadores: ejecutan órdenes sin analizarlas ni cuestionarlas. Por eso, la respuesta correcta es C."
  }
,
  {
    uid: "s1-lect-062",
    session: 1,
    block: 2,
    number: 62,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre enunciados",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 62",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `Considere los siguientes enunciados del texto:<br><br>1. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores.<br><br>2. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos.<br><br>La relación entre los enunciados 1 y 2 puede describirse de la siguiente manera:`,
    options: [
      { letter: "A", text: "El enunciado 1 es una evidencia en contra del enunciado 2." },
      { letter: "B", text: "El enunciado 2 es una evidencia a favor del enunciado 1." },
      { letter: "C", text: "El enunciado 1 es una evidencia a favor del enunciado 2." },
      { letter: "D", text: "El enunciado 2 es una evidencia en contra del enunciado 1." }
    ],
    correctAnswer: "C",
    explanation: "El primer enunciado funciona como ejemplo concreto de la idea general expresada en el segundo: la obediencia de los computadores los hace vulnerables. Por eso, la respuesta correcta es C."
  }
,
  {
    uid: "s1-lect-063",
    session: 1,
    block: 2,
    number: 63,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Identificación de la idea global",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 63",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `¿Cuál es la pregunta principal que busca responder el texto?`,
    options: [
      { letter: "A", text: "¿Por qué los computadores pueden ser invulnerables a los virus?" },
      { letter: "B", text: "¿Cuál es el principal rasgo de los computadores y qué implicaciones tiene dicho rasgo?" },
      { letter: "C", text: "¿Cuál es la principal característica de los computadores y qué ventajas posee dicho rasgo?" },
      { letter: "D", text: "¿Por qué los computadores, a pesar de ser vulnerables, tienen la utilidad de detectar buenos y malos efectos?" }
    ],
    correctAnswer: "B",
    explanation: "El texto explica que el rasgo central de los computadores es su obediencia a las instrucciones, y desarrolla sus implicaciones: utilidad y vulnerabilidad. Por eso, la respuesta correcta es B."
  }
,
  {
    uid: "s1-lect-064",
    session: 1,
    block: 2,
    number: 64,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia a partir de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 64",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `De acuerdo con la información dada en el texto, si su computador es infectado por un programa con las características descritas por el autor,`,
    options: [
      { letter: "A", text: "no podrá obedecer otro tipo de instrucciones dadas en el lenguaje de programación." },
      { letter: "B", text: "enviará el programa a todas las direcciones que encuentre en el disco duro." },
      { letter: "C", text: "no podrá realizar acciones útiles como procesar textos o realizar hojas de cálculo." },
      { letter: "D", text: "será incapaz de ser útil y, al mismo tiempo, invulnerable a diferentes virus." }
    ],
    correctAnswer: "B",
    explanation: "El programa descrito ordena copiarse y enviarse a todas las direcciones encontradas en el disco duro; según el texto, el computador obedecerá esa instrucción. Por eso, la respuesta correcta es B."
  }
,
  {
    uid: "s1-lect-065",
    session: 1,
    block: 2,
    number: 65,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia a partir de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 65",
    stem: "Responda de acuerdo con el fragmento de Frankenstein.",
    resources: [
      {
        type: "html",
        html: `

          <article class="reading-card prose-reading frankenstein-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 65 Y 66 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Con estos sentimientos, empecé la creación de un ser humano. Como la pequeñez de las partes constituía un gran obstáculo para la rapidez de mi trabajo, decidí, en contra de mi primera intención, hacer un ser de estatura gigantesca; es decir, de unos ocho pies de alto, y de una anchura proporcionada. Y tras adoptar esta decisión, y pasar meses recogiendo y ordenando material, emprendí mi trabajo.</p>
            <p>Nadie puede imaginar la diversidad de sentimientos que me empujaron a seguir, como un huracán, desde el primer entusiasmo de éxito. La vida y la muerte me parecían barreras ideales que yo sería el primero en romper, derramando un torrente de luz sobre nuestro mundo en tinieblas. Una nueva especie me bendeciría como su origen y creador; muchas naturalezas excelentes y dichosas me deberían su ser. Ningún padre podría reclamar la gratitud de sus hijos con tanto derecho como yo merecería la de ellos. Siguiendo con estas reflexiones, pensé que si podía infundir animación en la materia inerte, en el curso del tiempo (pues ahora resultaba imposible), podría renovar la vida allí donde la muerte había sometido el cuerpo aparentemente a la corrupción.</p>
            <p>Hoy me tiemblan las piernas y se me humedecen los ojos ante el recuerdo; pero entonces me empujaba un deseo irresistible y casi frenético; parecía haber perdido por completo el alma y la sensibilidad salvo para este objetivo.</p>
            <p>La sala de disección y el matadero me proporcionaron muchos de mis materiales; con frecuencia, mi naturaleza abominaba mi empresa mientras, impulsado por una ansiedad perpetuamente en aumento, mi trabajo se acercaba a su fin.</p>
            <p class="source-note">Tomado de: Shelley, Mary. (2018). <em>Frankenstein.</em> p. 74. Madrid: Alianza Editorial.</p>
          </article>
`
      }
    ],
    prompt: `El narrador decide crear un ser de estatura gigantesca porque`,
    options: [
      { letter: "A", text: "su intención era que aquel nuevo ser infundiera terror en quienes lo vieran." },
      { letter: "B", text: "hacer un ser pequeño le iba a tomar más tiempo que hacer uno gigante." },
      { letter: "C", text: "en la sala de disección y en el matadero solo había materiales de gran tamaño." },
      { letter: "D", text: "sentía un deseo irresistible por crear una criatura de esa dimensión." }
    ],
    correctAnswer: "B",
    explanation: "El narrador afirma que la pequeñez de las partes era un obstáculo para la rapidez de su trabajo; por eso decide crear un ser gigantesco. La respuesta correcta es B."
  }
,
  {
    uid: "s1-lect-066",
    session: 1,
    block: 2,
    number: 66,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Interpretación de intención comunicativa",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 66",
    stem: "Responda de acuerdo con el fragmento de Frankenstein.",
    resources: [
      {
        type: "html",
        html: `

          <article class="reading-card prose-reading frankenstein-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 65 Y 66 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Con estos sentimientos, empecé la creación de un ser humano. Como la pequeñez de las partes constituía un gran obstáculo para la rapidez de mi trabajo, decidí, en contra de mi primera intención, hacer un ser de estatura gigantesca; es decir, de unos ocho pies de alto, y de una anchura proporcionada. Y tras adoptar esta decisión, y pasar meses recogiendo y ordenando material, emprendí mi trabajo.</p>
            <p>Nadie puede imaginar la diversidad de sentimientos que me empujaron a seguir, como un huracán, desde el primer entusiasmo de éxito. La vida y la muerte me parecían barreras ideales que yo sería el primero en romper, derramando un torrente de luz sobre nuestro mundo en tinieblas. Una nueva especie me bendeciría como su origen y creador; muchas naturalezas excelentes y dichosas me deberían su ser. Ningún padre podría reclamar la gratitud de sus hijos con tanto derecho como yo merecería la de ellos. Siguiendo con estas reflexiones, pensé que si podía infundir animación en la materia inerte, en el curso del tiempo (pues ahora resultaba imposible), podría renovar la vida allí donde la muerte había sometido el cuerpo aparentemente a la corrupción.</p>
            <p>Hoy me tiemblan las piernas y se me humedecen los ojos ante el recuerdo; pero entonces me empujaba un deseo irresistible y casi frenético; parecía haber perdido por completo el alma y la sensibilidad salvo para este objetivo.</p>
            <p>La sala de disección y el matadero me proporcionaron muchos de mis materiales; con frecuencia, mi naturaleza abominaba mi empresa mientras, impulsado por una ansiedad perpetuamente en aumento, mi trabajo se acercaba a su fin.</p>
            <p class="source-note">Tomado de: Shelley, Mary. (2018). <em>Frankenstein.</em> p. 74. Madrid: Alianza Editorial.</p>
          </article>
`
      }
    ],
    prompt: `La intención del narrador cuando dice "parecía haber perdido por completo el alma y la sensibilidad salvo para este objetivo" es:`,
    options: [
      { letter: "A", text: "Hacer una afirmación acerca de la creación del nuevo ser y la manera en que lo hizo." },
      { letter: "B", text: "Manifestar una emoción con respecto a su actitud durante la creación del nuevo ser." },
      { letter: "C", text: "Dirigir una pregunta indirecta al lector sobre su opinión al respecto del nuevo ser." },
      { letter: "D", text: "Comprometerse con el lector a no volver a actuar de la manera en que lo hizo." }
    ],
    correctAnswer: "B",
    explanation: "La frase aparece en una valoración retrospectiva: el narrador recuerda con estremecimiento su obsesión y expresa una emoción frente a la actitud que tuvo durante la creación. La respuesta correcta es B."
  }



,
  {
    uid: "s1-soc-067",
    session: 1,
    block: 3,
    number: 67,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Historia política de Colombia",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 67",
    stem: "A continuación, se presentan dos textos escritos por Antonio Nariño sobre la polémica entre centralistas y federalistas durante la independencia de la Nueva Granada. El primero fue escrito en 1811, cuando acababan de ocurrir los primeros gritos de independencia a lo largo de todo el reino. El segundo, mucho más tardío, se publicó en 1823, cuando las últimas acciones militares contra los españoles se estaban librando en lo que entonces era ya Colombia.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p><strong>1.</strong> "[...] el sistema de convertir nuestras provincias en estados soberanos para hacer la federación es una locura hija de la precipitación de nuestros juicios y de una ambición mal entendida. No es la extensión del terreno, no es la población, no son las riquezas ni las luces que forman la fuerza de un imperio por sí solas: la suma total de todas estas cosas forman su fuerza; y si nosotros en lugar de acumular nuestras luces, nuestras riquezas y nuestras fuerzas, las dividimos en otras tantas partes como tenemos de provincias, ¿cuál será el resultado?".</p>
            <p class="source-note">Tomado y adaptado de: Nariño, A. (1811). <em>La Bagatela N.º 5.</em> Imprenta Real de Don Bruno Espinosa de los Monteros.</p>
            <p><strong>2.</strong> "[...] el Gobierno federal es [...] el más adecuado para la libertad y el menos expuesto al abuso por el contrapeso que oponen las partes federadas. De aquí se deduce que, mientras tengamos sobre nosotros el Gobierno español, mientras este no reconozca nuestra independencia, lo que nos conviene es unidad de acción y el sistema centralista; pero que reconocida la independencia por la España, hallándonos sin peligros y con los elementos necesarios, la federación será la llama de la libertad".</p>
            <p class="source-note">Tomado y adaptado de: Nariño, A. (5 de marzo de 1823). <em>Los toros de Fucha.</em> Imprenta Real de Don Bruno Espinosa de los Monteros.</p>
          </article>
        `
      }
    ],
    prompt: "En el plazo de doce años, Antonio Nariño cambió su percepción sobre el sistema federalista: pasó de atacarlo en 1811 a defenderlo en 1823. ¿Qué razón explica el cambio de perspectiva del prócer de la independencia sobre este modelo político?",
    options: [
      { letter: "A", text: "Porque, para Nariño, el modelo centralista garantizaba la unión de fuerzas de todas las provincias en la guerra contra España, algo necesario en 1823." },
      { letter: "B", text: "Porque, para Nariño, el modelo federalista velaba por las libertades individuales, pero imponía límites en el ejercicio del poder de cada provincia federada." },
      { letter: "C", text: "Porque, para Nariño, el modelo centralista era adecuado para la Nueva Granada, ya que se asemejaba al modelo de administración que tenía la Corona española." },
      { letter: "D", text: "Porque, para Nariño, el modelo federalista era útil en países libres y, por tanto, lo rechaza en 1811, pero lo defiende en 1823 con la independencia consolidada." }
    ],
    correctAnswer: "D",
    explanation: "En el primer texto, Nariño critica la federación porque dividir las provincias debilitaba la unidad necesaria en medio de la guerra. En el segundo texto, plantea que, una vez reconocida la independencia y sin peligros, la federación puede ser favorable para la libertad. La respuesta correcta es D."
  }


,
  {
    uid: "s1-soc-068",
    session: 1,
    block: 3,
    number: 68,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Diversidad cultural y jurisdicción especial indígena",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 68",
    stem: "Las autoridades de un cabildo indígena prohibieron la caza del jaguar en su territorio, pues en su cosmovisión este animal tiene un valor espiritual y cumple un papel esencial para el equilibrio ecológico. Pedro, un campesino que no pertenece a la comunidad indígena, fue sorprendido cazando un jaguar en el territorio del cabildo, por lo que fue condenado por las autoridades indígenas a una multa para compensar a la comunidad por el daño causado. Pedro se opone a la condena porque no hace parte de la comunidad indígena y el jaguar atacaba con frecuencia el ganado de su propiedad.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Las autoridades de un cabildo indígena prohibieron la caza del jaguar en su territorio, pues en su cosmovisión este animal tiene un valor espiritual y cumple un papel esencial para el equilibrio ecológico.</p>
            <p>Pedro, un campesino que no pertenece a la comunidad indígena, fue sorprendido cazando un jaguar en el territorio del cabildo, por lo que fue condenado por las autoridades indígenas a una multa para compensar a la comunidad por el daño causado.</p>
            <p>Pedro se opone a la condena porque no hace parte de la comunidad indígena y el jaguar atacaba con frecuencia el ganado de su propiedad.</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuáles dimensiones se encuentran en conflicto en la problemática presentada?",
    options: [
      { letter: "A", text: "La cultural y la ambiental, porque la cosmovisión del cabildo indígena respecto al jaguar se opone al interés de Pedro en el cuidado del medio ambiente." },
      { letter: "B", text: "La jurisdiccional y la cultural, porque al interés de la comunidad indígena de imponer una sanción se opone el hecho de que Pedro no pertenece a esa comunidad." },
      { letter: "C", text: "La ambiental y la religiosa, porque el interés del cabildo indígena en la protección del jaguar se opone a su cosmovisión respecto al valor espiritual de este animal." },
      { letter: "D", text: "La económica y la ambiental, porque el interés del cabildo indígena de imponer una sanción económica va en contra de la protección del jaguar en su territorio." }
    ],
    correctAnswer: "B",
    explanation: "El conflicto principal combina una dimensión jurisdiccional, porque las autoridades indígenas ejercen su facultad de sancionar dentro de su territorio, y una dimensión cultural, porque Pedro cuestiona esa autoridad al no pertenecer a la comunidad. La respuesta correcta es B."
  }



,
  {
    uid: "s1-soc-069",
    session: 1,
    block: 3,
    number: 69,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Derechos, libertades y responsabilidad social de la prensa",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 69",
    stem: "Un periodista ha estado divulgando notas de prensa con el fin de acusar de actos de corrupción a la alcaldesa de un municipio, sin haber verificado la credibilidad de las fuentes consultadas para elaborar los señalamientos. Ante el reclamo que le hizo la alcaldesa, el periodista argumentó que podía seguir publicando estas acusaciones porque en el país existe la libertad de prensa y él, como periodista, puede difundir todo lo que considere importante para la opinión pública, así no haya sido verificado.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Un periodista ha estado divulgando notas de prensa con el fin de acusar de actos de corrupción a la alcaldesa de un municipio, sin haber verificado la credibilidad de las fuentes consultadas para elaborar los señalamientos.</p>
            <p>Ante el reclamo que le hizo la alcaldesa, el periodista argumentó que podía seguir publicando estas acusaciones porque en el país existe la libertad de prensa y él, como periodista, puede difundir todo lo que considere importante para la opinión pública, así no haya sido verificado.</p>
          </article>
        `
      }
    ],
    prompt: "De las siguientes opciones, ¿cuál representa un argumento que contradice lo señalado por el periodista con respecto a la libertad de prensa en el país?",
    options: [
      { letter: "A", text: "La libertad de prensa en el país protege a los periodistas cuando divulgan información de manera veraz e imparcial." },
      { letter: "B", text: "La libertad de expresión es un derecho constitucional que respalda la actividad periodística en el país sin restricción alguna." },
      { letter: "C", text: "La libertad de prensa sobre hechos políticos es una de las bases que sostiene la libertad y la democracia de cualquier país." },
      { letter: "D", text: "Existe persecución a los periodistas cuando las noticias que publican ellos son cuestionadas por actores políticos." }
    ],
    correctAnswer: "A",
    explanation: "El periodista interpreta la libertad de prensa como una autorización para publicar acusaciones no verificadas. La opción A contradice esa idea, porque señala que la libertad de prensa protege la divulgación de información veraz e imparcial. La respuesta correcta es A."
  }


,
  {
    uid: "s1-soc-070",
    session: 1,
    block: 3,
    number: 70,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Dimensiones sociales, económicas y ambientales del desarrollo",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 70",
    stem: "Con relación a la construcción de la represa Gibe, un columnista escribió: \"La construcción de la represa Gibe puede convertirse en un evento trascendental para el continente africano. Se espera que esta represa sea la más grande de África y que funcione como una hidroeléctrica que genere grandes ingresos, al brindar empleo y llevar electricidad a muchas partes del continente. Sin embargo, para su construcción, es necesario hacer varias intervenciones en el río Omo, algo que alarma a algunas entidades, pues este río es uno de los más biodiversos del planeta y su intervención podría acabar con miles de animales y plantas nativas\".",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Con relación a la construcción de la represa Gibe, un columnista escribió:</p>
            <blockquote>
              <p>“La construcción de la represa Gibe puede convertirse en un evento trascendental para el continente africano. Se espera que esta represa sea la más grande de África y que funcione como una hidroeléctrica que genere grandes ingresos, al brindar empleo y llevar electricidad a muchas partes del continente. Sin embargo, para su construcción, es necesario hacer varias intervenciones en el río Omo, algo que alarma a algunas entidades, pues este río es uno de los más biodiversos del planeta y su intervención podría acabar con miles de animales y plantas nativas”.</p>
            </blockquote>
          </article>
        `
      }
    ],
    prompt: "¿Cuáles de las siguientes dimensiones están presentes en la anterior descripción de la situación?",
    options: [
      { letter: "A", text: "La social y la cultural." },
      { letter: "B", text: "La económica y la social." },
      { letter: "C", text: "La cultural y la ambiental." },
      { letter: "D", text: "La ambiental y la económica." }
    ],
    correctAnswer: "D",
    explanation: "La situación menciona beneficios económicos, como la generación de ingresos, empleo y electricidad, y también efectos ambientales, como la intervención del río Omo y el riesgo para animales y plantas nativas. La respuesta correcta es D."
  }

  
,
  {
    uid: "s1-soc-071",
    session: 1,
    block: 3,
    number: 71,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Relaciones temporales entre hechos y discursos públicos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 71",
    stem: "Los siguientes son reportes periodísticos sobre dos discursos diferentes pronunciados acerca de los atentados terroristas ocurridos en Francia, en 2015. Léalos detenidamente:",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Los siguientes son reportes periodísticos sobre dos discursos diferentes pronunciados acerca de los atentados terroristas ocurridos en Francia, en 2015. Léalos detenidamente:</p>
            <p><strong>Fragmento A.</strong> “Aunque el presidente francés dijo que el Gobierno ha hecho grandes avances aprobando nuevas leyes y reforzando la seguridad, de acuerdo con el Gobierno, el nivel de alerta sigue siendo alto [...] Igualmente, explicó que en el último año [...] se dictaron medidas contra medio centenar de extranjeros a fin de impedir que puedan entrar en territorio francés por sospechas terroristas”.</p>
            <p class="source-note">Tomado y adaptado de: http://www.lanacion.com.ar/1860111franciafrancoishollandecharliehebdoamenazaterrorista</p>
            <p><strong>Fragmento B.</strong> “[...] el presidente francés se dirige por segunda vez en 48 horas a la nación, para condenar los hechos, y llamar a la calma y la unidad sin fisuras. El miércoles calificó a las víctimas como héroes que habían muerto por defender los valores de la República y pidió que los franceses dejaran a un lado sus diferencias (nada puede dividirnos)”.</p>
            <p class="source-note">Tomado y adaptado de: http://www.rtve.es/noticias/20150109/franciaconvulsionadadelataquecharliehebdomarcharepublicana/1081424.shtml</p>
          </article>
        `
      }
    ],
    prompt: "A partir de la información contenida en los dos discursos, es correcto afirmar que se pronunció primero",
    options: [
      { letter: "A", text: "el fragmento A, porque promueve el caos y la confusión inmediata luego de los atentados; el B se refiere a un momento de calma y unidad que solo se logra después de un consenso nacional." },
      { letter: "B", text: "el fragmento B, porque este garantiza el cubrimiento inmediato de la noticia de los atentados; el A se refiere a un momento en el que ya se ha superado la crisis que se desató a raíz de los atentados." },
      { letter: "C", text: "el fragmento A, porque es una respuesta que hace un llamado a la prevención en contra de los extranjeros; el B habla sobre procesos a largo plazo, como fortalecer la sociedad a futuro." },
      { letter: "D", text: "el fragmento B porque es una respuesta inmediata que hace un llamado a la calma y la unidad; el A habla sobre procesos a largo plazo, como la aprobación de leyes y políticas de seguridad." }
    ],
    correctAnswer: "D",
    explanation: "El fragmento B se ubica más cerca del momento inmediato de los atentados porque habla de una segunda intervención en 48 horas, condena los hechos y llama a la calma y la unidad. El fragmento A se refiere a medidas posteriores y de más largo plazo, como nuevas leyes, refuerzo de seguridad y controles a extranjeros. Por eso la respuesta correcta es D."
  }

,
  {
    uid: "s1-soc-072",
    session: 1,
    block: 3,
    number: 72,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Actores, intereses y conflictos sociales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 72",
    stem: "La erradicación de cultivos ilícitos, como la coca, es una de las principales problemáticas que vive Colombia. Este flagelo ha generado un debate sobre la forma correcta de erradicar los cultivos: si se debe hacer de manera manual o a través de aspersión aérea, con químicos que eliminan las plantas. En esta problemática confluyen varios actores e intereses a la hora de buscar soluciones que satisfagan las necesidades del país, entre los cuales se encuentran los siguientes:",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>La erradicación de cultivos ilícitos, como la coca, es una de las principales problemáticas que vive Colombia. Este flagelo ha generado un debate sobre la forma correcta de erradicar los cultivos: si se debe hacer de manera manual o a través de aspersión aérea, con químicos que eliminan las plantas.</p>
            <p>En esta problemática confluyen varios actores e intereses a la hora de buscar soluciones que satisfagan las necesidades del país, entre los cuales se encuentran los siguientes:</p>
            <p>Por un lado, está el Estado, que tiene como misión, bajo el mando de la fuerza pública, eliminar los cultivos para disminuir el número de hectáreas cultivadas y mejorar los índices nacionales de erradicación.</p>
            <p>Por otro lado, están los grupos armados organizados —GAO— que promueven la siembra de cultivos para que estos sean usados, posteriormente, en el narcotráfico y financiar sus actividades delictivas.</p>
            <p>Otro actor importante son los campesinos que han sido obligados por los GAO a cultivar coca, y a quienes no se contempla judicializar dentro de la política de erradicación manual.</p>
            <p>Adicionalmente, se encuentran las organizaciones, como las Naciones Unidas, que elaboran informes para mostrar el avance o retroceso de la siembra de cultivos ilícitos.</p>
            <p>Finalmente, existen algunos países, como Estados Unidos, que, a través de recursos internacionales, se encargan de financiar actividades que logren erradicar los cultivos que son usados para actividades ilegales.</p>
          </article>
        `
      }
    ],
    prompt: "Si se lleva a cabo la estrategia de erradicación manual de cultivos ilícitos, ¿entre quiénes es probable que se dé un conflicto?",
    options: [
      { letter: "A", text: "Los campesinos víctimas de los GAO y las Naciones Unidas." },
      { letter: "B", text: "Los Estados Unidos y las Naciones Unidas." },
      { letter: "C", text: "La fuerza pública y los campesinos víctimas de los GAO." },
      { letter: "D", text: "La fuerza pública y los grupos armados organizados." }
    ],
    correctAnswer: "D",
    explanation: "La estrategia de erradicación manual sería ejecutada por el Estado mediante la fuerza pública. El actor que tiene un interés directamente opuesto es el de los grupos armados organizados, porque promueven la siembra de coca para financiar actividades delictivas. Por eso, el conflicto más probable se daría entre la fuerza pública y los grupos armados organizados. La respuesta correcta es D."
  }
,
  {
    uid: "s1-soc-073",
    session: 1,
    block: 3,
    number: 73,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Participación ciudadana y control político",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 73",
    stem: "El clientelismo consiste en un arreglo de intercambios entre gobernantes y terceros, de manera que ambos pueden beneficiarse recíprocamente: los primeros, al recibir apoyo político, y los segundos, al recibir bienes y servicios o un tratamiento privilegiado o excepcional en ciertos asuntos.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>El clientelismo consiste en un arreglo de intercambios entre gobernantes y terceros, de manera que ambos pueden beneficiarse recíprocamente: los primeros, al recibir apoyo político, y los segundos, al recibir bienes y servicios o un tratamiento privilegiado o excepcional en ciertos asuntos.</p>
          </article>
        `
      }
    ],
    prompt: "Teniendo en cuenta esta definición, el clientelismo justifica la creación de entes de control a los gobernantes, porque",
    options: [
      { letter: "A", text: "es antiético que un gobernante o dirigente político busque beneficiarse electoralmente de un grupo de ciudadanos." },
      { letter: "B", text: "es inconveniente que un gobernante haga alianzas políticas con otros dirigentes para mantenerse en el poder." },
      { letter: "C", text: "es necesario evitar que los gobernantes usen su posición privilegiada para ser elegidos con favores, a cambio de votos." },
      { letter: "D", text: "es reprochable que los gobernantes adopten medidas populares para aumentar su aceptación entre los ciudadanos." }
    ],
    correctAnswer: "C",
    explanation: "El clientelismo implica un intercambio indebido de apoyo político por favores, bienes, servicios o tratamientos privilegiados. Los entes de control se justifican porque buscan impedir que quienes gobiernan utilicen su cargo para obtener votos mediante favores. Por eso la respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-074",
    session: 1,
    block: 3,
    number: 74,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Derechos, familia e inclusión social",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 74",
    stem: `En el 2011, la Corte Constitucional de Colombia estableció que las parejas conformadas por personas del mismo sexo sí constituyen una familia. Cinco años después, la misma entidad reconoció la validez del matrimonio igualitario para estas mismas parejas. Antes de eso, solo las parejas heterosexuales podían casarse legalmente, mientras que las homosexuales solo podían acceder a una figura contractual llamada "unión solemne", la cual otorgaba solo algunos de los derechos conferidos a los matrimonios. Con esto, la Corte Constitucional busca responder a los nuevos patrones en la conformación de las familias en el país y evitar que los derechos de cerca de cuatro millones de colombianos sigan siendo vulnerados.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En el 2011, la Corte Constitucional de Colombia estableció que las parejas conformadas por personas del mismo sexo sí constituyen una familia. Cinco años después, la misma entidad reconoció la validez del matrimonio igualitario para estas mismas parejas.</p>
            <p>Antes de eso, solo las parejas heterosexuales podían casarse legalmente, mientras que las homosexuales solo podían acceder a una figura contractual llamada "unión solemne", la cual otorgaba solo algunos de los derechos conferidos a los matrimonios.</p>
            <p>Con esto, la Corte Constitucional busca responder a los nuevos patrones en la conformación de las familias en el país y evitar que los derechos de cerca de cuatro millones de colombianos sigan siendo vulnerados.</p>
            <p class="source-note"><strong>Tomado y adaptado de:</strong> Rueda, M. (30 de abril de 2005). <em>¿Es fácil ser gay en Colombia?</em> Revista Semana. http://www.semana.com y Redacción Judicial (7 de abril de 2016). Corte Constitucional le da el “Sí” al matrimonio igualitario. <em>El Espectador</em>. http://www.elespectador.com</p>
          </article>
        `
      }
    ],
    prompt: "Con base en la información anterior, ¿cuál de las siguientes afirmaciones es una de las razones por las cuales se modificó el concepto legal de matrimonio y familia en Colombia?",
    options: [
      { letter: "A", text: "Para restringir los derechos de las familias católicas, ya que, al considerar todos los matrimonios como iguales, se reduce la dimensión sagrada del matrimonio." },
      { letter: "B", text: "Para privilegiar los derechos de los homosexuales, ya que estas personas ahora recibirán un trato preferencial por su orientación sexual." },
      { letter: "C", text: "Para facilitar la convivencia en una sociedad cambiante, ya que las normas deben adaptarse a las transformaciones sociales." },
      { letter: "D", text: "Para priorizar los valores de la sociedad, ya que estos son el centro de la vida en comunidad y no deberían modificarse." }
    ],
    correctAnswer: "C",
    explanation: "El texto indica que la Corte Constitucional modificó el reconocimiento legal de matrimonio y familia para responder a nuevos patrones familiares y evitar la vulneración de derechos. Esto muestra que las normas deben adaptarse a las transformaciones sociales. Por eso la respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-075",
    session: 1,
    block: 3,
    number: 75,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Derechos colectivos, ambiente y regulación estatal",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 75",
    stem: "En un municipio, un grupo de mineros artesanales ha aumentado sus ingresos al encontrar un punto del río en el cual se puede extraer oro con la ayuda de mercurio. La comunidad del municipio aledaño se ha visto afectada por esta situación, porque el río se ha contaminado con los desechos tóxicos que genera la actividad minera y es la única fuente de agua que tienen los habitantes para el consumo e irrigación de cultivos. Ante esto, la alcaldesa del municipio considera necesario establecer una normatividad que regule este tipo de actividades.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En un municipio, un grupo de mineros artesanales ha aumentado sus ingresos al encontrar un punto del río en el cual se puede extraer oro con la ayuda de mercurio.</p>
            <p>La comunidad del municipio aledaño se ha visto afectada por esta situación, porque el río se ha contaminado con los desechos tóxicos que genera la actividad minera y es la única fuente de agua que tienen los habitantes para el consumo e irrigación de cultivos.</p>
            <p>Ante esto, la alcaldesa del municipio considera necesario establecer una normatividad que regule este tipo de actividades.</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuál es la razón que mejor justifica por qué debería establecerse allí una normatividad que regule las actividades de extracción minera en el municipio?",
    options: [
      { letter: "A", text: "Para que los mineros busquen más lugares de extracción de oro sin tener problemas con las autoridades." },
      { letter: "B", text: "Para garantizar los derechos a la salud y a un ambiente sano de los pobladores y el derecho de los mineros al trabajo." },
      { letter: "C", text: "Para que se pueda subsidiar la compra de agua para los pobladores, por medio de las ganancias que genera la explotación minera." },
      { letter: "D", text: "Para establecer periodos de alternancia en la extracción del oro, para que los mineros descansen y permitan que el agua no se contamine tanto." }
    ],
    correctAnswer: "B",
    explanation: "La situación presenta un conflicto entre la actividad económica de los mineros artesanales y los derechos de la comunidad afectada por la contaminación del río. Una normatividad se justifica porque permite regular la minería para proteger la salud, el acceso al agua y el ambiente sano de los pobladores, sin desconocer el derecho al trabajo de los mineros. Por eso la respuesta correcta es B."
  }



  ,
  {
    uid: "s1-soc-076",
    session: 1,
    block: 3,
    number: 76,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Contexto histórico, ideologías políticas y análisis de fuentes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 76",
    stem: `En la introducción al Manifiesto Comunista, Karl Marx y Friedrich Engels escribieron: "Un fantasma recorre Europa: el fantasma del comunismo. Todas las fuerzas de la vieja Europa se han unido en santa cruzada para acosar a ese fantasma [...] No hay un solo partido de oposición a quien los adversarios gobernantes no motejen de comunista [...] De este hecho, se desprenden dos consecuencias: la primera es que el comunismo se halla ya reconocido como una potencia por todas las potencias europeas. La segunda, que ya es hora de que los comunistas expresen a la luz del día y ante el mundo entero sus ideas, sus tendencias, sus aspiraciones, saliendo así al paso de esa leyenda del espectro comunista, con un manifiesto de su partido [...]".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En la introducción al <em>Manifiesto Comunista</em>, Karl Marx y Friedrich Engels escribieron:</p>
            <blockquote>
              <p>"Un fantasma recorre Europa: el fantasma del comunismo. Todas las fuerzas de la vieja Europa se han unido en santa cruzada para acosar a ese fantasma [...] No hay un solo partido de oposición a quien los adversarios gobernantes no motejen de comunista [...] De este hecho, se desprenden dos consecuencias: la primera es que el comunismo se halla ya reconocido como una potencia por todas las potencias europeas. La segunda, que ya es hora de que los comunistas expresen a la luz del día y ante el mundo entero sus ideas, sus tendencias, sus aspiraciones, saliendo así al paso de esa leyenda del espectro comunista, con un manifiesto de su partido [...]".</p>
            </blockquote>
          </article>
        `
      }
    ],
    prompt: "¿Este texto fue escrito en el siglo XX?",
    options: [
      { letter: "A", text: "No, ya que fue escrito en el siglo XIX como respuesta a las injusticias cometidas en América por las potencias imperialistas de la vieja Europa." },
      { letter: "B", text: "Sí, porque el texto describe cómo el Partido Comunista empezó a obtener el poder en varias potencias europeas y a perseguir cualquier fuerza política opositora." },
      { letter: "C", text: "No, porque el comunismo solo tuvo relevancia después de la segunda mitad del siglo XX, durante el enfrentamiento entre la Unión Soviética y los países capitalistas en la Guerra Fría." },
      { letter: "D", text: "Sí, porque el contexto del escrito es la consolidación del comunismo en Europa como fuerza política y, por tanto, el rechazo del mismo por los regímenes gobernantes y sus aliados." }
    ],
    correctAnswer: "A",
    explanation: "El texto corresponde a una fuente del siglo XIX, no del siglo XX. La opción marcada como correcta es A, porque reconoce que el fragmento no fue escrito en el siglo XX."
  }

  ,
  {
    uid: "s1-soc-077",
    session: 1,
    block: 3,
    number: 77,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Ordenamiento territorial, desarrollo sostenible y planeación",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 77",
    stem: `En Colombia, se debe tener un Plan de Ordenamiento Territorial (POT) en cada uno de los municipios, para organizar y planear el desarrollo físico del territorio. "Un POT se define como el conjunto de objetivos, directrices, políticas, estrategias, metas, programas, actuaciones y normas adoptadas para orientar y administrar el desarrollo físico del territorio y la utilización del suelo. Señala, pues, los derroteros de las diferentes acciones urbanísticas posibles que pueden emprenderse. Las ciudades deben crecer ordenadamente, de manera tal que los recursos con que se cuenta para el desarrollo de la comunidad, se empleen eficientemente y de manera sostenible en el tiempo. El POT nos pone de presente que no todo está permitido y que lo que sí lo está, debe ser en función de la obtención del desarrollo más equitativo posible".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En Colombia, se debe tener un Plan de Ordenamiento Territorial (POT) en cada uno de los municipios, para organizar y planear el desarrollo físico del territorio.</p>
            <blockquote>
              <p>"Un POT se define como el conjunto de objetivos, directrices, políticas, estrategias, metas, programas, actuaciones y normas adoptadas para orientar y administrar el desarrollo físico del territorio y la utilización del suelo. Señala, pues, los derroteros de las diferentes acciones urbanísticas posibles que pueden emprenderse. Las ciudades deben crecer ordenadamente, de manera tal que los recursos con que se cuenta para el desarrollo de la comunidad, se empleen eficientemente y de manera sostenible en el tiempo. El POT nos pone de presente que no todo está permitido y que lo que sí lo está, debe ser en función de la obtención del desarrollo más equitativo posible".</p>
            </blockquote>
            <p class="source-note"><strong>Tomado y adaptado de:</strong> Fenalco. (2013). <em>¿Qué es un Plan de Ordenamiento Territorial y para qué sirve?</em> http://fenalcobolivar.com/desarrollosectorial/queesunplandeordenamientoterritorialyparaquesirve1687</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes conceptos se aplica en la anterior definición de un POT?",
    options: [
      { letter: "A", text: "Desarrollo equitativo y sustentable." },
      { letter: "B", text: "Capital político y social." },
      { letter: "C", text: "Participación política." },
      { letter: "D", text: "Crecimiento económico." }
    ],
    correctAnswer: "A",
    explanation: "La definición del POT indica que las ciudades deben crecer de forma ordenada, usando los recursos de manera eficiente y sostenible en el tiempo, y buscando el desarrollo más equitativo posible. Por eso el concepto que mejor se aplica es desarrollo equitativo y sustentable. La respuesta correcta es A."
  }




  ,
  {
    uid: "s1-soc-078",
    session: 1,
    block: 3,
    number: 78,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Medio ambiente, fuentes de energía y sostenibilidad",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 78",
    stem: `En España, se han instalado miles de generadores de energía eólica (aquellos que producen energía a partir del viento) que, actualmente, ocupan grandes extensiones de tierra. A diferencia de los combustibles fósiles o de las centrales nucleares, los generadores de energía eólica son fuentes de energía limpia y amigable con el medio ambiente. En este momento, se está analizando la posibilidad de instalar este tipo de generadores en una región desértica en el norte de Colombia, para satisfacer las necesidades energéticas de la población del lugar. Esta población produce la mayor parte de la energía que consume a partir de la quema de madera, lo que genera problemas de contaminación y deforestación.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En España, se han instalado miles de generadores de energía eólica (aquellos que producen energía a partir del viento) que, actualmente, ocupan grandes extensiones de tierra.</p>
            <p>A diferencia de los combustibles fósiles o de las centrales nucleares, los generadores de energía eólica son fuentes de energía limpia y amigable con el medio ambiente.</p>
            <p>En este momento, se está analizando la posibilidad de instalar este tipo de generadores en una región desértica en el norte de Colombia, para satisfacer las necesidades energéticas de la población del lugar.</p>
            <p>Esta población produce la mayor parte de la energía que consume a partir de la quema de madera, lo que genera problemas de contaminación y deforestación.</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes condiciones NO sería necesaria para implementar esta medida, de energía eólica, en dicha región del territorio colombiano?",
    options: [
      { letter: "A", text: "Que sea posible convencer a la población de los efectos negativos de la quema de madera para que abandone dicha práctica." },
      { letter: "B", text: "Que la población no se vea incomodada por el impacto que tendría la instalación de los generadores en el paisaje." },
      { letter: "C", text: "Que sea posible reforestar las selvas de donde se ha extraído la madera que la población ha utilizado tradicionalmente para generar energía." },
      { letter: "D", text: "Que la capacidad de producción de los generadores eólicos que se instalarían sea suficiente para satisfacer las necesidades energéticas de la población." }
    ],
    correctAnswer: "C",
    explanation: "Para implementar la medida de energía eólica serían necesarias condiciones como que los generadores produzcan suficiente energía, que la población acepte el cambio y que pueda abandonar progresivamente la quema de madera. Reforestar las selvas afectadas sería una acción ambiental valiosa, pero no es una condición indispensable para instalar los generadores eólicos en la región. Por eso la respuesta correcta es C."
  }



  ,
  {
    uid: "s1-soc-079",
    session: 1,
    block: 3,
    number: 79,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Migración, discriminación, convivencia ciudadana y discursos públicos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 79",
    stem: `Un político de una ciudad del país se encuentra muy preocupado por el aumento en la inseguridad que se ha venido presentando en los últimos años. Recientemente, afirma el político, el número de robos y atracos a mano armada se ha intensificado y esta problemática se debería, en gran parte, a la llegada de personas de un país vecino, que migran por la crisis económica y social que viven al interior de su país. En palabras del político: "Ya se han registrado muchos casos de personas atracadas por estos ciudadanos inmigrantes. Recomiendo a la población tener mucho cuidado al momento de relacionarse en la calle con cualquier persona que parezca tener un acento del país vecino. También, hago un llamado a la comunidad para que continúe denunciando los casos de atraco que cometen las personas de ese país".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Un político de una ciudad del país se encuentra muy preocupado por el aumento en la inseguridad que se ha venido presentando en los últimos años.</p>
            <p>Recientemente, afirma el político, el número de robos y atracos a mano armada se ha intensificado y esta problemática se debería, en gran parte, a la llegada de personas de un país vecino, que migran por la crisis económica y social que viven al interior de su país.</p>
            <p>En palabras del político:</p>
            <blockquote>
              <p>"Ya se han registrado muchos casos de personas atracadas por estos ciudadanos inmigrantes. Recomiendo a la población tener mucho cuidado al momento de relacionarse en la calle con cualquier persona que parezca tener un acento del país vecino. También, hago un llamado a la comunidad para que continúe denunciando los casos de atraco que cometen las personas de ese país".</p>
            </blockquote>
          </article>
        `
      }
    ],
    prompt: "Ahora bien, en esta situación, las palabras pronunciadas por el político",
    options: [
      { letter: "A", text: "promueven el rechazo hacia los inmigrantes del país vecino porque la gente va a tratarlos con sospecha, sean o no atracadores." },
      { letter: "B", text: "ignoran que el origen de la inseguridad puede deberse a las necesidades económicas que atraviesan los inmigrantes." },
      { letter: "C", text: "desconocen que la comunidad no está obligada a participar ni a denunciar los atracos que se cometen en la ciudad." },
      { letter: "D", text: "motivan a que las personas de un país que se encuentran en situaciones de pobreza, decidan irse a vivir a otro país." }
    ],
    correctAnswer: "A",
    explanation: "Las palabras del político generalizan la responsabilidad de los atracos hacia las personas inmigrantes del país vecino y recomiendan sospechar de quienes parezcan tener ese origen. Esto puede promover rechazo y discriminación hacia todos los inmigrantes, independientemente de que hayan cometido o no delitos. Por eso, la respuesta correcta es A."
  }


  ,
  {
    uid: "s1-soc-080",
    session: 1,
    block: 3,
    number: 80,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Democracia representativa, oposición política y garantías electorales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 80",
    stem: `Un líder político afirmó lo siguiente durante una entrevista: "Volveremos a participar en las elecciones cuando: 1. El calendario electoral vuelva a ser estable y no haya intervención por parte del presidente. 2. Aumenten los controles por parte de entes independientes en los puestos de votación. 3. Los ciudadanos no sufran represalias por expresar su preferencia electoral. 4. Se les permita a los ciudadanos crear y pertenecer a partidos políticos diferentes al de Gobierno. 5. Las decisiones tomadas en las urnas se respeten y los candidatos elegidos puedan posesionarse".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p><strong>Un líder político afirmó lo siguiente durante una entrevista:</strong></p>
            <blockquote>
              <p>"Volveremos a participar en las elecciones cuando:</p>
              <ol class="numbered-list">
                <li>El calendario electoral vuelva a ser estable y no haya intervención por parte del presidente.</li>
                <li>Aumenten los controles por parte de entes independientes en los puestos de votación.</li>
                <li>Los ciudadanos no sufran represalias por expresar su preferencia electoral.</li>
                <li>Se les permita a los ciudadanos crear y pertenecer a partidos políticos diferentes al de Gobierno.</li>
                <li>Las decisiones tomadas en las urnas se respeten y los candidatos elegidos puedan posesionarse".</li>
              </ol>
            </blockquote>
          </article>
        `
      }
    ],
    prompt: "¿Cuál es el propósito de las medidas propuestas?",
    options: [
      { letter: "A", text: "Establecer límites a la democracia, modificando el calendario electoral y concentrando el poder en los partidos políticos existentes." },
      { letter: "B", text: "Fortalecer la democracia, priorizando la gobernabilidad del partido político en el poder y creando un consenso nacional, al disminuir la oposición." },
      { letter: "C", text: "Establecer límites a la democracia, controlando el número de partidos que pueden postular candidatos y debilitando la figura presidencial." },
      { letter: "D", text: "Fortalecer la democracia representativa, garantizando condiciones para ejercer la oposición y disminuyendo los límites al ejercicio electoral." }
    ],
    correctAnswer: "D",
    explanation: "Las medidas propuestas buscan garantizar elecciones libres, participación de partidos distintos al gobierno, ausencia de represalias, control independiente y respeto por los resultados. Todo ello fortalece la democracia representativa y las condiciones para ejercer la oposición. Por eso, la respuesta correcta es D."
  }



  ,
  {
    uid: "s1-soc-081",
    session: 1,
    block: 3,
    number: 81,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Conflictos socioambientales, Amazonía y pueblos indígenas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 81",
    stem: `Representantes de los gremios minero y petrolero han enviado un comunicado al Gobierno con la intención de obtener los permisos necesarios para intervenir la selva amazónica. Estos gremios argumentan que esta intervención les permitirá mejorar la competitividad de este sector del mercado y generar empleos para las comunidades de la región del Amazonas. Por otra parte, los líderes de algunos pueblos indígenas del Amazonas llevan varios meses pidiendo la ayuda del Gobierno para proteger los territorios de sus "hermanos aislados", pueblos indígenas que han decidido voluntariamente aislarse en las selvas huyendo de la esclavitud, la violencia y las enfermedades que la civilización occidental ha traído consigo durante los últimos cinco siglos. La amenaza para estos pueblos aún sigue latente; por ejemplo, en el último año varias comunidades indígenas se han visto seriamente afectadas por cuenta de contagios de gripa y sarampión, producto de encuentros imprevistos con leñadores de grupos madereros ilegales en el Amazonas.

Para tomar una decisión informada sobre este tema, el Gobierno ha pedido la colaboración, tanto de su Ministerio de Minas y Energía, como de los académicos estudiosos de la cultura y la cosmovisión de estos pueblos indígenas del Amazonas. Los académicos argumentan que, teniendo en cuenta la gran vulnerabilidad que estos pueblos antiguos presentan frente a las enfermedades más comunes de Occidente, es necesario crear estructuras legales que protejan los territorios en donde podrían habitar los pueblos indígenas en aislamiento voluntario, respetando su autodeterminación a no ser contactados y protegiendo el gran patrimonio cultural, espiritual y natural que ellos poseen. Por otra parte, desde el Ministerio de Minas y Energía se argumenta que la solución está en que se reúnan los gremios minero, petrolero y maderero con las comunidades indígenas del Amazonas, incluyendo a las comunidades indígenas en aislamiento voluntario, para así poder negociar qué partes de la selva amazónica pueden ser explotadas legalmente para beneficio del desarrollo económico del país.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 81 Y 82 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Representantes de los gremios minero y petrolero han enviado un comunicado al Gobierno con la intención de obtener los permisos necesarios para intervenir la selva amazónica. Estos gremios argumentan que esta intervención les permitirá mejorar la competitividad de este sector del mercado y generar empleos para las comunidades de la región del Amazonas.</p>
            <p>Por otra parte, los líderes de algunos pueblos indígenas del Amazonas llevan varios meses pidiendo la ayuda del Gobierno para proteger los territorios de sus "hermanos aislados", pueblos indígenas que han decidido voluntariamente aislarse en las selvas huyendo de la esclavitud, la violencia y las enfermedades que la civilización occidental ha traído consigo durante los últimos cinco siglos. La amenaza para estos pueblos aún sigue latente; por ejemplo, en el último año varias comunidades indígenas se han visto seriamente afectadas por cuenta de contagios de gripa y sarampión, producto de encuentros imprevistos con leñadores de grupos madereros ilegales en el Amazonas.</p>
            <p>Para tomar una decisión informada sobre este tema, el Gobierno ha pedido la colaboración, tanto de su Ministerio de Minas y Energía, como de los académicos estudiosos de la cultura y la cosmovisión de estos pueblos indígenas del Amazonas.</p>
            <p>Los académicos argumentan que, teniendo en cuenta la gran vulnerabilidad que estos pueblos antiguos presentan frente a las enfermedades más comunes de Occidente, es necesario crear estructuras legales que protejan los territorios en donde podrían habitar los pueblos indígenas en aislamiento voluntario, respetando su autodeterminación a no ser contactados y protegiendo el gran patrimonio cultural, espiritual y natural que ellos poseen.</p>
            <p>Por otra parte, desde el Ministerio de Minas y Energía se argumenta que la solución está en que se reúnan los gremios minero, petrolero y maderero con las comunidades indígenas del Amazonas, incluyendo a las comunidades indígenas en aislamiento voluntario, para así poder negociar qué partes de la selva amazónica pueden ser explotadas legalmente para beneficio del desarrollo económico del país.</p>
            <p class="source-note"><strong>Tomado y adaptado de:</strong> Calle, H. (2 de noviembre de 2017). Una política de buen vecino para los pueblos aislados colombianos. <em>El Espectador.</em> https://www.elespectador.com/noticias/medio-ambiente/una-politica-de-buen-vecino-para-los-pueblos-aislados-colombianos-articulo-721038</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con los intereses involucrados en la situación descrita, ¿entre quiénes sería más probable que se genere un conflicto?",
    options: [
      { letter: "A", text: "Entre los pueblos indígenas y los académicos." },
      { letter: "B", text: "Entre el gremio minero y los pueblos indígenas." },
      { letter: "C", text: "Entre el Ministerio de Minas y Energía y el gremio petrolero." },
      { letter: "D", text: "Entre los grupos madereros ilegales y el gremio petrolero." }
    ],
    correctAnswer: "B",
    explanation: "El conflicto más probable se daría entre quienes buscan intervenir o explotar la selva amazónica, como los gremios minero y petrolero, y los pueblos indígenas que piden protección de sus territorios y respeto por su aislamiento voluntario. Por eso, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-soc-082",
    session: 1,
    block: 3,
    number: 82,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Decisiones públicas, participación y pueblos indígenas en aislamiento voluntario",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 82",
    stem: `Representantes de los gremios minero y petrolero han enviado un comunicado al Gobierno con la intención de obtener los permisos necesarios para intervenir la selva amazónica. Estos gremios argumentan que esta intervención les permitirá mejorar la competitividad de este sector del mercado y generar empleos para las comunidades de la región del Amazonas. Por otra parte, los líderes de algunos pueblos indígenas del Amazonas llevan varios meses pidiendo la ayuda del Gobierno para proteger los territorios de sus "hermanos aislados", pueblos indígenas que han decidido voluntariamente aislarse en las selvas huyendo de la esclavitud, la violencia y las enfermedades que la civilización occidental ha traído consigo durante los últimos cinco siglos.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading compact-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 81 Y 82 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Representantes de los gremios minero y petrolero han enviado un comunicado al Gobierno con la intención de obtener los permisos necesarios para intervenir la selva amazónica. Estos gremios argumentan que esta intervención les permitirá mejorar la competitividad de este sector del mercado y generar empleos para las comunidades de la región del Amazonas.</p>
            <p>Por otra parte, los líderes de algunos pueblos indígenas del Amazonas llevan varios meses pidiendo la ayuda del Gobierno para proteger los territorios de sus "hermanos aislados", pueblos indígenas que han decidido voluntariamente aislarse en las selvas huyendo de la esclavitud, la violencia y las enfermedades que la civilización occidental ha traído consigo durante los últimos cinco siglos.</p>
            <p>Los académicos argumentan que es necesario crear estructuras legales que protejan los territorios en donde podrían habitar los pueblos indígenas en aislamiento voluntario, respetando su autodeterminación a no ser contactados. Desde el Ministerio de Minas y Energía se propone reunir a los gremios minero, petrolero y maderero con las comunidades indígenas, incluyendo a las comunidades en aislamiento voluntario, para negociar qué partes de la selva amazónica pueden ser explotadas legalmente.</p>
          </article>
        `
      }
    ],
    prompt: "En relación con la propuesta planteada por el Ministerio de Minas y Energía, ¿cuál de las siguientes opciones describe una posible reacción o respuesta que NO se tuvo en cuenta en dicha propuesta?",
    options: [
      { letter: "A", text: "Que los gremios petroleros y mineros solo quieran beneficiarse de la extracción legal de la mayor cantidad de recursos del Amazonas." },
      { letter: "B", text: "Que los académicos no tengan en cuenta los beneficios que conlleva el modelo extractivo legal que busca el desarrollo económico del país." },
      { letter: "C", text: "Que los pueblos indígenas aislados voluntariamente no acepten entablar ningún tipo de relación con la sociedad occidental." },
      { letter: "D", text: "Que los grupos madereros ilegales no tengan las vías para poder negociar la explotación legal de los bosques amazónicos." }
    ],
    correctAnswer: "C",
    explanation: "La propuesta del Ministerio supone que todas las comunidades indígenas, incluso las que viven en aislamiento voluntario, podrían reunirse y negociar con los gremios. Sin embargo, no considera que esos pueblos hayan decidido no establecer contacto con la sociedad occidental. Por eso, la respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-083",
    session: 1,
    block: 3,
    number: 83,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Dimensiones económica, cultural y social de los conflictos rurales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 83",
    stem: `Un grupo de campesinos productores de papa se ha visto afectado por la entrada en vigencia de un tratado de libre comercio que ha permitido el ingreso al país de alimentos extranjeros, que son más económicos, incluyendo la papa. La situación se ha complicado tanto para ellos, que sus ingresos se han reducido considerablemente y se ha puesto en riesgo su permanencia como agricultores. Esto afecta aspectos esenciales de su vida, dado que muchas de sus tradiciones y elementos culturales están relacionados con el cultivo de la tierra. Los campesinos mencionan que los políticos prometieron, en sus campañas, que los tratados no los afectarían, pues sus cultivos y productos serían protegidos.

Ante esta situación, deciden rescatar una antigua tradición: los mercados campesinos, donde pueden vender sus productos sin intermediarios y a precios más bajos. Con esto se busca mejorar la calidad de vida de los productores, que más personas accedan a alimentos de alta calidad y que sus productos compitan en mejores condiciones frente a los productos extranjeros. Ahora bien, se busca ampliar este tipo de mercados a todo el país, pues la medida ha sido altamente beneficiosa para los cultivadores de papa, para los consumidores y para la tradición, pues se rescatan prácticas olvidadas.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Un grupo de campesinos productores de papa se ha visto afectado por la entrada en vigencia de un tratado de libre comercio que ha permitido el ingreso al país de alimentos extranjeros, que son más económicos, incluyendo la papa.</p>
            <p>La situación se ha complicado tanto para ellos, que sus ingresos se han reducido considerablemente y se ha puesto en riesgo su permanencia como agricultores. Esto afecta aspectos esenciales de su vida, dado que muchas de sus tradiciones y elementos culturales están relacionados con el cultivo de la tierra.</p>
            <p>Los campesinos mencionan que los políticos prometieron, en sus campañas, que los tratados no los afectarían, pues sus cultivos y productos serían protegidos.</p>
            <p>Ante esta situación, deciden rescatar una antigua tradición: los mercados campesinos, donde pueden vender sus productos sin intermediarios y a precios más bajos.</p>
            <p>Con esto se busca mejorar la calidad de vida de los productores, que más personas accedan a alimentos de alta calidad y que sus productos compitan en mejores condiciones frente a los productos extranjeros.</p>
            <p>Ahora bien, se busca ampliar este tipo de mercados a todo el país, pues la medida ha sido altamente beneficiosa para los cultivadores de papa, para los consumidores y para la tradición, pues se rescatan prácticas olvidadas.</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuáles de las siguientes dimensiones se privilegiaron en la solución propuesta por los campesinos?",
    options: [
      { letter: "A", text: "Social y política." },
      { letter: "B", text: "Cultural y social." },
      { letter: "C", text: "Económica y cultural." },
      { letter: "D", text: "Política y comercial." }
    ],
    correctAnswer: "C",
    explanation: "La solución propuesta privilegia la dimensión económica, porque busca mejorar los ingresos de los campesinos y permitir que sus productos compitan en mejores condiciones; y la dimensión cultural, porque rescata la tradición de los mercados campesinos y prácticas vinculadas al cultivo de la tierra. Por eso, la respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-084",
    session: 1,
    block: 3,
    number: 84,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Dimensiones económica, social y ambiental de proyectos públicos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 84",
    stem: `Para llevar agua a varios municipios, el gobernador de un departamento propone la extensión del sistema de acueducto con presupuesto del Gobierno nacional. Después de varios estudios, un equipo de ingenieros entrega el diseño del proyecto.

Este diseño contempla el trazado que tendrá el acueducto, el presupuesto general que se requiere para construirlo, el plan para proteger la flora y la fauna de la región, y la reubicación temporal de algunas familias que viven donde se llevarán a cabo las obras. Ahora bien, cuando el gobernador pretende dar inicio al proyecto, el Gobierno nacional le comunica que, si se considera el diseño entregado por los ingenieros, no habrá dinero suficiente para ejecutar la obra.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Para llevar agua a varios municipios, el gobernador de un departamento propone la extensión del sistema de acueducto con presupuesto del Gobierno nacional. Después de varios estudios, un equipo de ingenieros entrega el diseño del proyecto.</p>
            <p>Este diseño contempla el trazado que tendrá el acueducto, el presupuesto general que se requiere para construirlo, el plan para proteger la flora y la fauna de la región, y la reubicación temporal de algunas familias que viven donde se llevarán a cabo las obras.</p>
            <p>Ahora bien, cuando el gobernador pretende dar inicio al proyecto, el Gobierno nacional le comunica que, si se considera el diseño entregado por los ingenieros, no habrá dinero suficiente para ejecutar la obra.</p>
          </article>
        `
      }
    ],
    prompt: "¿Qué aspecto descrito anteriormente obstaculiza el desarrollo del acueducto?",
    options: [
      { letter: "A", text: "El aspecto social, pues las familias que viven en la zona de la obra no podrán ser reubicadas permanentemente." },
      { letter: "B", text: "El aspecto económico, pues los requerimientos de diseño de la obra no se ajustan al presupuesto del Gobierno." },
      { letter: "C", text: "El aspecto ambiental, pues el diseño no especifica qué sucederá con la flora y la fauna presente en la zona." },
      { letter: "D", text: "El aspecto logístico, pues los ingenieros no especifican el trazado definitivo del acueducto." }
    ],
    correctAnswer: "B",
    explanation: "El obstáculo señalado en el caso es la falta de dinero suficiente para ejecutar la obra si se mantiene el diseño presentado. Por tanto, el problema corresponde al aspecto económico, porque los requerimientos del proyecto no se ajustan al presupuesto disponible. La respuesta correcta es B."
  }



  ,
  {
    uid: "s1-soc-085",
    session: 1,
    block: 3,
    number: 85,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Acuerdos de paz, transición a la vida civil y funciones de las Fuerzas Armadas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 85",
    stem: `Como resultado del acuerdo de paz firmado por un Gobierno y un grupo armado al margen de la ley, se establecieron zonas veredales transitorias de normalización (ZVTN), las cuales consisten en locaciones rurales donde se concentran los militantes del grupo armado para iniciar su transición a la vida civil. En estas zonas, el ejército del país debe custodiar a los miembros del grupo armado, en lugar de combatirlo.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Como resultado del acuerdo de paz firmado por un Gobierno y un grupo armado al margen de la ley, se establecieron zonas veredales transitorias de normalización (ZVTN), las cuales consisten en locaciones rurales donde se concentran los militantes del grupo armado para iniciar su transición a la vida civil.</p>
            <p>En estas zonas, el ejército del país debe custodiar a los miembros del grupo armado, en lugar de combatirlo.</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con lo expuesto, ¿por qué es posible que se dé esta situación?",
    options: [
      { letter: "A", text: "Porque el Gobierno nacional quiere que el grupo armado conviva con el Ejército, para que en el futuro haga parte de él." },
      { letter: "B", text: "Porque el Gobierno nacional ha dado un giro hacia el socialismo y ha decidido poner a su Ejército al servicio del grupo armado." },
      { letter: "C", text: "Porque el grupo armado ahora controla las ZVTN y tiene miembros del Ejército a su disposición." },
      { letter: "D", text: "Porque la función de las Fuerzas Armadas se adecuó al nuevo contexto sociopolítico del país." }
    ],
    correctAnswer: "D",
    explanation: "La situación se explica porque, después del acuerdo de paz, el papel de las Fuerzas Armadas cambia frente al grupo armado: ya no se centra en combatirlo, sino en custodiar el proceso de transición a la vida civil dentro de las ZVTN. Por eso, la respuesta correcta es D."
  }



  ,
  {
    uid: "s1-soc-086",
    session: 1,
    block: 3,
    number: 86,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Cambio climático, intereses políticos y confiabilidad de fuentes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 86",
    stem: `En Estados Unidos existe un debate sobre el cambio climático, definido como variaciones del clima atribuidas directa o indirectamente a la actividad humana, que alteran la composición de la atmósfera mundial y que se suman a la variabilidad natural del clima observada durante periodos de tiempo comparables. Este debate ha llevado a que algunos Gobiernos se resistan a suscribir acuerdos internacionales que comprometan a los Estados a reducir la emisión de gases. El ejemplo más reciente fue el retiro de los Estados Unidos del Acuerdo de París. Esta situación ha generado que grupos ambientalistas protesten e insistan en que el desarrollo económico no puede seguir poniendo en peligro la existencia misma del planeta.

Al respecto, el presidente de un país, escéptico del cambio climático, escribió en su red social de internet las siguientes dos frases:

1. "Por el cambio climático que deberíamos estar preocupados es el provocado por las armas nucleares que están en las manos de líderes locos o incompetentes".
2. "Hace frío afuera. ¿Dónde demonios está el cambio climático?"`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En Estados Unidos existe un debate sobre el cambio climático, definido como variaciones del clima atribuidas directa o indirectamente a la actividad humana, que alteran la composición de la atmósfera mundial y que se suman a la variabilidad natural del clima observada durante periodos de tiempo comparables.</p>
            <p>Este debate ha llevado a que algunos Gobiernos se resistan a suscribir acuerdos internacionales que comprometan a los Estados a reducir la emisión de gases. El ejemplo más reciente fue el retiro de los Estados Unidos del Acuerdo de París.</p>
            <p>Esta situación ha generado que grupos ambientalistas protesten e insistan en que el desarrollo económico no puede seguir poniendo en peligro la existencia misma del planeta.</p>
            <p>Al respecto, el presidente de un país, escéptico del cambio climático, escribió en su red social de internet las siguientes dos frases:</p>
            <ol class="numbered-text-list">
              <li>"Por el cambio climático que deberíamos estar preocupados es el provocado por las armas nucleares que están en las manos de líderes locos o incompetentes".</li>
              <li>"Hace frío afuera. ¿Dónde demonios está el cambio climático?"</li>
            </ol>
            <p class="source-note">Tomado y adaptado de: http://www.minambiente.gov.co/index.php/cambio-climatico y de http://www.elfinanciero.com.mx/</p>
          </article>
        `
      }
    ],
    prompt: "A partir de la información anterior, ¿resultan confiables las afirmaciones del presidente en su red social acerca del cambio climático?",
    options: [
      { letter: "A", text: "Sí, porque, como presidente, tiene acceso a información precisa sobre los aspectos relevantes del planeta." },
      { letter: "B", text: "No, porque, como presidente, tiene intereses en que el país que gobierna siga siendo competitivo en la economía mundial." },
      { letter: "C", text: "No, porque, al ser un político, los temas de las ciencias naturales le son ajenos a sus conocimientos de la vida diaria." },
      { letter: "D", text: "Sí, porque, al ser difundido en una red social con tantos seguidores, lo expresado tiene un impacto a nivel de la economía internacional." }
    ],
    correctAnswer: "B",
    explanation: "Las afirmaciones no resultan confiables porque provienen de una autoridad política que puede tener intereses económicos y políticos vinculados con la competitividad del país y con la resistencia a compromisos internacionales de reducción de emisiones. Además, sus frases no se apoyan en evidencia científica. Por eso, la respuesta correcta es B."
  }



  ,
  {
    uid: "s1-soc-087",
    session: 1,
    block: 3,
    number: 87,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Teoría de la dependencia y relaciones centro-periferia",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 87",
    stem: `La teoría de la dependencia argumenta que la pobreza que existe en los países del sur se debe a condiciones históricas que han estructurado el mercado global de tal manera que favorece a los países del norte y mantiene a los países del sur en un estado constante de pobreza. Es así como, desde sus inicios, los países del sur han servido como proveedores de materia prima para los países del norte y a cambio, han sido receptores de aquellos productos terminados que ya han cumplido su ciclo en los mercados del norte. De esta manera, se crea un vínculo de dependencia, en el que las economías del sur dependen de la voluntad de compra de materias primas por parte de los países del norte.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>La teoría de la dependencia argumenta que la pobreza que existe en los países del sur se debe a condiciones históricas que han estructurado el mercado global de tal manera que favorece a los países del norte y mantiene a los países del sur en un estado constante de pobreza.</p>
            <p>Es así como, desde sus inicios, los países del sur han servido como proveedores de materia prima para los países del norte y a cambio, han sido receptores de aquellos productos terminados que ya han cumplido su ciclo en los mercados del norte.</p>
            <p>De esta manera, se crea un vínculo de dependencia, en el que las economías del sur dependen de la voluntad de compra de materias primas por parte de los países del norte.</p>
            <p class="source-note">Tomado y adaptado de: Subgerencia Cultural del Banco de la República. (2015). <em>Teoría de la dependencia</em>. http://www.banrepcultural.org/blaavirtual/ayudadetareas/politica/teoria_de_la_dependencia</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes situaciones se ajusta al modelo teórico descrito?",
    options: [
      { letter: "A", text: "Un país latinoamericano desarrolla tecnología industrial que le permite procesar materias primas para generar productos con valor añadido, que se venden dentro del mismo país." },
      { letter: "B", text: "Una compañía multinacional adquiere, en un país pobre, materias primas a bajo costo, las procesa e incrementa su valor añadido para, luego, vender sus productos en el país pobre." },
      { letter: "C", text: "Un país desarrollado de Europa genera riquezas gracias a sus adelantos tecnológicos y, luego, impulsa el avance de la industria de países en desarrollo, porque comparte con ellos esta nueva tecnología." },
      { letter: "D", text: "Una organización internacional regula las relaciones comerciales entre países, para asegurarse de que los países que venden materias primas no cobren de más a los países que más las necesitan." }
    ],
    correctAnswer: "B",
    explanation: "La situación que mejor se ajusta a la teoría de la dependencia es aquella en la que un país pobre suministra materias primas de bajo costo y luego recibe productos con mayor valor añadido, lo que reproduce la dependencia económica frente a actores externos. Por eso, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-soc-088",
    session: 1,
    block: 3,
    number: 88,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Desarrollo sostenible",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 88",
    stem: `La Organización de las Naciones Unidas (ONU) define el "desarrollo sostenible" como

"[...] la satisfacción de las necesidades de la generación presente sin comprometer la capacidad de las generaciones futuras para satisfacer sus propias necesidades". El desarrollo sostenible ha emergido como el principio rector para el desarrollo mundial a largo plazo. Consta de tres pilares: el desarrollo sostenible trata de lograr, de manera equilibrada, el desarrollo económico, el desarrollo social y la protección del medio ambiente. [A partir de lo anterior] la Conferencia de las Naciones Unidas sobre el Desarrollo Sostenible, o Cumbre de la Tierra de Río 20, se centrará en dos temas: 1) la economía verde en el contexto del desarrollo sostenible y la erradicación de la pobreza y 2) el marco institucional para el desarrollo sostenible.` ,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>La Organización de las Naciones Unidas (ONU) define el <strong>"desarrollo sostenible"</strong> como</p>
            <blockquote>
              <p>"[...] la satisfacción de las necesidades de la generación presente sin comprometer la capacidad de las generaciones futuras para satisfacer sus propias necesidades". El desarrollo sostenible ha emergido como el principio rector para el desarrollo mundial a largo plazo. Consta de tres pilares: el desarrollo sostenible trata de lograr, de manera equilibrada, el desarrollo económico, el desarrollo social y la protección del medio ambiente. [A partir de lo anterior] la Conferencia de las Naciones Unidas sobre el Desarrollo Sostenible, o Cumbre de la Tierra de Río 20, se centrará en dos temas: 1) la economía verde en el contexto del desarrollo sostenible y la erradicación de la pobreza y 2) el marco institucional para el desarrollo sostenible.</p>
            </blockquote>
            <p class="source-note">Tomado y adaptado de: Asamblea General de las Naciones Unidas (s. f.). <em>Desarrollo Sostenible</em>. http://www.un.org/es/ga/president/65/issues/sustdev.shtml</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con la anterior definición, una política económica es sostenible cuando",
    options: [
      { letter: "A", text: "privilegia la industrialización para generar empleo por encima de la necesidad de disminuir los gases de efecto invernadero." },
      { letter: "B", text: "le da la misma importancia a la generación de riqueza y a la explotación ilimitada de los recursos naturales." },
      { letter: "C", text: "le da la misma importancia a la generación de riqueza para las personas y a la protección del medio ambiente." },
      { letter: "D", text: "prohíbe totalmente aprovechar económicamente los bienes y servicios ecosistémicos de lagos, ríos y bosques para lograr su conservación." }
    ],
    correctAnswer: "C",
    explanation: "La definición de desarrollo sostenible plantea un equilibrio entre el desarrollo económico, el desarrollo social y la protección ambiental. Por eso, una política económica sostenible debe promover la generación de riqueza sin descuidar la protección del medio ambiente. La respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-089",
    session: 1,
    block: 3,
    number: 89,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "División del trabajo y mercado",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 89",
    stem: `Para Adam Smith, economista y filósofo escocés del siglo XVIII, la división del trabajo aumenta la productividad, pues cada persona se enfoca en producir aquello en lo que es mejor y, luego, lo intercambia de forma mercantil por los otros bienes y servicios que necesita. Si cada uno dependiera del autosuministro, tendría menos posibilidades de fabricar la misma cantidad de bienes que le es posible conseguir en el intercambio.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Para Adam Smith, economista y filósofo escocés del siglo XVIII, la división del trabajo aumenta la productividad, pues cada persona se enfoca en producir aquello en lo que es mejor y, luego, lo intercambia de forma mercantil por los otros bienes y servicios que necesita.</p>
            <p>Si cada uno dependiera del autosuministro, tendría menos posibilidades de fabricar la misma cantidad de bienes que le es posible conseguir en el intercambio.</p>
          </article>
        `
      }
    ],
    prompt: "Según el concepto de división del trabajo, para Smith, el mercado",
    options: [
      { letter: "A", text: "genera injusticias sociales al separar a las personas en clases sociales según sus ingresos." },
      { letter: "B", text: "lleva la economía al fracaso, pues no hay coordinación entre productores y consumidores." },
      { letter: "C", text: "hace que las personas se vuelvan más ignorantes, pues no saben cómo producir ciertos bienes." },
      { letter: "D", text: "es una forma eficiente de repartir los bienes que se han producido mediante la especialización." }
    ],
    correctAnswer: "D",
    explanation: "El texto plantea que la división del trabajo aumenta la productividad y que el intercambio permite conseguir más bienes y servicios que el autosuministro. Por eso, para Smith, el mercado funciona como un mecanismo eficiente de distribución de los bienes producidos mediante la especialización. La respuesta correcta es D."
  }


  ,
  {
    uid: "s1-soc-090",
    session: 1,
    block: 3,
    number: 90,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Ecosistemas, especies invasoras e investigación pública",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 90",
    stem: `El Gobierno está investigando el impacto que tiene el pez león en los ecosistemas marítimos colombianos y las formas de combatirlo. El pez león, especie originaria de Asia, se ha convertido en una amenaza o "plaga" para los ecosistemas marítimos y se ha extendido a las costas del Caribe colombiano. Según un artículo de prensa, este pez genera dos tipos de peligro: "Por un lado, es una amenaza para el hombre, que puede sufrir accidentes al pisar o tocar sus nocivas púas venenosas, y, por otro, es una amenaza para las especies nativas, pues se alimenta de peces jóvenes que sirven de alimentación para el hombre, como el pargo y el mero".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>El Gobierno está investigando el impacto que tiene el <strong>pez león</strong> en los ecosistemas marítimos colombianos y las formas de combatirlo.</p>
            <p>El pez león, especie originaria de Asia, se ha convertido en una amenaza o <strong>"plaga"</strong> para los ecosistemas marítimos y se ha extendido a las costas del Caribe colombiano.</p>
            <p>Según un artículo de prensa, este pez genera dos tipos de peligro: <em>"Por un lado, es una amenaza para el hombre, que puede sufrir accidentes al pisar o tocar sus nocivas púas venenosas, y, por otro, es una amenaza para las especies nativas, pues se alimenta de peces jóvenes que sirven de alimentación para el hombre, como el pargo y el mero".</em></p>
            <p class="source-note">Tomado y adaptado de: Agencia de Noticias de la Universidad Nacional. (15 de diciembre de 2009). <em>Pez león ataca en el Caribe colombiano</em>. Revista Semana. https://www.semana.com/-vida-moderna/ciencia/articulo/pez-leon-ataca-caribe-colombiano/111041-3/</p>
          </article>
        `
      }
    ],
    prompt: "¿Para cuál de los siguientes objetivos de investigación del Gobierno sería útil la anterior información?",
    options: [
      { letter: "A", text: "Establecer el impacto económico que provocan las plagas en la fauna y flora del Caribe colombiano." },
      { letter: "B", text: "Promover la caza del pez león para fortalecer la economía de las zonas pesqueras en el Caribe." },
      { letter: "C", text: "Determinar los factores que han provocado una disminución de la fauna en algunas costas colombianas." },
      { letter: "D", text: "Establecer la cantidad de especies nativas existentes antes de la aparición del pez león." }
    ],
    correctAnswer: "C",
    explanation: "La información del texto muestra que el pez león amenaza a las especies nativas porque se alimenta de peces jóvenes. Por ello, resulta útil para investigar factores que pueden haber provocado disminución de fauna en algunas costas colombianas. La respuesta correcta es C."
  }



  ,
  {
    uid: "s1-soc-091",
    session: 1,
    block: 3,
    number: 91,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Participación ciudadana y mecanismos democráticos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 91",
    stem: `En Colombia, una importante firma encuestadora reveló que, desde hace cuatro años, la corrupción es percibida por la ciudadanía como uno de los problemas más graves que afecta al país. En la versión más reciente de la encuesta aplicada, se muestra que el 84 % de los encuestados piensa que el problema está empeorando. Al respecto, un grupo de jóvenes decide promover el aumento de las penas para los delitos de corrupción y fortalecer a las entidades de control como la Procuraduría General de la Nación y la Contraloría General de la República.

Sin embargo, al buscar apoyo para promover su ley, los jóvenes se dan cuenta de que en todos los partidos políticos hay escándalos de corrupción, por lo que reciben poco apoyo para su iniciativa. Ante esta situación, los jóvenes deciden promover un referendo aprobatorio de iniciativa ciudadana.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En Colombia, una importante firma encuestadora reveló que, desde hace cuatro años, la corrupción es percibida por la ciudadanía como uno de los problemas más graves que afecta al país. En la versión más reciente de la encuesta aplicada, se muestra que el <strong>84 %</strong> de los encuestados piensa que el problema está empeorando.</p>
            <p>Al respecto, un grupo de jóvenes decide promover el aumento de las penas para los delitos de corrupción y fortalecer a las entidades de control como la Procuraduría General de la Nación y la Contraloría General de la República.</p>
            <p>Sin embargo, al buscar apoyo para promover su ley, los jóvenes se dan cuenta de que en todos los partidos políticos hay escándalos de corrupción, por lo que reciben poco apoyo para su iniciativa. Ante esta situación, los jóvenes deciden promover un <strong>referendo aprobatorio de iniciativa ciudadana</strong>.</p>
            <p class="source-note">Tomado y adaptado de: Ávila, R. (4 de octubre de 2020). <em>La corrupción en Colombia: un mal más grave que el coronavirus</em>. Portafolio. https://www.portafolio.co/economia/la-corrupcion-en-colombia-un-mal-mas-grave-que-el-coronavirus-545299</p>
          </article>
        `
      }
    ],
    prompt: "En esta situación, y teniendo en cuenta la Constitución Política de Colombia, ¿pueden los jóvenes continuar con su propuesta de referendo?",
    options: [
      { letter: "A", text: "No, pues solo pueden proponer leyes de la República los integrantes del Congreso de la República y del Gobierno nacional." },
      { letter: "B", text: "No, pues solo pueden pronunciarse sobre temas políticos los expertos y los representantes elegidos popularmente." },
      { letter: "C", text: "Sí, pues en Colombia existen los referendos como mecanismos para que los ciudadanos propongan cambios normativos de manera directa." },
      { letter: "D", text: "Sí, pues en Colombia existen los referendos para que cada una de las decisiones públicas en el país sea consultada a la ciudadanía." }
    ],
    correctAnswer: "C",
    explanation: "El referendo es un mecanismo de participación ciudadana que permite a la ciudadanía intervenir directamente en decisiones normativas. En el caso presentado, los jóvenes pueden continuar con una propuesta de referendo de iniciativa ciudadana para promover cambios frente a la corrupción. La respuesta correcta es C."
  }



  ,
  {
    uid: "s1-cn-092",
    session: 1,
    block: 4,
    number: 92,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Contaminación del agua y ecosistemas acuáticos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 92",
    stem: `Un grupo de expertos quiere llevar a cabo un plan de recuperación de un ecosistema en el que una fuente de agua, y varias especies de peces y de plantas se han visto afectadas por un grave problema de contaminación, la cual es causada por la actividad humana de un barrio cercano que tiene sus tuberías de desagüe conectadas a la fuente de agua. Al respecto, los expertos afirman que el foco de la contaminación son sustancias como el aceite que se usa en casas, restaurantes y en la industria, y que esto no solo afecta la calidad del agua, sino que también ha causado la disminución de los individuos de especies acuáticas de animales y el desmejoramiento de especies vegetales.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading">
            <div class="reading-instruction">CIENCIAS NATURALES</div>
            <p><strong>RESPONDA LAS PREGUNTAS 92 A 94 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</strong></p>
            <p>Un grupo de expertos quiere llevar a cabo un plan de recuperación de un ecosistema en el que una fuente de agua, y varias especies de peces y de plantas se han visto afectadas por un grave problema de contaminación, la cual es causada por la actividad humana de un barrio cercano que tiene sus tuberías de desagüe conectadas a la fuente de agua.</p>
            <p>Al respecto, los expertos afirman que el foco de la contaminación son sustancias como el aceite que se usa en casas, restaurantes y en la industria, y que esto no solo afecta la calidad del agua, sino que también ha causado la disminución de los individuos de especies acuáticas de animales y el desmejoramiento de especies vegetales.</p>
          </article>
        `
      }
    ],
    prompt: "Los expertos saben que la causa de la contaminación de la fuente de agua se debe a una actividad en concreto que se desarrolla en el barrio. De acuerdo con lo anterior, ¿cuál de las siguientes es la causa de la contaminación de la fuente de agua?",
    options: [
      { letter: "A", text: "El consumo de comidas rápidas altas en grasas por parte de los habitantes del barrio." },
      { letter: "B", text: "El uso de una marca de aceite que se emplea en las cocinas de los restaurantes y casas." },
      { letter: "C", text: "El vertimiento al desagüe de aceites residuales de los hogares, la industria y los restaurantes." },
      { letter: "D", text: "El tipo de maquinaria obsoleta que utilizan las diferentes industrias que se ubican en el barrio." }
    ],
    correctAnswer: "C",
    explanation: "El texto señala que la contaminación proviene de sustancias como el aceite usado en casas, restaurantes e industria, y que las tuberías de desagüe están conectadas a la fuente de agua. Por tanto, la causa es el vertimiento de aceites residuales al desagüe. La respuesta correcta es C."
  }

  ,
  {
    uid: "s1-cn-093",
    session: 1,
    block: 4,
    number: 93,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Fotosíntesis y nutrición vegetal",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 93",
    stem: `Un experto en botánica muestra la siguiente figura. Él explica que el aceite contaminante, representado en negro, se adhiere a los órganos de la planta como las hojas y el tallo, y, además, se acumula en el suelo, lo cual impide que se realice correctamente la fotosíntesis y la planta no crezca adecuadamente.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading">
            <div class="reading-instruction">Figura: fotosíntesis y contaminación por aceite</div>
            <div style="display:grid;grid-template-columns:minmax(220px,1fr) minmax(220px,1fr);gap:18px;align-items:center">
              <svg viewBox="0 0 520 360" role="img" aria-label="Figura de una planta que recibe luz solar, dióxido de carbono y agua, y libera oxígeno" style="width:100%;max-width:520px;border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.65)">
                <rect x="0" y="265" width="520" height="95" fill="rgba(80,120,90,.18)"></rect>
                <circle cx="86" cy="70" r="26" fill="none" stroke="currentColor" stroke-width="4"></circle>
                <g stroke="currentColor" stroke-width="3">
                  <line x1="86" y1="20" x2="86" y2="2"></line><line x1="86" y1="120" x2="86" y2="138"></line>
                  <line x1="36" y1="70" x2="18" y2="70"></line><line x1="136" y1="70" x2="154" y2="70"></line>
                  <line x1="51" y1="35" x2="38" y2="22"></line><line x1="121" y1="105" x2="134" y2="118"></line>
                  <line x1="121" y1="35" x2="134" y2="22"></line><line x1="51" y1="105" x2="38" y2="118"></line>
                </g>
                <text x="35" y="150" font-size="20" font-weight="700">Luz solar</text>
                <path d="M145 86 C185 75, 180 118, 220 100" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="8 8"></path>
                <text x="30" y="222" font-size="18">Dióxido de carbono</text>
                <path d="M155 205 C185 195, 175 230, 215 220" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="8 8"></path>
                <line x1="260" y1="275" x2="260" y2="145" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
                <path d="M260 170 C215 140, 185 125, 180 95 C230 102, 250 125, 260 160" fill="none" stroke="currentColor" stroke-width="5"></path>
                <path d="M263 190 C315 150, 360 130, 390 102 C382 155, 330 177, 263 205" fill="none" stroke="currentColor" stroke-width="5"></path>
                <path d="M260 235 C215 220, 190 205, 170 180 C220 178, 248 198, 260 230" fill="none" stroke="currentColor" stroke-width="5"></path>
                <path d="M264 248 C320 230, 360 215, 400 195 C385 240, 335 255, 264 258" fill="none" stroke="currentColor" stroke-width="5"></path>
                <g fill="currentColor">
                  <circle cx="238" cy="148" r="7"></circle><circle cx="294" cy="169" r="7"></circle><circle cx="221" cy="219" r="7"></circle><circle cx="345" cy="225" r="7"></circle><circle cx="258" cy="280" r="8"></circle>
                  <circle cx="210" cy="288" r="5"></circle><circle cx="305" cy="292" r="5"></circle><circle cx="350" cy="278" r="5"></circle><circle cx="175" cy="272" r="5"></circle>
                </g>
                <path d="M260 278 C235 303, 210 320, 178 344" fill="none" stroke="currentColor" stroke-width="4"></path>
                <path d="M260 278 C286 303, 318 321, 360 344" fill="none" stroke="currentColor" stroke-width="4"></path>
                <path d="M260 278 C262 313, 260 329, 260 354" fill="none" stroke="currentColor" stroke-width="4"></path>
                <text x="402" y="120" font-size="20" font-weight="700">Oxígeno O₂</text>
                <path d="M390 160 C430 143, 420 188, 465 170" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="8 8"></path>
                <text x="98" y="317" font-size="20" font-weight="700">Agua</text>
              </svg>
              <div class="formula-box" style="border:1px solid var(--line);border-radius:18px;padding:18px;background:rgba(255,255,255,.62)">
                <h4 style="margin:0 0 10px">Ecuación de la fotosíntesis</h4>
                <p style="font-size:1.05rem;font-weight:800;text-align:center">6CO₂ + 6H₂O + energía solar → C₆H₁₂O₆ + 6O₂</p>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center;font-size:.8rem">
                  <span>Dióxido de carbono</span><span>Agua</span><span>Carbohidratos</span><span>Oxígeno</span>
                </div>
              </div>
            </div>
            <p>El aceite contaminante, representado en negro, se adhiere a los órganos de la planta como las hojas y el tallo, y, además, se acumula en el suelo, lo cual impide que se realice correctamente la fotosíntesis y la planta no crezca adecuadamente.</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con la información anterior, ¿por qué el no realizar correctamente la fotosíntesis impide el crecimiento de las plantas?",
    options: [
      { letter: "A", text: "Porque el tallo no hace la circulación de nutrientes a las partes altas de la planta." },
      { letter: "B", text: "Porque las raíces no absorben la suficiente agua para el crecimiento de la planta." },
      { letter: "C", text: "Porque no se permite la entrada a la planta del oxígeno necesario para la fotosíntesis." },
      { letter: "D", text: "Porque no se producen los carbohidratos necesarios para el crecimiento de las plantas." }
    ],
    correctAnswer: "D",
    explanation: "La ecuación muestra que la fotosíntesis produce carbohidratos, que son fuente de materia y energía para el crecimiento de la planta. Si la fotosíntesis no ocurre correctamente, no se producen los carbohidratos necesarios. La respuesta correcta es D."
  }

  ,
  {
    uid: "s1-cn-094",
    session: 1,
    block: 4,
    number: 94,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Biodiversidad, riqueza de especies y representación de datos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 94",
    stem: `Con el fin de evidenciar la variación en la biodiversidad animal de especies acuáticas, se revisaron los registros de la entidad ambiental competente, teniendo en cuenta las variables de riqueza (número de especies) y el número total de individuos de todas las especies presentes, y se compilaron en la siguiente tabla.`,
    resources: [
      {
        type: "table",
        caption: "Registros de biodiversidad animal de especies acuáticas",
        headers: ["Año", "Riqueza", "Cantidad de individuos"],
        rows: [
          ["2003", "68", "1.563"],
          ["2008", "62", "1.621"],
          ["2013", "45", "803"],
          ["2018", "22", "456"],
          ["2023", "12", "102"]
        ]
      },
      {
        type: "html",
        html: `
          <div class="reading-card science-reading">
            <div class="reading-instruction">Opciones gráficas</div>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(220px,1fr));gap:16px">
              <figure style="margin:0;border:1px solid var(--line);border-radius:16px;padding:12px;background:rgba(255,255,255,.55)">
                <figcaption style="font-weight:800;margin-bottom:8px">A.</figcaption>
                <svg viewBox="0 0 320 190" style="width:100%" aria-label="Gráfico A">
                  <line x1="35" y1="155" x2="300" y2="155" stroke="currentColor"/><line x1="35" y1="155" x2="35" y2="20" stroke="currentColor"/>
                  <g stroke="currentColor" opacity=".25"><line x1="35" y1="130" x2="300" y2="130"/><line x1="35" y1="105" x2="300" y2="105"/><line x1="35" y1="80" x2="300" y2="80"/><line x1="35" y1="55" x2="300" y2="55"/></g>
                  <rect x="96" y="151" width="45" height="4" fill="currentColor"/><rect x="210" y="40" width="55" height="115" fill="currentColor" opacity=".75"/>
                  <text x="84" y="176" font-size="12">Riqueza</text><text x="185" y="176" font-size="12">Cantidad de individuos</text>
                </svg>
              </figure>
              <figure style="margin:0;border:1px solid var(--line);border-radius:16px;padding:12px;background:rgba(255,255,255,.55)">
                <figcaption style="font-weight:800;margin-bottom:8px">B.</figcaption>
                <svg viewBox="0 0 320 190" style="width:100%" aria-label="Gráfico B">
                  <line x1="35" y1="155" x2="300" y2="155" stroke="currentColor"/><line x1="35" y1="155" x2="35" y2="20" stroke="currentColor"/>
                  <g stroke="currentColor" opacity=".25"><line x1="35" y1="125" x2="300" y2="125"/><line x1="35" y1="95" x2="300" y2="95"/><line x1="35" y1="65" x2="300" y2="65"/><line x1="35" y1="35" x2="300" y2="35"/></g>
                  <g fill="currentColor"><rect x="55" y="38" width="12" height="117"/><rect x="105" y="36" width="12" height="119"/><rect x="155" y="33" width="12" height="122"/><rect x="205" y="34" width="12" height="121"/><rect x="255" y="32" width="12" height="123"/></g>
                  <g fill="currentColor" opacity=".35"><rect x="72" y="55" width="18" height="100"/><rect x="122" y="50" width="18" height="105"/><rect x="172" y="95" width="18" height="60"/><rect x="222" y="128" width="18" height="27"/><rect x="272" y="148" width="18" height="7"/></g>
                  <text x="57" y="176" font-size="12">1</text><text x="107" y="176" font-size="12">2</text><text x="157" y="176" font-size="12">3</text><text x="207" y="176" font-size="12">4</text><text x="257" y="176" font-size="12">5</text>
                </svg>
              </figure>
              <figure style="margin:0;border:1px solid var(--line);border-radius:16px;padding:12px;background:rgba(255,255,255,.55)">
                <figcaption style="font-weight:800;margin-bottom:8px">C.</figcaption>
                <svg viewBox="0 0 320 190" style="width:100%" aria-label="Gráfico C">
                  <line x1="35" y1="155" x2="300" y2="155" stroke="currentColor"/><line x1="35" y1="155" x2="35" y2="20" stroke="currentColor"/>
                  <g fill="currentColor" opacity=".85"><rect x="55" y="25" width="28" height="130"/><rect x="105" y="25" width="28" height="130"/><rect x="155" y="25" width="28" height="130"/><rect x="205" y="25" width="28" height="130"/><rect x="255" y="25" width="28" height="130"/></g>
                  <g fill="currentColor" opacity=".35"><rect x="55" y="145" width="28" height="10"/><rect x="105" y="145" width="28" height="10"/><rect x="155" y="145" width="28" height="10"/><rect x="205" y="145" width="28" height="10"/><rect x="255" y="135" width="28" height="20"/></g>
                  <text x="49" y="176" font-size="12">2003</text><text x="99" y="176" font-size="12">2008</text><text x="149" y="176" font-size="12">2013</text><text x="199" y="176" font-size="12">2018</text><text x="249" y="176" font-size="12">2023</text>
                </svg>
              </figure>
              <figure style="margin:0;border:2px solid var(--primary);border-radius:16px;padding:12px;background:rgba(255,255,255,.55)">
                <figcaption style="font-weight:800;margin-bottom:8px">D.</figcaption>
                <svg viewBox="0 0 320 190" style="width:100%" aria-label="Gráfico D">
                  <line x1="35" y1="155" x2="300" y2="155" stroke="currentColor"/><line x1="35" y1="155" x2="35" y2="20" stroke="currentColor"/>
                  <g stroke="currentColor" opacity=".22"><line x1="35" y1="130" x2="300" y2="130"/><line x1="35" y1="105" x2="300" y2="105"/><line x1="35" y1="80" x2="300" y2="80"/><line x1="35" y1="55" x2="300" y2="55"/></g>
                  <polyline points="58,49 112,45 166,92 220,120 276,148" fill="none" stroke="currentColor" stroke-width="4"/>
                  <polyline points="58,149 112,149 166,151 220,153 276,154" fill="none" stroke="currentColor" stroke-width="3" opacity=".55"/>
                  <g fill="currentColor"><circle cx="58" cy="49" r="4"/><circle cx="112" cy="45" r="4"/><circle cx="166" cy="92" r="4"/><circle cx="220" cy="120" r="4"/><circle cx="276" cy="148" r="4"/></g>
                  <g fill="currentColor" opacity=".55"><circle cx="58" cy="149" r="4"/><circle cx="112" cy="149" r="4"/><circle cx="166" cy="151" r="4"/><circle cx="220" cy="153" r="4"/><circle cx="276" cy="154" r="4"/></g>
                  <text x="46" y="174" font-size="12">2003</text><text x="101" y="174" font-size="12">2008</text><text x="155" y="174" font-size="12">2013</text><text x="209" y="174" font-size="12">2018</text><text x="263" y="174" font-size="12">2023</text>
                  <text x="48" y="42" font-size="11">1.563</text><text x="100" y="38" font-size="11">1.621</text><text x="157" y="86" font-size="11">803</text><text x="214" y="114" font-size="11">456</text><text x="265" y="142" font-size="11">102</text>
                </svg>
              </figure>
            </div>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con la información anterior, ¿cuál de los siguientes gráficos representa adecuadamente los datos recolectados?",
    options: [
      { letter: "A", text: "Gráfico A." },
      { letter: "B", text: "Gráfico B." },
      { letter: "C", text: "Gráfico C." },
      { letter: "D", text: "Gráfico D." }
    ],
    correctAnswer: "D",
    explanation: "El gráfico D representa de forma adecuada la variación por año de las dos variables de la tabla: riqueza y cantidad de individuos. En él se observa la disminución de la riqueza y la caída marcada del número de individuos después de 2008. La respuesta correcta es D."
  }


  ,
  {
    uid: "s1-cn-095",
    session: 1,
    block: 4,
    number: 95,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Ondas electromagnéticas y transmisión de información",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 95",
    stem: `Un ingeniero investiga cómo se dará la transmisión de información para que su pueblo se conecte a internet. Él encuentra que esto ocurrirá a través de la integración de dos tecnologías: un cable de fibra óptica por el que se transporta la información desde internet hasta la antena principal del pueblo, y un grupo de antenas que emiten y reciben la información por medio de ondas electromagnéticas.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 95 A 97 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Un ingeniero investiga cómo se dará la transmisión de información para que su pueblo se conecte a internet. Él encuentra que esto ocurrirá a través de la integración de dos tecnologías:</p>
            <ul>
              <li>Un cable de fibra óptica por el que se transporta la información desde internet hasta la antena principal del pueblo.</li>
              <li>Un grupo de antenas que emiten y reciben la información por medio de ondas electromagnéticas, como antenas de wifi.</li>
            </ul>
            <p>Ambas tecnologías se comunican con la antena principal en la cabecera del pueblo, que repite la señal a otras antenas ubicadas estratégicamente en las plazas y zonas comunes.</p>
            <div class="wifi-board" aria-label="Esquemas de wifi en zonas comunitarias y megazonas wifi">
              <section>
                <h4>Esquema wifi zonas comunitarias</h4>
                <svg viewBox="0 0 760 330" role="img" aria-label="Esquema de zonas comunitarias wifi" class="diagram-svg">
                  <defs>
                    <marker id="arrow95" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="currentColor"></path></marker>
                  </defs>
                  <rect x="22" y="84" width="315" height="210" rx="105" fill="rgba(77,124,113,.11)" stroke="currentColor" opacity=".9"></rect>
                  <text x="116" y="72" font-size="17" font-weight="800">Zona común del pueblo</text>
                  <g fill="currentColor" opacity=".85">
                    <rect x="146" y="138" width="38" height="74" rx="4"></rect><rect x="196" y="158" width="44" height="54" rx="4"></rect><rect x="74" y="180" width="48" height="32" rx="4"></rect>
                    <path d="M72 180 L98 154 L124 180 Z"></path><path d="M145 138 L165 112 L185 138 Z"></path><path d="M196 158 L218 136 L240 158 Z"></path>
                    <circle cx="172" cy="238" r="17"></circle>
                    <rect x="164" y="255" width="16" height="32"></rect>
                  </g>
                  <g stroke="currentColor" stroke-width="3" fill="none">
                    <path d="M53 113 q18 -18 36 0"></path><path d="M61 124 q10 -10 20 0"></path><line x1="71" y1="128" x2="71" y2="210"></line>
                    <path d="M272 98 q20 -20 40 0"></path><path d="M282 110 q10 -10 20 0"></path><line x1="292" y1="114" x2="292" y2="240"></line>
                    <path d="M171 84 q22 -23 44 0"></path><path d="M182 96 q11 -12 22 0"></path><line x1="193" y1="100" x2="193" y2="134"></line>
                  </g>
                  <text x="162" y="105" font-size="13" font-weight="800">Antena principal</text>
                  <text x="246" y="267" font-size="13" font-weight="800">Antena secundaria</text>
                  <g stroke="currentColor" stroke-width="2" opacity=".55">
                    <line x1="193" y1="111" x2="71" y2="128"></line><line x1="193" y1="111" x2="292" y2="114"></line><line x1="71" y1="128" x2="172" y2="238"></line><line x1="292" y1="114" x2="172" y2="238"></line>
                  </g>
                  <path d="M620 116 C520 106, 480 138, 398 136" fill="none" stroke="currentColor" stroke-width="6" marker-end="url(#arrow95)"></path>
                  <text x="420" y="116" font-size="16" font-weight="800">Conexión por fibra óptica</text>
                  <g fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M610 92 q18 -18 36 0"></path><path d="M618 103 q10 -10 20 0"></path><line x1="628" y1="106" x2="628" y2="160"></line>
                    <rect x="636" y="142" width="52" height="80" rx="6"></rect>
                    <path d="M364 92 q18 -18 36 0"></path><path d="M372 103 q10 -10 20 0"></path><line x1="382" y1="106" x2="382" y2="160"></line>
                    <path d="M458 52 q18 -18 36 0"></path><path d="M466 63 q10 -10 20 0"></path><line x1="476" y1="66" x2="476" y2="120"></line>
                  </g>
                  <text x="643" y="238" font-size="16" font-weight="900">Internet</text>
                  <g stroke="currentColor" stroke-width="3" fill="none" marker-end="url(#arrow95)">
                    <path d="M382 112 C404 79, 431 62, 472 66"></path>
                    <path d="M476 66 C520 55, 565 72, 626 96"></path>
                  </g>
                  <text x="465" y="42" font-size="15" font-weight="800">Conexión por ondas</text>
                </svg>
              </section>
              <section>
                <h4>Esquema Megazonas wifi</h4>
                <svg viewBox="0 0 760 330" role="img" aria-label="Esquema de megazonas wifi" class="diagram-svg">
                  <defs>
                    <marker id="arrow95b" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="currentColor"></path></marker>
                  </defs>
                  <g fill="currentColor" opacity=".85">
                    <rect x="38" y="55" width="48" height="46" rx="4"></rect><path d="M35 55 L62 33 L90 55 Z"></path><text x="35" y="125" font-size="15" font-weight="800">Escuela</text>
                    <rect x="616" y="50" width="64" height="70" rx="8" fill="none" stroke="currentColor" stroke-width="3"></rect><text x="606" y="145" font-size="15" font-weight="900">Internet</text>
                  </g>
                  <g stroke="currentColor" stroke-width="3" fill="none">
                    <path d="M134 75 q17 -17 34 0"></path><path d="M141 85 q10 -10 20 0"></path><line x1="151" y1="88" x2="151" y2="160"></line>
                  </g>
                  <g class="mesh" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="5 7" opacity=".75">
                    <line x1="220" y1="110" x2="305" y2="72"></line><line x1="305" y1="72" x2="402" y2="112"></line><line x1="402" y1="112" x2="497" y2="78"></line><line x1="220" y1="110" x2="330" y2="150"></line><line x1="330" y1="150" x2="402" y2="112"></line><line x1="402" y1="112" x2="486" y2="168"></line><line x1="330" y1="150" x2="430" y2="220"></line><line x1="486" y1="168" x2="430" y2="220"></line><line x1="305" y1="72" x2="330" y2="150"></line><line x1="497" y1="78" x2="486" y2="168"></line>
                  </g>
                  <g stroke="currentColor" stroke-width="3" fill="none">
                    <path d="M215 86 q14 -14 28 0"></path><path d="M300 48 q14 -14 28 0"></path><path d="M397 88 q14 -14 28 0"></path><path d="M492 54 q14 -14 28 0"></path><path d="M325 126 q14 -14 28 0"></path><path d="M481 144 q14 -14 28 0"></path><path d="M425 196 q14 -14 28 0"></path>
                    <line x1="229" y1="88" x2="229" y2="125"></line><line x1="314" y1="50" x2="314" y2="87"></line><line x1="411" y1="90" x2="411" y2="127"></line><line x1="506" y1="56" x2="506" y2="93"></line><line x1="339" y1="128" x2="339" y2="165"></line><line x1="495" y1="146" x2="495" y2="183"></line><line x1="439" y1="198" x2="439" y2="235"></line>
                  </g>
                  <g stroke="currentColor" stroke-width="4" fill="none" marker-end="url(#arrow95b)">
                    <line x1="151" y1="92" x2="220" y2="110"></line><line x1="616" y1="86" x2="500" y2="78"></line>
                  </g>
                  <text x="218" y="260" font-size="15" font-weight="800">Las ondas de la señal pueden tener frecuencias entre 928 MHz y 5.850 MHz para mayor cobertura.</text>
                </svg>
              </section>
            </div>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con el esquema de wifi zonas comunitarias, ¿cuál de las siguientes razones puede argumentar la necesidad de conectar el cable de fibra óptica?",
    options: [
      { letter: "A", text: "El cable de fibra óptica es el que lleva la corriente a las antenas." },
      { letter: "B", text: "El cable de fibra óptica es la única forma de comunicarse con internet." },
      { letter: "C", text: "El cable de fibra óptica es una segunda forma de conectarse con internet." },
      { letter: "D", text: "El cable de fibra óptica llega a cada antena y repite la señal de internet." }
    ],
    correctAnswer: "D",
    explanation: "Según la respuesta marcada en el material, la opción correcta es D. El esquema relaciona el cable de fibra óptica con la conexión de internet que alimenta el sistema y permite repetir la señal hacia las antenas del pueblo."
  }

  ,
  {
    uid: "s1-cn-096",
    session: 1,
    block: 4,
    number: 96,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Frecuencia de ondas electromagnéticas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 96",
    stem: `En el esquema Megazonas wifi, el ingeniero sugiere utilizar dos grupos de ondas, en donde se observa que la frecuencia de las ondas del Grupo 2 es, aproximadamente, cinco veces mayor que la del Grupo 1.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading">
            <div class="reading-instruction">Contexto: Megazonas wifi</div>
            <p>La propuesta del ingeniero consiste en realizar una conexión por medio de ondas electromagnéticas, con antenas conectadas entre sí y con frecuencias de onda, sin costo, como las ondas de radio.</p>
            <p>En el esquema Megazonas wifi se sugiere utilizar dos grupos de ondas. La frecuencia de las ondas del <strong>Grupo 2</strong> es, aproximadamente, <strong>5 veces mayor</strong> que la del <strong>Grupo 1</strong>.</p>
            <div class="wave-options" aria-label="Opciones de ondas para comparar frecuencia">
              <figure><figcaption>A.</figcaption><svg viewBox="0 0 360 120" class="wave-svg" aria-label="Opción A"><line x1="22" y1="60" x2="338" y2="60"/><text x="118" y="20">Grupo 1</text><path d="M30 60 C38 15, 52 15, 60 60 S82 105, 90 60 S112 15, 120 60 S142 105, 150 60 S172 15, 180 60 S202 105, 210 60 S232 15, 240 60 S262 105, 270 60 S292 15, 300 60 S322 105, 330 60"/></svg><svg viewBox="0 0 360 120" class="wave-svg" aria-label="Grupo 2 opción A"><line x1="22" y1="60" x2="338" y2="60"/><text x="118" y="20">Grupo 2</text><path d="M30 60 C38 22, 52 22, 60 60 S82 98, 90 60 S112 22, 120 60 S142 98, 150 60 S172 22, 180 60 S202 98, 210 60 S232 22, 240 60 S262 98, 270 60 S292 22, 300 60 S322 98, 330 60"/></svg></figure>
              <figure><figcaption>B.</figcaption><svg viewBox="0 0 360 120" class="wave-svg" aria-label="Grupo 1 opción B"><line x1="22" y1="60" x2="338" y2="60"/><text x="118" y="20">Grupo 1</text><path d="M30 60 C38 15, 52 15, 60 60 S82 105, 90 60 S112 15, 120 60 S142 105, 150 60 S172 15, 180 60 S202 105, 210 60 S232 15, 240 60 S262 105, 270 60 S292 15, 300 60 S322 105, 330 60"/></svg><svg viewBox="0 0 360 120" class="wave-svg" aria-label="Grupo 2 opción B"><line x1="22" y1="60" x2="338" y2="60"/><text x="118" y="20">Grupo 2</text><path d="M30 60 C70 15, 110 15, 150 60 S230 105, 270 60 S310 15, 340 60"/></svg></figure>
              <figure><figcaption>C.</figcaption><svg viewBox="0 0 360 120" class="wave-svg" aria-label="Grupo 1 opción C"><line x1="22" y1="60" x2="338" y2="60"/><text x="118" y="20">Grupo 1</text><path d="M30 60 C70 15, 110 15, 150 60 S230 105, 270 60 S310 15, 340 60"/></svg><svg viewBox="0 0 360 120" class="wave-svg" aria-label="Grupo 2 opción C"><line x1="22" y1="60" x2="338" y2="60"/><text x="118" y="20">Grupo 2</text><path d="M30 60 C70 25, 110 25, 150 60 S230 95, 270 60 S310 25, 340 60"/></svg></figure>
              <figure class="selected-graphic"><figcaption>D.</figcaption><svg viewBox="0 0 360 120" class="wave-svg" aria-label="Grupo 1 opción D"><line x1="22" y1="60" x2="338" y2="60"/><text x="118" y="20">Grupo 1</text><path d="M30 60 C70 15, 110 15, 150 60 S230 105, 270 60 S310 15, 340 60"/></svg><svg viewBox="0 0 360 120" class="wave-svg" aria-label="Grupo 2 opción D"><line x1="22" y1="60" x2="338" y2="60"/><text x="118" y="20">Grupo 2</text><path d="M30 60 C35 20, 45 20, 50 60 S65 100, 70 60 S85 20, 90 60 S105 100, 110 60 S125 20, 130 60 S145 100, 150 60 S165 20, 170 60 S185 100, 190 60 S205 20, 210 60 S225 100, 230 60 S245 20, 250 60 S265 100, 270 60 S285 20, 290 60 S305 100, 310 60 S325 20, 330 60"/></svg></figure>
            </div>
          </article>
        `
      }
    ],
    prompt: "¿Cómo serían las ondas de estas frecuencias?",
    options: [
      { letter: "A", text: "Opción A." },
      { letter: "B", text: "Opción B." },
      { letter: "C", text: "Opción C." },
      { letter: "D", text: "Opción D." }
    ],
    correctAnswer: "D",
    explanation: "Si la frecuencia del Grupo 2 es aproximadamente cinco veces mayor que la del Grupo 1, en el mismo intervalo de tiempo el Grupo 2 debe mostrar muchas más oscilaciones. Eso ocurre en la opción D."
  }

  ,
  {
    uid: "s1-cn-097",
    session: 1,
    block: 4,
    number: 97,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Comunicación de modelos científicos y tecnológicos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 97",
    stem: `En una encuesta aplicada a la población, se resaltó que dibujar en el esquema la conexión entre las antenas es una fortaleza en la comunicación de la propuesta de las Megazonas wifi.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading">
            <div class="reading-instruction">Contexto: comunicación de la propuesta Megazonas wifi</div>
            <p>La propuesta de Megazonas wifi muestra antenas conectadas entre sí mediante ondas electromagnéticas. El esquema permite observar que varias poblaciones, como cabeceras rurales y una escuela, pueden enlazarse por medio de una red de antenas.</p>
            <svg viewBox="0 0 760 260" role="img" aria-label="Red de antenas conectadas en Megazonas wifi" class="diagram-svg">
              <g fill="currentColor" opacity=".85"><rect x="48" y="55" width="50" height="42" rx="4"></rect><path d="M45 55 L73 34 L102 55 Z"></path><text x="39" y="125" font-size="15" font-weight="800">Escuela</text><rect x="626" y="58" width="60" height="66" rx="8" fill="none" stroke="currentColor" stroke-width="3"></rect><text x="622" y="150" font-size="15" font-weight="900">Internet</text></g>
              <g class="mesh" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="5 7" opacity=".75"><line x1="210" y1="90" x2="310" y2="55"></line><line x1="310" y1="55" x2="430" y2="88"></line><line x1="430" y1="88" x2="540" y2="64"></line><line x1="210" y1="90" x2="328" y2="143"></line><line x1="328" y1="143" x2="430" y2="88"></line><line x1="430" y1="88" x2="510" y2="155"></line><line x1="328" y1="143" x2="440" y2="208"></line><line x1="510" y1="155" x2="440" y2="208"></line><line x1="540" y1="64" x2="510" y2="155"></line></g>
              <g stroke="currentColor" stroke-width="3" fill="none"><path d="M124 68 q17 -17 34 0"></path><path d="M131 78 q10 -10 20 0"></path><line x1="141" y1="82" x2="141" y2="150"></line><path d="M204 66 q14 -14 28 0"></path><path d="M304 31 q14 -14 28 0"></path><path d="M424 64 q14 -14 28 0"></path><path d="M534 40 q14 -14 28 0"></path><path d="M322 119 q14 -14 28 0"></path><path d="M504 131 q14 -14 28 0"></path><path d="M434 184 q14 -14 28 0"></path><line x1="218" y1="68" x2="218" y2="105"></line><line x1="318" y1="33" x2="318" y2="70"></line><line x1="438" y1="66" x2="438" y2="103"></line><line x1="548" y1="42" x2="548" y2="79"></line><line x1="336" y1="121" x2="336" y2="158"></line><line x1="518" y1="133" x2="518" y2="170"></line><line x1="448" y1="186" x2="448" y2="223"></line></g>
              <g stroke="currentColor" stroke-width="4" fill="none"><line x1="141" y1="82" x2="210" y2="90"></line><line x1="626" y1="91" x2="540" y2="64"></line></g>
              <text x="180" y="242" font-size="15" font-weight="800">El dibujo permite visualizar la conexión entre varias antenas y poblaciones.</text>
            </svg>
          </article>
        `
      }
    ],
    prompt: "¿Por qué mostrar la conexión entre las antenas es una fortaleza en la comunicación?",
    options: [
      { letter: "A", text: "Porque se puede deducir que cada antena se comunica con una sola antena, y de esta manera, llevan la señal." },
      { letter: "B", text: "Porque, de acuerdo con la conexión entre las antenas, se puede determinar qué frecuencias usa cada una de ellas." },
      { letter: "C", text: "Porque se puede saber cuántas antenas se necesitan para llevar la señal de internet a la escuela." },
      { letter: "D", text: "Porque ilustra cómo pueden conectarse varias poblaciones entre sí y con una señal muy estable." }
    ],
    correctAnswer: "D",
    explanation: "El esquema comunica visualmente la interconexión de varias antenas y poblaciones. Esa representación facilita comprender cómo la red puede enlazar diferentes lugares mediante una señal estable. La respuesta correcta es D."
  }



  ,
  {
    uid: "s1-cn-098",
    session: 1,
    block: 4,
    number: 98,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Cambios químicos y velocidad de reacción",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 98",
    stem: `Pedro dejó una fruta al aire libre para ver cuánto tardaba en descomponerse. Los días pasaban y seguía sin descomponerse totalmente, entonces planteó la hipótesis de que todos los cambios químicos necesitan de varios días para que ocurran. Al otro día, leyó en un libro de ciencias lo siguiente: “Es fundamental controlar la velocidad de las reacciones químicas, ya que existen varios factores que la afectan, como la concentración de los reactivos, el tamaño de partícula, la temperatura y los catalizadores, entre otros”.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading">
            <div class="reading-instruction">Situación experimental</div>
            <p>Pedro dejó una fruta al aire libre para observar cuánto tardaba en descomponerse. Como pasaban los días y la fruta seguía sin descomponerse totalmente, propuso la hipótesis de que todos los cambios químicos necesitan varios días para ocurrir.</p>
            <p>Luego leyó que la velocidad de las reacciones químicas puede cambiar por factores como la concentración de los reactivos, el tamaño de partícula, la temperatura y los catalizadores.</p>
          </article>
        `
      }
    ],
    prompt: "Teniendo en cuenta la información anterior, ¿la hipótesis planteada por Pedro es compatible con el fenómeno observado y la información del libro?",
    options: [
      { letter: "A", text: "Es compatible, porque tuvo en cuenta las observaciones realizadas y consideró que algunas reacciones tardan bastante tiempo." },
      { letter: "B", text: "No es compatible, porque las frutas se descomponen en un día al aire libre, además no tuvo en cuenta la información del libro." },
      { letter: "C", text: "Es compatible, porque existen factores que aceleran las reacciones, de tal forma que su experimento pudo tardar varias semanas." },
      { letter: "D", text: "No es compatible, porque no se puede generalizar que todos los cambios tardan varios días, desconociendo la información del libro." }
    ],
    correctAnswer: "C",
    explanation: "Según la respuesta marcada en el material, la opción correcta es C. La descomposición puede variar según factores que modifican la velocidad de las reacciones químicas; por eso el experimento pudo tardar varios días o semanas."
  }

  ,
  {
    uid: "s1-cn-099",
    session: 1,
    block: 4,
    number: 99,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Evolución, especiación y aislamiento reproductivo",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 99",
    stem: `Existe una población de monos que vive en un ecosistema boscoso. Este ecosistema, durante un largo periodo de tiempo, ha estado dividido por un gran río, dejando a la población de monos dividida en dos lugares diferentes. Algunos científicos han investigado este fenómeno y han resuelto que la población de monos, que en principio se creía pertenecían a una misma especie, sufrió un aislamiento reproductivo a causa de la división causada por el río y, posteriormente, se demostró que pertenecen a dos especies diferentes.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading evolution-card">
            <div class="reading-instruction">Modelos de especiación por aislamiento</div>
            <p>De acuerdo con la información anterior, se debe escoger el modelo que represente una población inicial, la aparición de una barrera geográfica —el río—, el aislamiento reproductivo y la formación de dos especies de monos.</p>
            <div class="evolution-options" aria-label="Modelos que representan el fenómeno de aislamiento reproductivo">
              <figure>
                <figcaption>A.</figcaption>
                <svg viewBox="0 0 900 150" role="img" aria-label="Modelo A: población inicial, aparece el río, aislamiento reproductivo y dos especies de monos">
                  <defs>
                    <marker id="arrow-evo-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"></path></marker>
                  </defs>
                  <line x1="120" y1="22" x2="820" y2="22" stroke="currentColor" stroke-width="10" marker-end="url(#arrow-evo-a)"></line>
                  <text x="128" y="18" font-size="18" font-weight="900">Tiempo</text>
                  <circle cx="115" cy="74" r="42" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <text x="45" y="133" font-size="15" font-weight="800">Población inicial</text><text x="70" y="149" font-size="15" font-weight="800">de monos</text>
                  <path d="M295 34 A42 42 0 0 0 295 114 L295 34" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <path d="M355 34 A42 42 0 0 1 355 114 L355 34" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <rect x="318" y="35" width="14" height="78" fill="#ffffff" stroke="currentColor" stroke-width="2"></rect>
                  <text x="270" y="133" font-size="15" font-weight="800">Aparece el río</text>
                  <path d="M500 34 A42 42 0 0 0 500 114 L500 34" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <path d="M560 34 A42 42 0 0 1 560 114 L560 34" fill="#5c6570" stroke="currentColor" stroke-width="3"></path>
                  <rect x="523" y="35" width="14" height="78" fill="#ffffff" stroke="currentColor" stroke-width="2"></rect>
                  <text x="468" y="133" font-size="15" font-weight="800">Aislamiento</text><text x="466" y="149" font-size="15" font-weight="800">reproductivo</text>
                  <circle cx="724" cy="75" r="28" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <circle cx="804" cy="75" r="28" fill="#5c6570" stroke="currentColor" stroke-width="3"></circle>
                  <text x="693" y="133" font-size="15" font-weight="800">Dos especies</text><text x="713" y="149" font-size="15" font-weight="800">de monos</text>
                </svg>
              </figure>

              <figure>
                <figcaption>B.</figcaption>
                <svg viewBox="0 0 900 150" role="img" aria-label="Modelo B">
                  <defs><marker id="arrow-evo-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"></path></marker></defs>
                  <line x1="120" y1="22" x2="820" y2="22" stroke="currentColor" stroke-width="10" marker-end="url(#arrow-evo-b)"></line>
                  <text x="128" y="18" font-size="18" font-weight="900">Tiempo</text>
                  <circle cx="115" cy="74" r="42" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <text x="45" y="133" font-size="15" font-weight="800">Población inicial</text><text x="70" y="149" font-size="15" font-weight="800">de monos</text>
                  <path d="M325 32 A42 42 0 0 0 325 116 Z" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <path d="M325 32 A42 42 0 0 1 325 116 Z" fill="#5c6570" stroke="currentColor" stroke-width="3"></path>
                  <text x="270" y="133" font-size="15" font-weight="800">Aparece el río</text>
                  <path d="M530 32 A42 42 0 0 0 530 116 Z" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <path d="M530 32 A42 42 0 0 1 530 116 Z" fill="#5c6570" stroke="currentColor" stroke-width="3"></path>
                  <rect x="523" y="35" width="14" height="78" fill="#ffffff" stroke="currentColor" stroke-width="2"></rect>
                  <text x="468" y="133" font-size="15" font-weight="800">Aislamiento</text><text x="466" y="149" font-size="15" font-weight="800">reproductivo</text>
                  <circle cx="724" cy="75" r="28" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <circle cx="804" cy="75" r="28" fill="#5c6570" stroke="currentColor" stroke-width="3"></circle>
                  <text x="693" y="133" font-size="15" font-weight="800">Dos especies</text><text x="713" y="149" font-size="15" font-weight="800">de monos</text>
                </svg>
              </figure>

              <figure>
                <figcaption>C.</figcaption>
                <svg viewBox="0 0 900 150" role="img" aria-label="Modelo C">
                  <defs><marker id="arrow-evo-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"></path></marker></defs>
                  <line x1="120" y1="22" x2="820" y2="22" stroke="currentColor" stroke-width="10" marker-end="url(#arrow-evo-c)"></line>
                  <text x="128" y="18" font-size="18" font-weight="900">Tiempo</text>
                  <circle cx="115" cy="74" r="42" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <text x="45" y="133" font-size="15" font-weight="800">Población inicial</text><text x="70" y="149" font-size="15" font-weight="800">de monos</text>
                  <path d="M295 34 A42 42 0 0 0 295 114 L295 34" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <path d="M355 34 A42 42 0 0 1 355 114 L355 34" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <rect x="318" y="35" width="14" height="78" fill="#ffffff" stroke="currentColor" stroke-width="2"></rect>
                  <text x="270" y="133" font-size="15" font-weight="800">Aparece el río</text>
                  <path d="M530 32 A42 42 0 0 0 530 116 Z" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <path d="M530 32 A42 42 0 0 1 530 116 Z" fill="#5c6570" stroke="currentColor" stroke-width="3"></path>
                  <text x="468" y="133" font-size="15" font-weight="800">Aislamiento</text><text x="466" y="149" font-size="15" font-weight="800">reproductivo</text>
                  <circle cx="724" cy="75" r="28" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <circle cx="804" cy="75" r="28" fill="#5c6570" stroke="currentColor" stroke-width="3"></circle>
                  <text x="693" y="133" font-size="15" font-weight="800">Dos especies</text><text x="713" y="149" font-size="15" font-weight="800">de monos</text>
                </svg>
              </figure>

              <figure>
                <figcaption>D.</figcaption>
                <svg viewBox="0 0 900 150" role="img" aria-label="Modelo D">
                  <defs><marker id="arrow-evo-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"></path></marker></defs>
                  <line x1="120" y1="22" x2="820" y2="22" stroke="currentColor" stroke-width="10" marker-end="url(#arrow-evo-d)"></line>
                  <text x="128" y="18" font-size="18" font-weight="900">Tiempo</text>
                  <circle cx="115" cy="74" r="42" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <text x="45" y="133" font-size="15" font-weight="800">Población inicial</text><text x="70" y="149" font-size="15" font-weight="800">de monos</text>
                  <path d="M325 32 A42 42 0 0 0 325 116 Z" fill="#d8dde3" stroke="currentColor" stroke-width="3"></path>
                  <path d="M325 32 A42 42 0 0 1 325 116 Z" fill="#5c6570" stroke="currentColor" stroke-width="3"></path>
                  <text x="270" y="133" font-size="15" font-weight="800">Aparece el río</text>
                  <circle cx="530" cy="75" r="42" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <circle cx="530" cy="75" r="22" fill="#5c6570" opacity=".75" stroke="currentColor" stroke-width="2"></circle>
                  <text x="468" y="133" font-size="15" font-weight="800">Aislamiento</text><text x="466" y="149" font-size="15" font-weight="800">reproductivo</text>
                  <circle cx="764" cy="75" r="42" fill="#d8dde3" stroke="currentColor" stroke-width="3"></circle>
                  <circle cx="764" cy="75" r="23" fill="#5c6570" stroke="currentColor" stroke-width="2"></circle>
                  <text x="721" y="133" font-size="15" font-weight="800">Dos especies</text><text x="742" y="149" font-size="15" font-weight="800">de monos</text>
                </svg>
              </figure>
            </div>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con la información anterior, ¿cuál de los siguientes modelos representa el fenómeno?",
    options: [
      { letter: "A", text: "Modelo A." },
      { letter: "B", text: "Modelo B." },
      { letter: "C", text: "Modelo C." },
      { letter: "D", text: "Modelo D." }
    ],
    correctAnswer: "A",
    explanation: "El modelo A representa la secuencia descrita: primero hay una sola población; luego aparece el río como barrera geográfica, se produce aislamiento reproductivo entre los grupos separados y, con el tiempo, se originan dos especies diferentes."
  }



  ,
  {
    uid: "s1-cnat-100",
    session: 1,
    block: 4,
    number: 100,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Física: fuerza y movimiento",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 100",
    stem: "En un laboratorio, un estudiante debe transportar los materiales para un experimento utilizando una mesa con ruedas. Para esto, el estudiante ejerce primero una fuerza a la mesa, que aumenta a medida que se desplaza hasta recorrer 4 m; luego, ejerce una fuerza constante hasta finalizar el recorrido a los 6 m.",
    resources: [
      {
        type: "html",
        html: `
          <article class="science-graph-card" aria-label="Opciones de gráficas de fuerza contra desplazamiento">
            <p class="resource-title">Gráficas de fuerza como función del desplazamiento</p>
            <div class="force-graphs-grid">
              <figure>
                <figcaption>A.</figcaption>
                <svg viewBox="0 0 520 230" role="img" aria-label="Gráfica A: fuerza constante hasta 4 metros y luego aumenta">
                  <defs><marker id="arr-f100-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"></path></marker></defs>
                  <line x1="70" y1="190" x2="485" y2="190" stroke="currentColor" stroke-width="4" marker-end="url(#arr-f100-a)"></line>
                  <line x1="70" y1="190" x2="70" y2="28" stroke="currentColor" stroke-width="4" marker-end="url(#arr-f100-a)"></line>
                  <polyline points="70,120 315,120 450,72" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"></polyline>
                  <line x1="315" y1="190" x2="315" y2="120" stroke="currentColor" stroke-width="2" opacity=".35"></line>
                  <line x1="450" y1="190" x2="450" y2="72" stroke="currentColor" stroke-width="2" opacity=".25"></line>
                  <g font-size="17" font-weight="800" text-anchor="middle"><text x="70" y="214">0</text><text x="112" y="214">1</text><text x="154" y="214">2</text><text x="196" y="214">3</text><text x="315" y="214">4</text><text x="383" y="214">5</text><text x="450" y="214">6</text><text x="487" y="214">7</text></g>
                  <text x="270" y="226" font-size="18" font-weight="900" text-anchor="middle">Desplazamiento (m)</text>
                  <text x="28" y="115" font-size="18" font-weight="900" transform="rotate(-90 28 115)" text-anchor="middle">Fuerza</text>
                </svg>
              </figure>

              <figure>
                <figcaption>B.</figcaption>
                <svg viewBox="0 0 520 230" role="img" aria-label="Gráfica B: fuerza constante hasta 4 metros y luego disminuye">
                  <defs><marker id="arr-f100-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"></path></marker></defs>
                  <line x1="70" y1="190" x2="485" y2="190" stroke="currentColor" stroke-width="4" marker-end="url(#arr-f100-b)"></line>
                  <line x1="70" y1="190" x2="70" y2="28" stroke="currentColor" stroke-width="4" marker-end="url(#arr-f100-b)"></line>
                  <polyline points="70,70 315,70 450,115" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"></polyline>
                  <line x1="315" y1="190" x2="315" y2="70" stroke="currentColor" stroke-width="2" opacity=".35"></line>
                  <line x1="450" y1="190" x2="450" y2="115" stroke="currentColor" stroke-width="2" opacity=".25"></line>
                  <g font-size="17" font-weight="800" text-anchor="middle"><text x="70" y="214">0</text><text x="112" y="214">1</text><text x="154" y="214">2</text><text x="196" y="214">3</text><text x="315" y="214">4</text><text x="383" y="214">5</text><text x="450" y="214">6</text><text x="487" y="214">7</text></g>
                  <text x="270" y="226" font-size="18" font-weight="900" text-anchor="middle">Desplazamiento (m)</text>
                  <text x="28" y="115" font-size="18" font-weight="900" transform="rotate(-90 28 115)" text-anchor="middle">Fuerza</text>
                </svg>
              </figure>

              <figure>
                <figcaption>C.</figcaption>
                <svg viewBox="0 0 520 230" role="img" aria-label="Gráfica C: fuerza aumenta hasta 4 metros y luego permanece constante">
                  <defs><marker id="arr-f100-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"></path></marker></defs>
                  <line x1="70" y1="190" x2="485" y2="190" stroke="currentColor" stroke-width="4" marker-end="url(#arr-f100-c)"></line>
                  <line x1="70" y1="190" x2="70" y2="28" stroke="currentColor" stroke-width="4" marker-end="url(#arr-f100-c)"></line>
                  <polyline points="70,145 315,72 450,72" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"></polyline>
                  <line x1="315" y1="190" x2="315" y2="72" stroke="currentColor" stroke-width="2" opacity=".35"></line>
                  <line x1="450" y1="190" x2="450" y2="72" stroke="currentColor" stroke-width="2" opacity=".25"></line>
                  <g font-size="17" font-weight="800" text-anchor="middle"><text x="70" y="214">0</text><text x="112" y="214">1</text><text x="154" y="214">2</text><text x="196" y="214">3</text><text x="315" y="214">4</text><text x="383" y="214">5</text><text x="450" y="214">6</text><text x="487" y="214">7</text></g>
                  <text x="270" y="226" font-size="18" font-weight="900" text-anchor="middle">Desplazamiento (m)</text>
                  <text x="28" y="115" font-size="18" font-weight="900" transform="rotate(-90 28 115)" text-anchor="middle">Fuerza</text>
                </svg>
              </figure>

              <figure>
                <figcaption>D.</figcaption>
                <svg viewBox="0 0 520 230" role="img" aria-label="Gráfica D: fuerza disminuye hasta 4 metros y luego permanece constante">
                  <defs><marker id="arr-f100-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"></path></marker></defs>
                  <line x1="70" y1="190" x2="485" y2="190" stroke="currentColor" stroke-width="4" marker-end="url(#arr-f100-d)"></line>
                  <line x1="70" y1="190" x2="70" y2="28" stroke="currentColor" stroke-width="4" marker-end="url(#arr-f100-d)"></line>
                  <polyline points="70,60 315,135 450,135" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"></polyline>
                  <line x1="315" y1="190" x2="315" y2="135" stroke="currentColor" stroke-width="2" opacity=".35"></line>
                  <line x1="450" y1="190" x2="450" y2="135" stroke="currentColor" stroke-width="2" opacity=".25"></line>
                  <g font-size="17" font-weight="800" text-anchor="middle"><text x="70" y="214">0</text><text x="112" y="214">1</text><text x="154" y="214">2</text><text x="196" y="214">3</text><text x="315" y="214">4</text><text x="383" y="214">5</text><text x="450" y="214">6</text><text x="487" y="214">7</text></g>
                  <text x="270" y="226" font-size="18" font-weight="900" text-anchor="middle">Desplazamiento (m)</text>
                  <text x="28" y="115" font-size="18" font-weight="900" transform="rotate(-90 28 115)" text-anchor="middle">Fuerza</text>
                </svg>
              </figure>
            </div>
          </article>
        `
      }
    ],
    prompt: "Teniendo en cuenta la información anterior, ¿cuál de las siguientes gráficas representa la fuerza como función de la posición en esta situación?",
    options: [
      { letter: "A", text: "Gráfica A." },
      { letter: "B", text: "Gráfica B." },
      { letter: "C", text: "Gráfica C." },
      { letter: "D", text: "Gráfica D." }
    ],
    correctAnswer: "C",
    explanation: "La descripción indica que la fuerza primero aumenta mientras la mesa se desplaza hasta los 4 m y después permanece constante hasta los 6 m. Esa relación está representada por la gráfica C."
  }


  ,
  {
    uid: "s1-cnat-101",
    session: 1,
    block: 4,
    number: 101,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Química: propiedades de materiales",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 101",
    stem: "Una estudiante encuentra en un libro información sobre algunos minerales y sus características.",
    resources: [
      {
        type: "html",
        html: `
          <article class="data-card mineral-card" aria-label="Tabla de minerales y sus características">
            <p class="resource-title">Tabla. Características de algunos minerales</p>
            <div class="table-wrap">
              <table class="icfes-table mineral-table">
                <thead>
                  <tr>
                    <th>Mineral</th>
                    <th>Color</th>
                    <th>Brillo</th>
                    <th>Transparencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>Azul</td><td>Metálico</td><td>Sí</td></tr>
                  <tr><td>2</td><td>Rojo</td><td>No metálico</td><td>No</td></tr>
                  <tr><td>3</td><td>Azul</td><td>No metálico</td><td>Sí</td></tr>
                  <tr><td>4</td><td>Verde</td><td>Metálico</td><td>No</td></tr>
                  <tr><td>5</td><td>Rojo</td><td>Metálico</td><td>No</td></tr>
                  <tr><td>6</td><td>Azul</td><td>No metálico</td><td>Sí</td></tr>
                  <tr><td>7</td><td>Rojo</td><td>No metálico</td><td>No</td></tr>
                  <tr><td>8</td><td>Verde</td><td>Metálico</td><td>Sí</td></tr>
                </tbody>
              </table>
            </div>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con la tabla, ¿cuáles minerales tienen las mismas características?",
    options: [
      { letter: "A", text: "Los minerales 3 y 6, y los minerales 4 y 8." },
      { letter: "B", text: "Los minerales 3 y 6, y los minerales 2 y 7." },
      { letter: "C", text: "Los minerales 2 y 5, y los minerales 4 y 8." },
      { letter: "D", text: "Los minerales 2 y 7, y los minerales 1 y 6." }
    ],
    correctAnswer: "B",
    explanation: "Los minerales 3 y 6 tienen color azul, brillo no metálico y transparencia sí. Los minerales 2 y 7 tienen color rojo, brillo no metálico y transparencia no. Por eso esas parejas comparten las mismas características."
  }

  ,
  {
    uid: "s1-cnat-102",
    session: 1,
    block: 4,
    number: 102,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Biología: división celular y crecimiento",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 102",
    stem: "El cuero cabelludo se compone de una parte fibrosa, formada de queratina (cabello o pelo), y una parte celular. En las células capilares sucede la división celular solamente mediante el proceso de mitosis. Estas células nuevas secretan las fibras de queratina, como se muestra en la figura.",
    resources: [
      {
        type: "html",
        html: `
          <article class="data-card scalp-card" aria-label="Figura de cuero cabelludo, folículo y mitosis">
            <p class="resource-title">Figura. Células capilares y mitosis</p>
            <div class="scalp-visual-grid">
              <figure class="svg-panel" aria-label="Estructura del cuero cabelludo">
                <svg viewBox="0 0 520 360" role="img" aria-label="Diagrama del cuero cabelludo con cabello, folículo, sebo, glándula sebácea y célula capilar">
                  <defs>
                    <linearGradient id="skinGrad102" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#f8fbff"/>
                      <stop offset="100%" stop-color="#dfe7f0"/>
                    </linearGradient>
                    <pattern id="dots102" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="4" cy="4" r="2" fill="#253044" opacity=".18"/>
                    </pattern>
                  </defs>
                  <rect x="110" y="65" width="270" height="230" rx="18" fill="url(#skinGrad102)" stroke="#1f2937" stroke-width="3"/>
                  <path d="M113 120 C145 140, 175 95, 207 118 C242 143, 272 97, 315 123 C342 139, 360 119, 378 132" fill="none" stroke="#1f2937" stroke-width="3" opacity=".65"/>
                  <rect x="110" y="63" width="270" height="58" rx="16" fill="url(#dots102)" opacity=".7"/>
                  <path d="M230 58 C246 125, 233 205, 220 294" fill="none" stroke="#111827" stroke-width="14" stroke-linecap="round"/>
                  <path d="M225 165 C206 205, 213 258, 230 300 C249 256, 264 208, 245 169 Z" fill="#f8fafc" stroke="#111827" stroke-width="4"/>
                  <ellipse cx="265" cy="230" rx="55" ry="28" fill="#dbeafe" stroke="#111827" stroke-width="3" transform="rotate(-23 265 230)"/>
                  <path d="M185 175 C206 158, 222 162, 233 176" fill="none" stroke="#111827" stroke-width="4"/>
                  <path d="M214 255 C190 286, 174 310, 152 332" stroke="#111827" stroke-width="4" fill="none"/>
                  <path d="M230 260 C214 296, 212 319, 201 342" stroke="#111827" stroke-width="4" fill="none"/>
                  <path d="M246 260 C262 295, 276 316, 291 340" stroke="#111827" stroke-width="4" fill="none"/>
                  <g font-size="20" font-weight="900" fill="#111827">
                    <text x="18" y="44">Cabello</text>
                    <text x="18" y="104">Superficie</text><text x="18" y="128">de la piel</text>
                    <text x="18" y="186">Sebo</text>
                    <text x="18" y="238">Folículo</text>
                    <text x="18" y="292">Glándula</text><text x="18" y="316">sebácea</text>
                    <text x="335" y="254">Célula</text><text x="335" y="278">capilar</text>
                  </g>
                  <g stroke="#111827" stroke-width="3" marker-end="url(#arrowhead)">
                    <line x1="105" y1="38" x2="210" y2="76"/>
                    <line x1="104" y1="110" x2="170" y2="105"/>
                    <line x1="94" y1="182" x2="187" y2="178"/>
                    <line x1="102" y1="234" x2="218" y2="214"/>
                    <line x1="111" y1="296" x2="236" y2="235"/>
                    <line x1="325" y1="248" x2="250" y2="270"/>
                  </g>
                </svg>
              </figure>
              <figure class="svg-panel" aria-label="Proceso de mitosis">
                <svg viewBox="0 0 360 360" role="img" aria-label="Proceso de mitosis: célula madre 2n produce clones 2n">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                      <path d="M0,0 L10,4 L0,8 Z" fill="#111827"/>
                    </marker>
                  </defs>
                  <text x="180" y="42" font-size="27" font-weight="900" text-anchor="middle">Mitosis</text>
                  <circle cx="180" cy="90" r="40" fill="#e5e7eb" stroke="#111827" stroke-width="4"/>
                  <text x="180" y="100" font-size="30" font-weight="900" text-anchor="middle">2n</text>
                  <text x="235" y="83" font-size="21" font-weight="900">Célula</text>
                  <text x="235" y="108" font-size="21" font-weight="900">madre</text>
                  <line x1="180" y1="135" x2="180" y2="186" stroke="#111827" stroke-width="4" marker-end="url(#arrowhead)"/>
                  <text x="205" y="170" font-size="22" font-weight="900">Mitosis</text>
                  <line x1="170" y1="196" x2="110" y2="235" stroke="#111827" stroke-width="4" marker-end="url(#arrowhead)"/>
                  <line x1="190" y1="196" x2="250" y2="235" stroke="#111827" stroke-width="4" marker-end="url(#arrowhead)"/>
                  <circle cx="95" cy="260" r="38" fill="#e5e7eb" stroke="#111827" stroke-width="4"/>
                  <circle cx="265" cy="260" r="38" fill="#e5e7eb" stroke="#111827" stroke-width="4"/>
                  <text x="95" y="270" font-size="28" font-weight="900" text-anchor="middle">2n</text>
                  <text x="265" y="270" font-size="28" font-weight="900" text-anchor="middle">2n</text>
                  <text x="180" y="324" font-size="20" font-weight="900" text-anchor="middle">Producción de clones</text>
                  <text x="180" y="348" font-size="20" font-weight="900" text-anchor="middle">de la célula madre</text>
                </svg>
              </figure>
            </div>
            <p class="formula-note"><strong>n</strong> = número de cromosomas</p>
          </article>
        `
      }
    ],
    prompt: "¿Qué papel específico cumple la mitosis en el pelo?",
    options: [
      { letter: "A", text: "Permite la variabilidad genética del pelo, mediante la recombinación." },
      { letter: "B", text: "Produce células madre, a partir de una fibra de queratina." },
      { letter: "C", text: "Permite el crecimiento del pelo, al aumentar las células del folículo." },
      { letter: "D", text: "Produce células con diferente número de cromosomas." }
    ],
    correctAnswer: "C",
    explanation: "La mitosis produce células hijas iguales a la célula madre y conserva el número de cromosomas. En el folículo capilar, el aumento de células permite el crecimiento del pelo y la producción de fibras de queratina."
  }


  ,
  {
    uid: "s1-cnat-103",
    session: 1,
    block: 4,
    number: 103,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Biología: interacciones ecológicas y parasitismo",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 103",
    stem: "La malaria aviar es una enfermedad causada por parásitos del género Plasmodium y es transmitida por la picadura de zancudos a las diferentes especies de aves. A continuación, se muestra una parte del ciclo de vida de este parásito:",
    resources: [
      {
        type: "html",
        html: `
          <article class="data-card malaria-card" aria-label="Ciclo de vida del parásito Plasmodium en aves y zancudos">
            <p class="resource-title">Diagrama. Ciclo de vida del parásito de la malaria aviar</p>
            <figure class="svg-panel wide-svg-panel" aria-label="Ciclo de transmisión del parásito entre ave y zancudo">
              <svg viewBox="0 0 920 620" role="img" aria-label="Diagrama del ciclo de vida del parásito Plasmodium: transmisión al ave, infección del hígado, daño de glóbulos rojos, zancudo se alimenta de sangre infectada, reproducción en el zancudo y transmisión a otra ave">
                <defs>
                  <marker id="arrow103" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                    <path d="M0,0 L12,5 L0,10 Z" fill="#111827"></path>
                  </marker>
                  <linearGradient id="bird103" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"></stop>
                    <stop offset="100%" stop-color="#dbe4ef"></stop>
                  </linearGradient>
                  <radialGradient id="blood103" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fecaca"></stop>
                    <stop offset="100%" stop-color="#991b1b"></stop>
                  </radialGradient>
                </defs>

                <rect x="18" y="18" width="884" height="584" rx="28" fill="#ffffff" stroke="#1f2937" stroke-width="3" opacity=".97"></rect>
                <text x="460" y="58" text-anchor="middle" font-size="28" font-weight="900" fill="#111827">Parte del ciclo de vida del parásito</text>

                <!-- Flechas circulares del ciclo -->
                <path d="M245 138 C150 185, 122 306, 180 405" fill="none" stroke="#111827" stroke-width="5" marker-end="url(#arrow103)"></path>
                <path d="M222 448 C305 530, 450 524, 535 450" fill="none" stroke="#111827" stroke-width="5" marker-end="url(#arrow103)"></path>
                <path d="M585 405 C655 295, 620 170, 526 125" fill="none" stroke="#111827" stroke-width="5" marker-end="url(#arrow103)"></path>
                <path d="M555 100 C635 88, 722 118, 770 180" fill="none" stroke="#111827" stroke-width="5" marker-end="url(#arrow103)"></path>
                <path d="M792 230 C835 335, 785 470, 675 510" fill="none" stroke="#111827" stroke-width="5" marker-end="url(#arrow103)"></path>

                <!-- Ave izquierda -->
                <g transform="translate(154 155)">
                  <circle cx="90" cy="92" r="88" fill="#eef2f7" stroke="#111827" stroke-width="4"></circle>
                  <path d="M74 117 C33 99, 39 54, 79 49 C115 45, 143 74, 142 107 C142 138, 110 153, 74 117 Z" fill="url(#bird103)" stroke="#111827" stroke-width="4"></path>
                  <path d="M132 92 L169 78 L143 108 Z" fill="#fbbf24" stroke="#111827" stroke-width="3"></path>
                  <circle cx="112" cy="76" r="6" fill="#111827"></circle>
                  <path d="M75 116 L54 147 M93 122 L85 153" stroke="#111827" stroke-width="4" stroke-linecap="round"></path>
                  <path d="M67 84 C87 113, 116 118, 135 106" fill="none" stroke="#94a3b8" stroke-width="5"></path>
                </g>
                <text x="125" y="125" font-size="19" font-weight="900" fill="#111827">Reproducción del</text>
                <text x="125" y="150" font-size="19" font-weight="900" fill="#111827">parásito y desarrollo</text>
                <text x="125" y="175" font-size="19" font-weight="900" fill="#111827">de los huevos</text>
                <text x="80" y="362" font-size="19" font-weight="900" fill="#111827">Transmisión</text>
                <text x="80" y="386" font-size="19" font-weight="900" fill="#111827">del parásito</text>
                <text x="80" y="410" font-size="19" font-weight="900" fill="#111827">al ave</text>

                <!-- Hígado y sangre -->
                <g transform="translate(180 405)">
                  <circle cx="60" cy="55" r="52" fill="#f8fafc" stroke="#111827" stroke-width="4"></circle>
                  <path d="M40 38 C62 17, 101 30, 96 60 C94 84, 70 93, 44 79 C22 67, 21 51, 40 38 Z" fill="#475569" stroke="#111827" stroke-width="3"></path>
                  <text x="-35" y="126" font-size="18" font-weight="900" fill="#111827">Infección del</text>
                  <text x="-35" y="149" font-size="18" font-weight="900" fill="#111827">hígado y daño de</text>
                  <text x="-35" y="172" font-size="18" font-weight="900" fill="#111827">los glóbulos rojos</text>
                  <text x="-35" y="195" font-size="18" font-weight="900" fill="#111827">del ave</text>
                </g>

                <g transform="translate(375 405)">
                  <circle cx="78" cy="70" r="66" fill="#f8fafc" stroke="#111827" stroke-width="4"></circle>
                  <circle cx="52" cy="48" r="20" fill="url(#blood103)" stroke="#111827" stroke-width="2"></circle>
                  <circle cx="95" cy="49" r="17" fill="url(#blood103)" stroke="#111827" stroke-width="2"></circle>
                  <circle cx="74" cy="93" r="24" fill="url(#blood103)" stroke="#111827" stroke-width="2"></circle>
                  <circle cx="116" cy="86" r="13" fill="url(#blood103)" stroke="#111827" stroke-width="2"></circle>
                  <circle cx="35" cy="90" r="12" fill="url(#blood103)" stroke="#111827" stroke-width="2"></circle>
                </g>
                <text x="420" y="560" font-size="20" font-weight="900" text-anchor="middle" fill="#111827">El zancudo se alimenta de sangre infectada</text>

                <!-- Zancudo central -->
                <g transform="translate(555 275)">
                  <circle cx="0" cy="0" r="62" fill="#f8fafc" stroke="#111827" stroke-width="4"></circle>
                  <ellipse cx="3" cy="-3" rx="27" ry="13" fill="#111827"></ellipse>
                  <ellipse cx="-18" cy="-16" rx="24" ry="10" fill="#dbeafe" stroke="#111827" stroke-width="2" transform="rotate(-30 -18 -16)"></ellipse>
                  <ellipse cx="22" cy="-16" rx="24" ry="10" fill="#dbeafe" stroke="#111827" stroke-width="2" transform="rotate(30 22 -16)"></ellipse>
                  <line x1="25" y1="-4" x2="58" y2="-22" stroke="#111827" stroke-width="3"></line>
                  <line x1="-23" y1="5" x2="-50" y2="35" stroke="#111827" stroke-width="3"></line>
                  <line x1="-4" y1="10" x2="-18" y2="45" stroke="#111827" stroke-width="3"></line>
                  <line x1="18" y1="8" x2="42" y2="38" stroke="#111827" stroke-width="3"></line>
                </g>
                <text x="545" y="210" font-size="20" font-weight="900" text-anchor="middle" fill="#111827">El parásito se reproduce</text>
                <text x="545" y="235" font-size="20" font-weight="900" text-anchor="middle" fill="#111827">en el intestino</text>
                <text x="545" y="260" font-size="20" font-weight="900" text-anchor="middle" fill="#111827">del insecto sin afectar</text>
                <text x="545" y="285" font-size="20" font-weight="900" text-anchor="middle" fill="#111827">su funcionamiento</text>

                <!-- Ave derecha -->
                <g transform="translate(704 128)">
                  <circle cx="80" cy="80" r="76" fill="#eef2f7" stroke="#111827" stroke-width="4"></circle>
                  <path d="M65 105 C31 90, 37 52, 72 49 C104 46, 130 70, 128 98 C126 124, 94 137, 65 105 Z" fill="url(#bird103)" stroke="#111827" stroke-width="4"></path>
                  <path d="M118 87 L150 75 L128 101 Z" fill="#fbbf24" stroke="#111827" stroke-width="3"></path>
                  <circle cx="101" cy="73" r="5" fill="#111827"></circle>
                  <path d="M65 104 L48 132 M82 110 L75 139" stroke="#111827" stroke-width="4" stroke-linecap="round"></path>
                </g>
                <text x="737" y="97" font-size="19" font-weight="900" fill="#111827">Transmisión del</text>
                <text x="737" y="122" font-size="19" font-weight="900" fill="#111827">parásito a otra ave</text>

                <g transform="translate(706 405)">
                  <circle cx="60" cy="55" r="52" fill="#f8fafc" stroke="#111827" stroke-width="4"></circle>
                  <path d="M40 38 C62 17, 101 30, 96 60 C94 84, 70 93, 44 79 C22 67, 21 51, 40 38 Z" fill="#475569" stroke="#111827" stroke-width="3"></path>
                  <text x="5" y="136" font-size="20" font-weight="900" fill="#111827">Reinicio</text>
                  <text x="5" y="161" font-size="20" font-weight="900" fill="#111827">del ciclo</text>
                </g>
              </svg>
            </figure>
          </article>
        `
      }
    ],
    prompt: "Según el anterior diagrama, ¿qué tipo de interacción tiene el parásito con el ave y con el zancudo?",
    options: [
      { letter: "A", text: "El parásito interactúa con el ave y con el zancudo de manera negativa, al causar la enfermedad de la malaria que deriva en daños internos en los dos organismos." },
      { letter: "B", text: "El parásito interactúa con el ave de manera negativa al causar la enfermedad, mientras que con el zancudo interactúa de manera neutral, dado que convive dentro de él sin causar ningún daño." },
      { letter: "C", text: "El parásito interactúa con el ave y con el zancudo de manera neutral, ya que convive con ellos para cumplir su ciclo de vida sin causar daño a ninguno de los dos." },
      { letter: "D", text: "El parásito interactúa con el ave de manera neutral, ya que el hígado es el único órgano afectado, mientras que con el zancudo interactúa de manera negativa, dado que se reproduce dentro de él." }
    ],
    correctAnswer: "B",
    explanation: "El diagrama indica que en el ave el parásito causa infección del hígado y daño de los glóbulos rojos; por tanto, la interacción es negativa para el ave. En el zancudo, el parásito se reproduce en el intestino sin afectar su funcionamiento, por lo que la interacción descrita es neutral."
  }


  ,
  {
    uid: "s1-cnat-104",
    session: 1,
    block: 4,
    number: 104,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Química: estructura atómica e isótopos",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 104",
    stem: "Dos átomos pertenecen al mismo elemento químico cuando tienen la misma cantidad de protones. De esta forma, si dos átomos tienen la misma cantidad de protones, pero distinta cantidad de neutrones, serán isótopos. En la siguiente tabla, se representa el número de protones y neutrones para algunos átomos.",
    resources: [
      {
        type: "table",
        caption: "Número de protones y neutrones para algunos átomos",
        headers: ["Átomo", "Protones", "Neutrones"],
        rows: [
          ["N", "1", "0"],
          ["X", "2", "1"],
          ["Y", "1", "2"],
          ["Z", "2", "2"]
        ]
      }
    ],
    prompt: "Según la información suministrada, ¿cuál de las siguientes parejas de átomos son isótopos?",
    options: [
      { letter: "A", text: "N y X." },
      { letter: "B", text: "N y Y." },
      { letter: "C", text: "Y y X." },
      { letter: "D", text: "Y y Z." }
    ],
    correctAnswer: "B",
    explanation: "Los isótopos son átomos del mismo elemento, por lo tanto tienen igual número de protones, pero diferente número de neutrones. N y Y tienen 1 protón cada uno, pero N tiene 0 neutrones y Y tiene 2 neutrones. Por eso son isótopos."
  }



  ,
  {
    uid: "s1-cnat-105",
    session: 1,
    block: 4,
    number: 105,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Química: disoluciones y concentración",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 105",
    stem: "Las unidades de concentración de disoluciones indican la cantidad de soluto disuelto en una solución. Por ejemplo tenemos las siguientes unidades:",
    resources: [
      {
        type: "html",
        html: `
          <article class="data-card chemistry-card" aria-label="Unidades de concentración de disoluciones">
            <p class="resource-title">Unidades de concentración</p>
            <ul class="compact-list">
              <li><strong>% p/p:</strong> es la cantidad en gramos del soluto presente en 100 gramos de la disolución.</li>
              <li><strong>% p/v:</strong> indica el número de gramos de soluto que hay en cada 100 mL de disolución.</li>
              <li><strong>Molaridad (M):</strong> es el número de moles de soluto en 1 L de disolución.</li>
            </ul>
          </article>
        `
      },
      {
        type: "table",
        caption: "Concentraciones de dos disoluciones del mismo soluto",
        headers: ["Disolución", "Porcentaje (% p/p)", "Porcentaje (% p/v)", "Molaridad (M)"],
        rows: [
          ["1", "12", "12", "2,05"],
          ["2", "24", "24", "4,10"]
        ]
      }
    ],
    prompt: "De acuerdo con la información anterior, si se tienen dos volúmenes iguales de las disoluciones, ¿cuál de las disoluciones tiene mayor masa de soluto?",
    options: [
      { letter: "A", text: "La disolución 2, porque a mayor masa de soluto mayor es el valor de la molaridad." },
      { letter: "B", text: "La disolución 1, porque los valores de % p/p y % p/v son mayores que el valor de la molaridad." },
      { letter: "C", text: "La disolución 1, porque a mayor masa de soluto menor es el valor de la molaridad." },
      { letter: "D", text: "La disolución 2, porque los valores de % p/p y % p/v son menores que el valor de la molaridad." }
    ],
    correctAnswer: "A",
    explanation: "Para volúmenes iguales, la disolución con mayor concentración contiene más cantidad de soluto. La disolución 2 presenta valores mayores en % p/p, % p/v y molaridad; por eso tiene mayor masa de soluto."
  }


  ,
  {
    uid: "s1-cnat-106",
    session: 1,
    block: 4,
    number: 106,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Física: magnetismo y propiedades de los materiales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 106",
    stem: "Camila elabora un experimento donde acerca un imán a una jarra que tiene una esfera de hierro en su interior, y mide la velocidad que alcanza la esfera al acercar el imán usando diferentes líquidos, como se muestra en la figura.",
    resources: [
      {
        type: "html",
        html: `
          <article class="science-diagram-card" aria-label="Experimento con imán, jarra, líquido y esfera de hierro">
            <p class="resource-title">Experimento</p>
            <div style="display:grid;grid-template-columns:minmax(120px,1fr) minmax(180px,1.5fr);gap:18px;align-items:center;max-width:620px;margin:auto">
              <div style="text-align:center">
                <div style="font-weight:900;margin-bottom:8px">Imán</div>
                <svg viewBox="0 0 180 120" role="img" aria-label="Imán acercándose a la jarra" style="width:100%;max-width:190px">
                  <path d="M28 28 H118 V50 H58 V70 H118 V92 H28 V28 Z" fill="none" stroke="currentColor" stroke-width="12" stroke-linejoin="round"></path>
                  <path d="M135 42 l28 18 -28 18" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M125 50 l22 10 -22 10" fill="none" stroke="currentColor" stroke-width="4" opacity=".55" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
              <div style="text-align:center">
                <div style="font-weight:900;margin-bottom:8px">Jarra con líquido y esfera</div>
                <svg viewBox="0 0 260 210" role="img" aria-label="Jarra con líquido y esfera de hierro" style="width:100%;max-width:280px">
                  <path d="M72 35 C82 22 178 22 188 35 L174 175 C168 193 92 193 86 175 Z" fill="#eef3f8" stroke="currentColor" stroke-width="5"></path>
                  <path d="M82 82 C104 92 160 92 180 82 L171 171 C164 184 97 184 89 171 Z" fill="#cfd8e3" stroke="currentColor" stroke-width="3" opacity=".9"></path>
                  <path d="M188 72 C232 76 236 147 180 148" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"></path>
                  <circle cx="137" cy="130" r="23" fill="#ffffff" stroke="currentColor" stroke-width="5"></circle>
                  <line x1="178" y1="94" x2="228" y2="78" stroke="currentColor" stroke-width="3"></line>
                  <text x="232" y="82" font-size="15" font-weight="900">Líquido</text>
                  <line x1="155" y1="128" x2="225" y2="138" stroke="currentColor" stroke-width="3"></line>
                  <text x="230" y="143" font-size="15" font-weight="900">Esfera</text>
                  <text x="110" y="24" font-size="15" font-weight="900">Jarra</text>
                </svg>
              </div>
            </div>
          </article>
        `
      },
      {
        type: "table",
        caption: "Resultados del experimento",
        headers: ["Distancia del imán a la esfera (cm)", "Velocidad de la esfera (m/s)"],
        rows: [
          ["5", "3,0"],
          ["5", "2,0"],
          ["5", "1,0"],
          ["5", "0,6"]
        ]
      },
      {
        type: "html",
        html: `
          <article class="data-card" aria-label="Conclusión de Camila">
            <p><strong>Conclusión de Camila:</strong> los resultados de la tabla demuestran que las sustancias viscosas disminuyen la velocidad de la esfera.</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con la información anterior, ¿qué se debería modificar para apoyar de manera correcta la conclusión de Camila?",
    options: [
      { letter: "A", text: "Se deberían variar las distancias entre el imán y la jarra." },
      { letter: "B", text: "Se debería mantener siempre la misma velocidad de la esfera." },
      { letter: "C", text: "Se deberían mostrar datos del líquido usado y su viscosidad." },
      { letter: "D", text: "Se debería mantener constante la fuerza magnética." }
    ],
    correctAnswer: "C",
    explanation: "La conclusión habla de la viscosidad de las sustancias, pero la tabla solo muestra distancia y velocidad. Para apoyar correctamente esa conclusión, se deben incluir datos sobre el líquido usado y su viscosidad, de modo que pueda relacionarse esa propiedad con la velocidad de la esfera."
  }




  ,
  {
    uid: "s1-cnat-107",
    session: 1,
    block: 4,
    number: 107,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Biología: nutrición y función digestiva",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 107",
    stem: "Juan asiste al médico porque nota que está teniendo problemas de estreñimiento. El médico le enseña la siguiente tabla sobre algunos tipos de compuestos presentes en los alimentos y su función en el organismo.",
    resources: [
      {
        type: "table",
        caption: "Tipos de compuestos presentes en los alimentos y su función en el organismo",
        headers: ["Tipo de compuesto", "Función en el organismo"],
        rows: [
          ["Vitaminas", "Mantienen el buen funcionamiento del cuerpo; son esenciales para los huesos, el corazón, el cerebro, las enzimas y las hormonas."],
          ["Minerales", "Son esenciales para el metabolismo, el desarrollo, el crecimiento y la regulación del funcionamiento de las células."],
          ["Fibra insoluble", "Absorbe agua y favorece el paso de los alimentos por el tracto digestivo, y regulariza la función del intestino."],
          ["Fibra soluble", "Reduce el colesterol y la absorción de azúcares en la sangre, retarda la digestión y produce sensación de saciedad."]
        ]
      }
    ],
    prompt: "De acuerdo con la información de la tabla, ¿qué tipo de alimentos debe consumir Juan para solucionar su problema de estreñimiento?",
    options: [
      { letter: "A", text: "Alimentos ricos en vitaminas." },
      { letter: "B", text: "Alimentos ricos en minerales." },
      { letter: "C", text: "Alimentos ricos en fibra insoluble." },
      { letter: "D", text: "Alimentos ricos en fibra soluble." }
    ],
    correctAnswer: "C",
    explanation: "La fibra insoluble absorbe agua, favorece el paso de los alimentos por el tracto digestivo y regulariza la función del intestino. Por eso es la opción relacionada con la solución del estreñimiento."
  }




  ,
  {
    uid: "s1-cnat-108",
    session: 1,
    block: 4,
    number: 108,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Química: velocidad de reacción",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 108",
    stem: "Una estudiante tiene la hipótesis de que al hacer reaccionar agua oxigenada con papa criolla, entre más grande sea el trozo de papa, mayor será el tiempo que dure reaccionando con el agua oxigenada.",
    resources: [],
    prompt: "Si ella quiere representar gráficamente este fenómeno, ¿cuál de las siguientes gráficas debe elegir?",
    options: [
      {
        letter: "A",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Gráfica A">
            <p class="reaction-option-title">Gráfica A</p>
            <svg class="reaction-chart-svg" viewBox="0 0 360 260" role="img" aria-label="Gráfica de barras A con tiempos grande 30, mediana 60 y pequeña 30">
              <line x1="58" y1="205" x2="332" y2="205" stroke="currentColor" stroke-width="3"/>
              <line x1="58" y1="205" x2="58" y2="28" stroke="currentColor" stroke-width="3"/>
              <path d="M332 205 l-10 -6 v12 z" fill="currentColor"/>
              <path d="M58 28 l-6 10 h12 z" fill="currentColor"/>
              <g class="grid-lines">
                <line x1="58" y1="180" x2="330" y2="180"/><line x1="58" y1="155" x2="330" y2="155"/>
                <line x1="58" y1="130" x2="330" y2="130"/><line x1="58" y1="105" x2="330" y2="105"/>
                <line x1="58" y1="80" x2="330" y2="80"/><line x1="58" y1="55" x2="330" y2="55"/>
              </g>
              <g class="axis-labels">
                <text x="40" y="208">0</text><text x="31" y="183">10</text><text x="31" y="158">20</text><text x="31" y="133">30</text>
                <text x="31" y="108">40</text><text x="31" y="83">50</text><text x="31" y="58">60</text><text x="31" y="33">70</text>
              </g>
              <rect x="88" y="130" width="42" height="75" class="bar-dark"/><rect x="164" y="55" width="42" height="150" class="bar-dark"/><rect x="240" y="130" width="42" height="75" class="bar-dark"/>
              <text x="109" y="230" text-anchor="middle">Grande</text><text x="185" y="230" text-anchor="middle">Mediana</text><text x="261" y="230" text-anchor="middle">Pequeña</text>
              <text x="180" y="252" text-anchor="middle" class="chart-axis-title">Tamaño de papa criolla</text>
              <text x="18" y="130" transform="rotate(-90 18 130)" text-anchor="middle" class="chart-axis-title">Tiempo de reacción (s)</text>
            </svg>
          </div>
        `
      },
      {
        letter: "B",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Gráfica B">
            <p class="reaction-option-title">Gráfica B</p>
            <svg class="reaction-chart-svg pie" viewBox="0 0 360 240" role="img" aria-label="Gráfica circular B">
              <text x="180" y="24" text-anchor="middle" class="chart-axis-title">Tiempo de reacción (s)</text>
              <circle cx="150" cy="112" r="72" class="pie-light"/>
              <path d="M150 112 L150 40 A72 72 0 0 1 201 163 Z" class="pie-dark"/>
              <path d="M150 112 L201 163 A72 72 0 0 1 92 152 Z" class="pie-mid"/>
              <path d="M150 112 L92 152 A72 72 0 0 1 150 40 Z" class="pie-light-stroke"/>
              <circle cx="250" cy="82" r="7" class="pie-dark"/><text x="266" y="87">Grande</text>
              <circle cx="250" cy="112" r="7" class="pie-mid"/><text x="266" y="117">Mediana</text>
              <circle cx="250" cy="142" r="7" class="pie-light"/><text x="266" y="147">Pequeña</text>
            </svg>
          </div>
        `
      },
      {
        letter: "C",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Gráfica C">
            <p class="reaction-option-title">Gráfica C</p>
            <svg class="reaction-chart-svg" viewBox="0 0 360 260" role="img" aria-label="Gráfica de barras C con mayor tiempo para papa grande, menor para mediana y menor para pequeña">
              <line x1="58" y1="205" x2="332" y2="205" stroke="currentColor" stroke-width="3"/>
              <line x1="58" y1="205" x2="58" y2="28" stroke="currentColor" stroke-width="3"/>
              <path d="M332 205 l-10 -6 v12 z" fill="currentColor"/>
              <path d="M58 28 l-6 10 h12 z" fill="currentColor"/>
              <g class="grid-lines">
                <line x1="58" y1="180" x2="330" y2="180"/><line x1="58" y1="155" x2="330" y2="155"/>
                <line x1="58" y1="130" x2="330" y2="130"/><line x1="58" y1="105" x2="330" y2="105"/>
                <line x1="58" y1="80" x2="330" y2="80"/><line x1="58" y1="55" x2="330" y2="55"/>
              </g>
              <g class="axis-labels">
                <text x="40" y="208">0</text><text x="31" y="183">20</text><text x="31" y="158">40</text><text x="31" y="133">60</text>
                <text x="31" y="108">80</text><text x="25" y="83">100</text><text x="25" y="58">120</text><text x="25" y="33">140</text>
              </g>
              <rect x="88" y="55" width="42" height="150" class="bar-dark"/><rect x="164" y="130" width="42" height="75" class="bar-mid"/><rect x="240" y="168" width="42" height="37" class="bar-light"/>
              <text x="109" y="230" text-anchor="middle">Grande</text><text x="185" y="230" text-anchor="middle">Mediana</text><text x="261" y="230" text-anchor="middle">Pequeña</text>
              <text x="180" y="252" text-anchor="middle" class="chart-axis-title">Tamaño de papa criolla</text>
              <text x="18" y="130" transform="rotate(-90 18 130)" text-anchor="middle" class="chart-axis-title">Tiempo de reacción (s)</text>
            </svg>
          </div>
        `
      },
      {
        letter: "D",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Gráfica D">
            <p class="reaction-option-title">Gráfica D</p>
            <svg class="reaction-chart-svg pie" viewBox="0 0 360 240" role="img" aria-label="Gráfica circular D">
              <text x="180" y="24" text-anchor="middle" class="chart-axis-title">Tiempo de reacción (s)</text>
              <circle cx="150" cy="112" r="72" class="pie-light"/>
              <path d="M150 112 L150 40 A72 72 0 0 1 222 112 Z" class="pie-dark"/>
              <path d="M150 112 L222 112 A72 72 0 0 1 150 184 L78 112 Z" class="pie-mid"/>
              <path d="M150 112 L78 112 A72 72 0 0 1 150 40 Z" class="pie-light-stroke"/>
              <circle cx="250" cy="82" r="7" class="pie-dark"/><text x="266" y="87">Grande</text>
              <circle cx="250" cy="112" r="7" class="pie-mid"/><text x="266" y="117">Mediana</text>
              <circle cx="250" cy="142" r="7" class="pie-light"/><text x="266" y="147">Pequeña</text>
            </svg>
          </div>
        `
      }
    ],
    correctAnswer: "C",
    explanation: "La hipótesis plantea una relación directa: a mayor tamaño del trozo de papa criolla, mayor tiempo de reacción. La gráfica C representa esa tendencia, porque el tiempo es mayor para el trozo grande, intermedio para el mediano y menor para el pequeño."
  }

  ,
  {
    uid: "s1-cn-109",
    session: 1,
    block: 4,
    number: 109,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Física: transferencia de energía y propiedades de materiales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 109",
    stem: `Para el reciclaje de los neumáticos usados, se está implementando un proceso llamado “trituración criogénica”. Este proceso consiste en depositar trozos de neumáticos en un recipiente; posteriormente, se hacen pasar por un túnel de enfriamiento, donde el caucho se pone en contacto con nitrógeno líquido, que está a una temperatura aproximada de -200 °C. Al extraer energía del caucho y llevarlo a temperaturas menores a -70 °C, este se vuelve muy frágil y susceptible de quebrarse con golpes. En último lugar, el caucho se pasa por un molino de martillos en el que se tritura y se pulveriza.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading cryo-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 109 A 111 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Para reciclar neumáticos usados se emplea un proceso llamado <strong>trituración criogénica</strong>. Primero, los trozos de neumático se depositan en un recipiente. Luego pasan por un túnel de enfriamiento donde entran en contacto con <strong>nitrógeno líquido</strong>, a una temperatura aproximada de <strong>-200 °C</strong>.</p>
            <p>El enfriamiento extrae energía del caucho hasta llevarlo a temperaturas menores a <strong>-70 °C</strong>. En estas condiciones, el caucho se vuelve frágil y puede quebrarse con golpes. Finalmente, pasa por un molino de martillos, donde se tritura y se pulveriza.</p>
            <svg viewBox="0 0 920 390" class="diagram-svg cryo-diagram" role="img" aria-label="Proceso de trituración criogénica de neumáticos">
              <defs>
                <marker id="arrow-cryo-109" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"></path></marker>
                <linearGradient id="cryo-tank" x1="0" x2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".10"></stop><stop offset=".5" stop-color="currentColor" stop-opacity=".35"></stop><stop offset="1" stop-color="currentColor" stop-opacity=".10"></stop></linearGradient>
              </defs>
              <text x="30" y="36" font-size="18" font-weight="900">1. Recipiente de neumáticos</text>
              <path d="M70 70 L190 70 L165 210 L95 210 Z" fill="rgba(0,0,0,.08)" stroke="currentColor" stroke-width="3"></path>
              <g fill="currentColor" opacity=".75">
                <circle cx="94" cy="62" r="10"></circle><circle cx="118" cy="58" r="11"></circle><circle cx="144" cy="60" r="10"></circle><circle cx="166" cy="62" r="9"></circle><circle cx="132" cy="43" r="9"></circle>
              </g>
              <rect x="85" y="210" width="95" height="24" rx="6" fill="rgba(0,0,0,.08)" stroke="currentColor" stroke-width="3"></rect>
              <text x="88" y="256" font-size="15" font-weight="800">Trozos de caucho</text>

              <text x="310" y="36" font-size="18" font-weight="900">2. Túnel de enfriamiento</text>
              <rect x="260" y="105" width="350" height="105" rx="12" fill="rgba(0,0,0,.06)" stroke="currentColor" stroke-width="4"></rect>
              <line x1="280" y1="157" x2="588" y2="157" stroke="currentColor" stroke-width="12" opacity=".18"></line>
              <g stroke="currentColor" stroke-width="4" opacity=".85">
                <line x1="292" y1="118" x2="318" y2="196"></line><line x1="330" y1="118" x2="356" y2="196"></line><line x1="368" y1="118" x2="394" y2="196"></line><line x1="406" y1="118" x2="432" y2="196"></line><line x1="444" y1="118" x2="470" y2="196"></line><line x1="482" y1="118" x2="508" y2="196"></line><line x1="520" y1="118" x2="546" y2="196"></line><line x1="558" y1="118" x2="584" y2="196"></line>
              </g>
              <path d="M185 222 C214 226 230 170 258 165" fill="none" stroke="currentColor" stroke-width="5" marker-end="url(#arrow-cryo-109)"></path>
              <path d="M285 88 C392 62 500 62 608 88" fill="none" stroke="currentColor" stroke-width="4" marker-end="url(#arrow-cryo-109)"></path>
              <text x="350" y="83" font-size="15" font-weight="800">Contacto con nitrógeno líquido</text>

              <text x="682" y="36" font-size="18" font-weight="900">3. Nitrógeno líquido</text>
              <rect x="700" y="65" width="115" height="190" rx="50" fill="url(#cryo-tank)" stroke="currentColor" stroke-width="4"></rect>
              <text x="713" y="168" font-size="17" font-weight="900">Nitrógeno</text>
              <text x="735" y="190" font-size="17" font-weight="900">líquido</text>
              <path d="M700 225 C650 226 642 186 612 174" fill="none" stroke="currentColor" stroke-width="5" marker-end="url(#arrow-cryo-109)"></path>
              <path d="M610 120 C652 122 660 90 700 88" fill="none" stroke="currentColor" stroke-width="4" marker-end="url(#arrow-cryo-109)"></path>

              <text x="442" y="296" font-size="18" font-weight="900">4. Molino de martillos</text>
              <path d="M530 210 C532 240 524 252 500 270" fill="none" stroke="currentColor" stroke-width="5" marker-end="url(#arrow-cryo-109)"></path>
              <rect x="440" y="270" width="140" height="76" rx="12" fill="rgba(0,0,0,.08)" stroke="currentColor" stroke-width="4"></rect>
              <rect x="475" y="292" width="18" height="38" fill="currentColor" opacity=".35"></rect><rect x="520" y="292" width="18" height="38" fill="currentColor" opacity=".35"></rect>
              <text x="472" y="360" font-size="15" font-weight="800">Tritura y pulveriza</text>
              <g fill="currentColor" opacity=".8">
                <circle cx="608" cy="300" r="4"></circle><circle cx="620" cy="310" r="3"></circle><circle cx="632" cy="319" r="4"></circle><circle cx="645" cy="306" r="3"></circle><circle cx="658" cy="314" r="3"></circle>
              </g>
              <path d="M590 310 C640 318 675 318 720 300" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="4 6" marker-end="url(#arrow-cryo-109)"></path>
              <path d="M720 305 L820 305 L800 355 L740 355 Z" fill="rgba(0,0,0,.12)" stroke="currentColor" stroke-width="3"></path>
              <text x="724" y="378" font-size="15" font-weight="900">Caucho pulverizado</text>
            </svg>
          </article>
        `
      }
    ],
    prompt: "Se supone que si el túnel de enfriamiento deja de funcionar se puede continuar con el proceso de trituración. Sin embargo, se debe considerar que el caucho a temperatura ambiente requiere de otras condiciones para ser triturado. ¿Qué puede cambiarse en el proceso para continuar con la trituración?",
    options: [
      { letter: "A", text: "Emplear recipientes de mayor volumen para contener el caucho." },
      { letter: "B", text: "Utilizar agua a temperatura ambiente en lugar de nitrógeno." },
      { letter: "C", text: "Utilizar un molino con mayor fuerza de trituración." },
      { letter: "D", text: "Emplear mayor cantidad de nitrógeno en estado líquido." }
    ],
    correctAnswer: "C",
    explanation: "En el proceso criogénico, el enfriamiento vuelve frágil el caucho y facilita que se quiebre. Si el túnel de enfriamiento no funciona, el caucho permanece menos frágil a temperatura ambiente; por tanto, se necesitaría aumentar la fuerza mecánica de trituración. La respuesta correcta es C."
  }

  ,
  {
    uid: "s1-cn-110",
    session: 1,
    block: 4,
    number: 110,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Propiedades de materiales y procesos industriales",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 110",
    stem: `La trituración simple es otro proceso que muele los neumáticos utilizando únicamente molinos; sin embargo, si se desean granos del tamaño de la trituración criogénica, se debe pasar el caucho varias veces por los molinos.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading">
            <div class="reading-instruction">Contexto: trituración criogénica</div>
            <p>En la trituración criogénica, el caucho se enfría con nitrógeno líquido hasta temperaturas menores a -70 °C. Así se vuelve frágil y se rompe con mayor facilidad al pasar por el molino de martillos.</p>
            <p>En la trituración simple, que usa solo molinos, el caucho debe pasar varias veces por los molinos para alcanzar granos del mismo tamaño.</p>
          </article>
        `
      }
    ],
    prompt: "Al respecto, ¿qué beneficio presenta la trituración criogénica con relación a la trituración simple?",
    options: [
      { letter: "A", text: "Tritura con mayor rapidez a bajas temperaturas." },
      { letter: "B", text: "Tritura sin generar gastos energéticos." },
      { letter: "C", text: "Tritura con mayor fuerza que a temperatura ambiente." },
      { letter: "D", text: "Tritura sin generar ningún impacto ambiental." }
    ],
    correctAnswer: "A",
    explanation: "Al enfriar el caucho, este se vuelve frágil y se rompe con facilidad. Por eso la trituración criogénica permite obtener granos pequeños con mayor rapidez que la trituración simple. La respuesta correcta es A."
  }

  ,
  {
    uid: "s1-cn-111",
    session: 1,
    block: 4,
    number: 111,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Termodinámica: transferencia de energía térmica",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 111",
    stem: `En el túnel de enfriamiento de la trituración criogénica, el caucho entra en contacto con nitrógeno líquido a una temperatura aproximada de -200 °C. Este contacto permite que el caucho alcance temperaturas menores a -70 °C.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading">
            <div class="reading-instruction">Contexto: transferencia de energía</div>
            <p>El nitrógeno líquido está a una temperatura mucho menor que la del caucho. Al entrar en contacto, el caucho pierde energía térmica, se enfría y se vuelve frágil.</p>
          </article>
        `
      }
    ],
    prompt: "¿Qué ocurre con la energía interna del caucho en el túnel de enfriamiento?",
    options: [
      { letter: "A", text: "Se convierte en química al contacto con el nitrógeno." },
      { letter: "B", text: "Permanece sin cambios hasta que llega al molino." },
      { letter: "C", text: "Se transfiere al nitrógeno en forma de calor." },
      { letter: "D", text: "Se convierte en mecánica para mover el molino." }
    ],
    correctAnswer: "C",
    explanation: "Como el nitrógeno líquido está mucho más frío que el caucho, el caucho pierde energía térmica durante el enfriamiento. Esa energía se transfiere al nitrógeno en forma de calor. La respuesta correcta es C."
  }





  ,
  {
    uid: "s1-cn-112",
    session: 1,
    block: 4,
    number: 112,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Termodinámica: gases ideales",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 112",
    stem: `La siguiente gráfica muestra cómo varía la temperatura y el volumen de un gas ideal a presión constante.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card science-reading">
            <div class="reading-instruction">Con presión constante</div>
            <svg viewBox="0 0 520 330" role="img" aria-label="Gráfica de volumen contra temperatura con presión constante" style="width:100%;max-width:560px;display:block;margin:0 auto;overflow:visible">
              <defs>
                <marker id="arrow-gas-112" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="currentColor"></path>
                </marker>
              </defs>
              <rect x="24" y="18" width="472" height="286" rx="22" fill="rgba(0,0,0,.035)" stroke="currentColor" opacity=".12"></rect>
              <text x="260" y="48" text-anchor="middle" font-size="25" font-weight="900">Con presión constante</text>
              <line x1="105" y1="260" x2="430" y2="260" stroke="currentColor" stroke-width="4" marker-end="url(#arrow-gas-112)"></line>
              <line x1="105" y1="260" x2="105" y2="78" stroke="currentColor" stroke-width="4" marker-end="url(#arrow-gas-112)"></line>
              <line x1="112" y1="252" x2="372" y2="92" stroke="currentColor" stroke-width="6" stroke-linecap="round"></line>
              <line x1="120" y1="185" x2="265" y2="185" stroke="currentColor" stroke-width="2" stroke-dasharray="7 8" opacity=".28"></line>
              <line x1="265" y1="185" x2="265" y2="255" stroke="currentColor" stroke-width="2" stroke-dasharray="7 8" opacity=".28"></line>
              <text x="265" y="308" text-anchor="middle" font-size="18" font-weight="900">Temperatura</text>
              <text x="54" y="174" text-anchor="middle" transform="rotate(-90 54 174)" font-size="18" font-weight="900">Volumen</text>
            </svg>
            <p>Un estudiante tiene un gas ideal en un recipiente cerrado de paredes flexibles sobre el cual se aplica una presión externa constante de 1 atm.</p>
          </article>
        `
      }
    ],
    prompt: "¿Qué pasará si hay un aumento en su temperatura?",
    options: [
      { letter: "A", text: "Aumentará la presión del gas, ya que se eleva la presión externa." },
      { letter: "B", text: "Disminuirá la presión del gas, ya que se eleva la cantidad de choques entre sus partículas." },
      { letter: "C", text: "Aumentará el volumen del gas, ya que se eleva la cantidad de choques entre sus partículas." },
      { letter: "D", text: "Disminuirá el volumen del gas, ya que se eleva la presión externa." }
    ],
    correctAnswer: "C",
    explanation: "A presión constante, un aumento de temperatura hace que las partículas del gas se muevan con mayor energía y choquen más. Como el recipiente tiene paredes flexibles, el gas puede expandirse; por eso aumenta su volumen y la presión se mantiene constante. La respuesta correcta es C."
  }


  ,
  {
    uid: "s1-cn-113",
    session: 1,
    block: 4,
    number: 113,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Procesos biológicos: ciclo de vida y metamorfosis",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 113",
    stem: `La metamorfosis en los insectos puede seguir uno de los dos modelos descritos a continuación:`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading science-reading metamorphosis-card">
            <div class="reading-instruction">Modelos de metamorfosis en insectos</div>
            <ul>
              <li><strong>Modelo 1 de crecimiento gradual:</strong> el insecto, en sus primeras etapas de vida, es muy similar a los adultos.</li>
              <li><strong>Modelo 2 con transformaciones bruscas:</strong> las larvas son diferentes a los adultos y existe una fase intermedia o pupa entre la larva y el adulto.</li>
            </ul>

            <div class="model-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin-top:16px">
              <section class="mini-model" style="border:1px solid rgba(15,23,42,.15);border-radius:18px;padding:14px;background:rgba(255,255,255,.7)">
                <h4 style="margin:0 0 10px;text-align:center">Modelo 1</h4>
                <svg viewBox="0 0 260 330" role="img" aria-label="Modelo 1 de metamorfosis gradual" style="width:100%;height:auto;display:block">
                  <defs>
                    <marker id="arrow-m113-a" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="currentColor"></path>
                    </marker>
                  </defs>
                  <rect x="14" y="12" width="232" height="300" rx="20" fill="rgba(34,197,94,.08)" stroke="currentColor" opacity=".18"></rect>
                  <ellipse cx="130" cy="50" rx="32" ry="13" fill="none" stroke="currentColor" stroke-width="4"></ellipse>
                  <text x="130" y="84" text-anchor="middle" font-size="16" font-weight="800">Huevo</text>
                  <line x1="130" y1="96" x2="130" y2="126" stroke="currentColor" stroke-width="3" marker-end="url(#arrow-m113-a)"></line>
                  <g transform="translate(70 132)">
                    <ellipse cx="46" cy="38" rx="44" ry="20" fill="rgba(15,23,42,.14)" stroke="currentColor" stroke-width="3"></ellipse>
                    <line x1="4" y1="45" x2="-22" y2="62" stroke="currentColor" stroke-width="3"></line>
                    <line x1="28" y1="54" x2="14" y2="75" stroke="currentColor" stroke-width="3"></line>
                    <line x1="70" y1="54" x2="84" y2="75" stroke="currentColor" stroke-width="3"></line>
                    <line x1="90" y1="45" x2="116" y2="62" stroke="currentColor" stroke-width="3"></line>
                    <circle cx="92" cy="31" r="10" fill="rgba(15,23,42,.18)" stroke="currentColor" stroke-width="3"></circle>
                  </g>
                  <text x="194" y="163" font-size="14" font-weight="800">Ausencia</text>
                  <text x="194" y="181" font-size="14" font-weight="800">de alas</text>
                  <line x1="130" y1="214" x2="130" y2="238" stroke="currentColor" stroke-width="3" marker-end="url(#arrow-m113-a)"></line>
                  <g transform="translate(62 242)">
                    <ellipse cx="52" cy="32" rx="48" ry="18" fill="rgba(15,23,42,.14)" stroke="currentColor" stroke-width="3"></ellipse>
                    <path d="M42 20 C22 -2 2 0 -2 26 C15 24 32 25 47 33" fill="rgba(15,23,42,.10)" stroke="currentColor" stroke-width="3"></path>
                    <path d="M58 20 C82 -2 108 3 112 31 C93 27 75 27 58 34" fill="rgba(15,23,42,.10)" stroke="currentColor" stroke-width="3"></path>
                    <line x1="10" y1="40" x2="-10" y2="62" stroke="currentColor" stroke-width="3"></line>
                    <line x1="48" y1="48" x2="36" y2="71" stroke="currentColor" stroke-width="3"></line>
                    <line x1="80" y1="48" x2="94" y2="71" stroke="currentColor" stroke-width="3"></line>
                    <circle cx="100" cy="26" r="10" fill="rgba(15,23,42,.18)" stroke="currentColor" stroke-width="3"></circle>
                  </g>
                  <text x="194" y="260" font-size="14" font-weight="800">Presencia</text>
                  <text x="194" y="278" font-size="14" font-weight="800">de alas</text>
                </svg>
              </section>

              <section class="mini-model" style="border:1px solid rgba(15,23,42,.15);border-radius:18px;padding:14px;background:rgba(255,255,255,.7)">
                <h4 style="margin:0 0 10px;text-align:center">Modelo 2</h4>
                <svg viewBox="0 0 260 330" role="img" aria-label="Modelo 2 con huevo, larva, pupa y adulto" style="width:100%;height:auto;display:block">
                  <defs>
                    <marker id="arrow-m113-b" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="currentColor"></path>
                    </marker>
                  </defs>
                  <rect x="14" y="12" width="232" height="300" rx="20" fill="rgba(59,130,246,.08)" stroke="currentColor" opacity=".18"></rect>
                  <ellipse cx="130" cy="42" rx="24" ry="12" fill="none" stroke="currentColor" stroke-width="4"></ellipse>
                  <text x="130" y="70" text-anchor="middle" font-size="16" font-weight="800">Huevo</text>
                  <line x1="130" y1="82" x2="130" y2="107" stroke="currentColor" stroke-width="3" marker-end="url(#arrow-m113-b)"></line>
                  <g transform="translate(70 112)">
                    <path d="M10 40 C24 10, 55 12, 72 35 C91 59, 116 48, 125 28" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round"></path>
                    <circle cx="29" cy="28" r="4" fill="currentColor"></circle>
                    <circle cx="49" cy="27" r="4" fill="currentColor"></circle>
                    <circle cx="68" cy="36" r="4" fill="currentColor"></circle>
                  </g>
                  <text x="190" y="144" font-size="16" font-weight="800">Larva</text>
                  <line x1="130" y1="168" x2="130" y2="193" stroke="currentColor" stroke-width="3" marker-end="url(#arrow-m113-b)"></line>
                  <g transform="translate(98 198)">
                    <path d="M32 5 C62 28, 55 70, 28 88 C8 67, 5 30, 32 5Z" fill="rgba(15,23,42,.16)" stroke="currentColor" stroke-width="4"></path>
                    <line x1="32" y1="16" x2="28" y2="78" stroke="currentColor" stroke-width="3" opacity=".45"></line>
                  </g>
                  <text x="188" y="236" font-size="16" font-weight="800">Pupa</text>
                  <line x1="130" y1="290" x2="130" y2="303" stroke="currentColor" stroke-width="3" marker-end="url(#arrow-m113-b)"></line>
                </svg>
              </section>
            </div>

            <div class="reading-instruction" style="margin-top:18px">Ciclo de vida observado: mariposa</div>
            <svg viewBox="0 0 760 250" role="img" aria-label="Ciclo de vida de la mariposa: huevo, larva, pupa y adulto" style="width:100%;max-width:820px;display:block;margin:0 auto;overflow:visible">
              <defs>
                <marker id="arrow-cycle-113" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="currentColor"></path>
                </marker>
              </defs>
              <path d="M60 50 C200 20 390 20 700 52" stroke="currentColor" stroke-width="8" stroke-linecap="round" fill="none" opacity=".65"></path>
              <g transform="translate(80 92)">
                <ellipse cx="0" cy="0" rx="18" ry="11" fill="rgba(15,23,42,.12)" stroke="currentColor" stroke-width="3"></ellipse>
                <ellipse cx="28" cy="-3" rx="18" ry="11" fill="rgba(15,23,42,.12)" stroke="currentColor" stroke-width="3"></ellipse>
                <text x="14" y="52" text-anchor="middle" font-size="18" font-weight="900">Huevos</text>
              </g>
              <line x1="145" y1="100" x2="220" y2="100" stroke="currentColor" stroke-width="3" marker-end="url(#arrow-cycle-113)"></line>
              <g transform="translate(232 82)">
                <path d="M0 45 C28 0, 82 10, 108 45 C85 66, 25 70, 0 45Z" fill="rgba(15,23,42,.12)" stroke="currentColor" stroke-width="4"></path>
                <circle cx="25" cy="38" r="5" fill="currentColor"></circle><circle cx="48" cy="34" r="5" fill="currentColor"></circle><circle cx="70" cy="38" r="5" fill="currentColor"></circle>
                <text x="54" y="96" text-anchor="middle" font-size="18" font-weight="900">Larva</text>
              </g>
              <line x1="360" y1="100" x2="435" y2="100" stroke="currentColor" stroke-width="3" marker-end="url(#arrow-cycle-113)"></line>
              <g transform="translate(455 64)">
                <path d="M36 10 C78 40, 68 104, 30 128 C-5 96,-6 36,36 10Z" fill="rgba(15,23,42,.16)" stroke="currentColor" stroke-width="5"></path>
                <line x1="36" y1="24" x2="30" y2="112" stroke="currentColor" stroke-width="3" opacity=".45"></line>
                <text x="35" y="166" text-anchor="middle" font-size="18" font-weight="900">Pupa</text>
              </g>
              <line x1="545" y1="100" x2="610" y2="100" stroke="currentColor" stroke-width="3" marker-end="url(#arrow-cycle-113)"></line>
              <g transform="translate(635 92)">
                <ellipse cx="-32" cy="0" rx="40" ry="58" fill="rgba(15,23,42,.12)" stroke="currentColor" stroke-width="4" transform="rotate(-28 -32 0)"></ellipse>
                <ellipse cx="32" cy="0" rx="40" ry="58" fill="rgba(15,23,42,.12)" stroke="currentColor" stroke-width="4" transform="rotate(28 32 0)"></ellipse>
                <rect x="-6" y="-45" width="12" height="92" rx="6" fill="currentColor" opacity=".72"></rect>
                <line x1="-4" y1="-48" x2="-34" y2="-72" stroke="currentColor" stroke-width="4" stroke-linecap="round"></line>
                <line x1="4" y1="-48" x2="34" y2="-72" stroke="currentColor" stroke-width="4" stroke-linecap="round"></line>
                <text x="0" y="92" text-anchor="middle" font-size="18" font-weight="900">Adulto</text>
              </g>
            </svg>
          </article>
        `
      }
    ],
    prompt: "¿A qué modelo pertenece el tipo de metamorfosis que tienen las mariposas?",
    options: [
      { letter: "A", text: "Al modelo 1, porque la mariposa mantiene su forma en todas las etapas del ciclo de vida." },
      { letter: "B", text: "Al modelo 2, porque en el ciclo de vida de la mariposa existen transformaciones drásticas." },
      { letter: "C", text: "Al modelo 1, porque las alas de la mariposa aparecen en estadios intermedios." },
      { letter: "D", text: "Al modelo 2, porque el ciclo de vida de la mariposa inicia con la fase de huevo." }
    ],
    correctAnswer: "B",
    explanation: "La mariposa pasa por huevo, larva, pupa y adulto. Como la larva es muy diferente al adulto y existe una fase intermedia de pupa, corresponde al modelo 2 de transformaciones bruscas. La respuesta correcta es B."
  }


  ,
  {
    uid: "s1-cn-114",
    session: 1,
    block: 4,
    number: 114,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Ecología: rangos de tolerancia en condiciones ambientales",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 114",
    stem: `El tetra cardenal (Paracheirodon axelrodi) es un pez común en los acuarios de las casas, muy llamativo por su cuerpo colorido y alargado. Estos peces requieren acuarios con condiciones de temperatura, pH y concentraciones de amoníaco y nitritos muy específicas.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card science-reading">
            <div class="reading-instruction">Tolerancia del tetra cardenal: niveles máximos y mínimos</div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Temperatura mínima</th>
                    <th>Temperatura máxima</th>
                    <th>pH ácido</th>
                    <th>pH alcalino</th>
                    <th>Amoníaco máximo</th>
                    <th>Nitrito máximo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>19,6 °C</td>
                    <td>33,7 °C</td>
                    <td>2,9</td>
                    <td>8,8</td>
                    <td>23,7 mg/L</td>
                    <td>1,1 mg/L</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Mario tiene en su casa un acuario con varios peces y, al limpiarlo, no enjuagó bien el detergente y dejó residuos. Las condiciones del agua del acuario se afectaron y se llegó a una temperatura de <strong>22,4 °C</strong>, un <strong>pH de 10,4</strong> y concentraciones de <strong>25,8 mg/L</strong> y <strong>0,9 mg/L</strong> de amoníaco y nitritos, respectivamente.</p>
          </article>
        `
      }
    ],
    prompt: "En consecuencia, ¿qué le sucederá a los peces en estas nuevas condiciones?",
    options: [
      { letter: "A", text: "Los peces sobrevivirán porque la temperatura y el nivel de nitritos no superan los rangos de tolerancia de esta especie." },
      { letter: "B", text: "Los peces no sobrevivirán, porque los niveles de pH y nitritos superan los rangos de tolerancia de esta especie." },
      { letter: "C", text: "Los peces sobrevivirán, porque la temperatura y el nivel de amoníaco no superan los rangos de tolerancia de esta especie." },
      { letter: "D", text: "Los peces no sobrevivirán, porque los niveles de pH y amoníaco superan los rangos de tolerancia de esta especie." }
    ],
    correctAnswer: "D",
    explanation: "La temperatura de 22,4 °C está dentro del rango permitido y los nitritos, con 0,9 mg/L, no superan el máximo de 1,1 mg/L. Sin embargo, el pH de 10,4 supera el máximo alcalino de 8,8 y el amoníaco de 25,8 mg/L supera el máximo de 23,7 mg/L. Por eso los peces no sobrevivirán. La respuesta correcta es D."
  }


  ,
  {
    uid: "s1-cn-115",
    session: 1,
    block: 4,
    number: 115,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Física: propagación e intensidad con la distancia",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 115",
    stem: `Un jardinero utiliza un rociador y observa que, a medida que aumenta la distancia, la intensidad de gotas de agua que llega a los cuerpos disminuye. Por ejemplo, a los 2 m de distancia la intensidad será de 1/4 mm, como se muestra en la imagen.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card science-reading">
            <div class="reading-instruction">Disminución de la intensidad de gotas con la distancia</div>
            <div class="science-figure-scroll">
              <svg viewBox="0 0 760 330" role="img" aria-label="Rociador que dispersa gotas en arcos de 1 a 5 metros">
                <defs>
                  <marker id="arrow115" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="currentColor"></path>
                  </marker>
                  <linearGradient id="spray115" x1="0" x2="1">
                    <stop offset="0" stop-color="#7dd3fc" stop-opacity=".38"></stop>
                    <stop offset="1" stop-color="#7dd3fc" stop-opacity=".05"></stop>
                  </linearGradient>
                </defs>
                <rect x="14" y="18" width="110" height="145" rx="20" fill="#e5e7eb" stroke="currentColor" stroke-width="4"></rect>
                <rect x="42" y="42" width="54" height="72" rx="12" fill="#f8fafc" stroke="currentColor" stroke-width="3"></rect>
                <text x="69" y="196" text-anchor="middle" font-size="20" font-weight="900">Rociador</text>
                <path d="M116 88 C270 18 485 18 735 78 L735 250 C485 310 270 310 116 240 Z" fill="url(#spray115)" stroke="currentColor" stroke-width="3"></path>
                <line x1="116" y1="88" x2="735" y2="78" stroke="currentColor" stroke-width="4"></line>
                <line x1="116" y1="240" x2="735" y2="250" stroke="currentColor" stroke-width="4"></line>
                <path d="M220 70 C200 120 200 208 220 258" fill="none" stroke="currentColor" stroke-width="4"></path>
                <path d="M340 53 C310 120 310 211 340 278" fill="none" stroke="currentColor" stroke-width="4"></path>
                <path d="M475 44 C440 118 440 214 475 288" fill="none" stroke="currentColor" stroke-width="4"></path>
                <path d="M625 48 C585 116 585 216 625 285" fill="none" stroke="currentColor" stroke-width="4"></path>
                <path d="M116 165 L220 166" stroke="currentColor" stroke-width="2" stroke-dasharray="7 8" marker-end="url(#arrow115)"></path>
                <path d="M116 151 L340 138" stroke="currentColor" stroke-width="2" stroke-dasharray="7 8" marker-end="url(#arrow115)"></path>
                <path d="M116 179 L475 215" stroke="currentColor" stroke-width="2" stroke-dasharray="7 8" marker-end="url(#arrow115)"></path>
                <path d="M116 200 L625 264" stroke="currentColor" stroke-width="2" stroke-dasharray="7 8" marker-end="url(#arrow115)"></path>
                <text x="176" y="142" font-size="22" font-weight="900">1 m</text>
                <text x="270" y="112" font-size="22" font-weight="900">2 m</text>
                <text x="382" y="198" font-size="22" font-weight="900">3 m</text>
                <text x="530" y="249" font-size="22" font-weight="900">4 m</text>
                <text x="665" y="285" font-size="22" font-weight="900">5 m</text>
                <g fill="currentColor" opacity=".72">
                  <circle cx="225" cy="135" r="7"></circle><circle cx="229" cy="170" r="6"></circle><circle cx="222" cy="208" r="7"></circle>
                  <circle cx="345" cy="122" r="5"></circle><circle cx="350" cy="165" r="5"></circle><circle cx="344" cy="211" r="5"></circle>
                  <circle cx="482" cy="132" r="4"></circle><circle cx="488" cy="180" r="4"></circle><circle cx="480" cy="226" r="4"></circle>
                  <circle cx="630" cy="132" r="3"></circle><circle cx="636" cy="179" r="3"></circle><circle cx="628" cy="231" r="3"></circle>
                  <circle cx="708" cy="156" r="2.5"></circle><circle cx="712" cy="214" r="2.5"></circle>
                </g>
              </svg>
            </div>
            <p class="footer-note">La intensidad disminuye al alejarse del rociador; a 2 m se indica una intensidad de 1/4 mm.</p>
          </article>
        `
      }
    ],
    prompt: "Teniendo en cuenta la información anterior, ¿cómo debe ser la intensidad de gotas a los 5 m de distancia?",
    options: [
      { letter: "A", text: "Menor, porque la cantidad de gotas de agua siempre es igual al aumentar la distancia." },
      { letter: "B", text: "Mayor, porque las gotas de agua al aumentar la distancia son cada vez más grandes." },
      { letter: "C", text: "Menor, porque la intensidad es inversamente proporcional al cuadrado de la distancia." },
      { letter: "D", text: "Mayor, porque la intensidad es directamente proporcional al cuadrado de la distancia." }
    ],
    correctAnswer: "C",
    explanation: "Al aumentar la distancia al rociador, la misma cantidad de agua se distribuye sobre una región cada vez mayor. Por eso la intensidad que llega a un punto disminuye; según el modelo planteado, disminuye de forma inversamente proporcional al cuadrado de la distancia. A 5 m debe ser menor. La respuesta correcta es C."
  }


  ,
  {
    uid: "s1-cn-116",
    session: 1,
    block: 4,
    number: 116,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Química: solubilidad y mezclas",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 116",
    stem: `En una práctica de laboratorio, el profesor afirma que el agua y el aceite no se mezclan y pregunta: ¿el alcohol y el aceite se mezclan? Para responder la pregunta solicita que mezclen las dos sustancias. Un estudiante escribe como hipótesis que estos dos líquidos se mezclan formando una solución homogénea; luego, vierte los dos líquidos en un recipiente, los agita y, pasados unos minutos, observa que se forman dos capas: en el fondo se encuentra el aceite y en la capa superior está el alcohol.`,
    prompt: "Al analizar los resultados, ¿será válida la hipótesis del estudiante y qué conclusión se puede dar?",
    options: [
      { letter: "A", text: "La hipótesis es válida y se concluye que los resultados obtenidos se dieron debido a que estas sustancias no se mezclaron." },
      { letter: "B", text: "La hipótesis es válida y se concluye que el alcohol tiene enlaces que impiden que se forme una mezcla heterogénea con el aceite." },
      { letter: "C", text: "La hipótesis es falsa y se concluye que la mezcla obtenida luego de agitar las dos sustancias es de carácter homogéneo." },
      { letter: "D", text: "La hipótesis es falsa y se concluye que el alcohol no se disuelve en el aceite, por lo que se obtiene una mezcla heterogénea." }
    ],
    correctAnswer: "D",
    explanation: "La hipótesis del estudiante indicaba que el alcohol y el aceite formarían una solución homogénea. Sin embargo, al observar dos capas separadas, se evidencia que las sustancias no se mezclaron de manera uniforme. Por tanto, la hipótesis es falsa y la mezcla obtenida es heterogénea. La respuesta correcta es D."
  }



  ,
  {
    uid: "s1-cnat-117",
    session: 1,
    block: 4,
    number: 117,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Biología: crecimiento bacteriano y representación de datos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 117",
    stem: `Un estudiante realizó un experimento para analizar el crecimiento de un grupo de bacterias durante un periodo de 14 horas. Los datos que obtuvo le permitieron identificar cuatro etapas diferentes, que se presentaron en el siguiente orden:<br><br><strong>Etapa 1:</strong> las bacterias se adaptan al nuevo medio, comienzan a madurar y no pueden dividirse; no hay crecimiento.<br><strong>Etapa 2:</strong> se caracteriza por la duplicación de las bacterias; su crecimiento es exponencial.<br><strong>Etapa 3:</strong> los nutrientes empiezan a agotarse y se acumulan toxinas; el número de bacterias permanece constante.<br><strong>Etapa 4:</strong> los nutrientes se terminan y el nivel de toxinas es muy alto, por lo que las bacterias terminan muriendo progresivamente.`,
    resources: [],
    prompt: "¿Cuál de los siguientes formatos representa los datos obtenidos por el estudiante sobre el crecimiento del grupo bacteriano?",
    options: [
      {
        letter: "A",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Formato A">
            <p class="reaction-option-title">A. Curva de crecimiento bacteriano</p>
            <svg class="reaction-chart-svg" viewBox="0 0 420 260" role="img" aria-label="Gráfica A: crecimiento inmediato, fase constante y muerte progresiva">
              <defs><marker id="arr-g117-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"></path></marker></defs>
              <line x1="58" y1="215" x2="390" y2="215" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g117-a)"></line>
              <line x1="58" y1="215" x2="58" y2="28" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g117-a)"></line>
              <g opacity=".25" stroke="currentColor"><line x1="58" y1="185" x2="382" y2="185"></line><line x1="58" y1="155" x2="382" y2="155"></line><line x1="58" y1="125" x2="382" y2="125"></line><line x1="58" y1="95" x2="382" y2="95"></line><line x1="58" y1="65" x2="382" y2="65"></line></g>
              <polyline points="58,215 95,170 132,125 169,80 206,80 243,80 280,80 317,125 354,170 382,215" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <g font-size="13" font-weight="800"><text x="32" y="219">0</text><text x="32" y="189">1</text><text x="32" y="159">2</text><text x="32" y="129">3</text><text x="32" y="99">4</text><text x="32" y="69">5</text><text x="32" y="39">6</text></g>
              <g font-size="13" font-weight="800" text-anchor="middle"><text x="58" y="238">0</text><text x="132" y="238">4</text><text x="206" y="238">8</text><text x="280" y="238">10</text><text x="354" y="238">12</text><text x="382" y="238">14</text></g>
              <text x="220" y="255" text-anchor="middle" font-size="14" font-weight="900">Tiempo (h)</text>
              <text x="17" y="124" transform="rotate(-90 17 124)" text-anchor="middle" font-size="14" font-weight="900">Número de bacterias (log)</text>
            </svg>
          </div>
        `
      },
      {
        letter: "B",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Formato B">
            <p class="reaction-option-title">B. Tabla de datos</p>
            <div class="science-table-wrap">
              <table class="mini-table">
                <tbody>
                  <tr><th>Crecimiento bacteriano</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td></tr>
                  <tr><th>Tiempo (h)</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr>
                  <tr><th>Número de bacterias (log)</th><td>0</td><td>1</td><td>1</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      },
      {
        letter: "C",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Formato C">
            <p class="reaction-option-title">C. Curva de crecimiento bacteriano</p>
            <svg class="reaction-chart-svg" viewBox="0 0 420 260" role="img" aria-label="Gráfica C: fase de adaptación sin crecimiento, crecimiento, fase constante y muerte progresiva">
              <defs><marker id="arr-g117-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"></path></marker></defs>
              <line x1="58" y1="215" x2="390" y2="215" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g117-c)"></line>
              <line x1="58" y1="215" x2="58" y2="28" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g117-c)"></line>
              <g opacity=".25" stroke="currentColor"><line x1="58" y1="185" x2="382" y2="185"></line><line x1="58" y1="155" x2="382" y2="155"></line><line x1="58" y1="125" x2="382" y2="125"></line><line x1="58" y1="95" x2="382" y2="95"></line><line x1="58" y1="65" x2="382" y2="65"></line></g>
              <polyline points="58,185 95,185 132,185 169,155 206,125 243,95 280,65 317,65 354,125 382,215" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <g font-size="13" font-weight="800"><text x="32" y="219">0</text><text x="32" y="189">1</text><text x="32" y="159">2</text><text x="32" y="129">3</text><text x="32" y="99">4</text><text x="32" y="69">5</text><text x="32" y="39">6</text></g>
              <g font-size="13" font-weight="800" text-anchor="middle"><text x="58" y="238">0</text><text x="132" y="238">4</text><text x="206" y="238">6</text><text x="280" y="238">8</text><text x="354" y="238">12</text><text x="382" y="238">14</text></g>
              <text x="220" y="255" text-anchor="middle" font-size="14" font-weight="900">Tiempo (h)</text>
              <text x="17" y="124" transform="rotate(-90 17 124)" text-anchor="middle" font-size="14" font-weight="900">Número de bacterias (log)</text>
            </svg>
          </div>
        `
      },
      {
        letter: "D",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Formato D">
            <p class="reaction-option-title">D. Tabla de datos</p>
            <div class="science-table-wrap">
              <table class="mini-table">
                <thead><tr><th>Crecimiento bacteriano</th><th>Número de bacterias (log)</th></tr></thead>
                <tbody>
                  <tr><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td></tr><tr><td>2</td><td>1</td></tr><tr><td>3</td><td>1</td></tr><tr><td>4</td><td>2</td></tr><tr><td>5</td><td>3</td></tr><tr><td>6</td><td>4</td></tr><tr><td>7</td><td>5</td></tr><tr><td>8</td><td>5</td></tr><tr><td>9</td><td>5</td></tr><tr><td>10</td><td>4</td></tr><tr><td>11</td><td>3</td></tr><tr><td>12</td><td>2</td></tr><tr><td>13</td><td>1</td></tr><tr><td>14</td><td>0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      }
    ],
    correctAnswer: "C",
    explanation: "El formato C representa las cuatro etapas descritas: primero una fase de adaptación sin crecimiento, luego un aumento del número de bacterias, después una fase constante por agotamiento de nutrientes y acumulación de toxinas, y finalmente una disminución progresiva por muerte bacteriana. La respuesta correcta es C."
  }



  ,
  {
    uid: "s1-cnat-118",
    session: 1,
    block: 4,
    number: 118,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Biología: genética, alelos y herencia",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 118",
    stem: `En un laboratorio se usan los cromosomas de dos individuos de una especie de mosca para hacer el siguiente cruce:`,
    resources: [
      {
        type: "html",
        html: `
          <div class="reaction-option-card" aria-label="Cruce genético de moscas" style="max-width:760px;margin:auto">
            <p class="reaction-option-title">Cruce de cromosomas para el gen del color de ojos</p>
            <svg class="reaction-chart-svg" viewBox="0 0 760 360" role="img" aria-label="Mosca de ojos rojos con alelos G y G cruzada con mosca de ojos blancos con alelos g y g produce una mosca de ojos rojos con alelos G y g">
              <defs>
                <marker id="arr-g118" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"></path></marker>
              </defs>
              <g font-family="system-ui, sans-serif" fill="currentColor">
                <text x="116" y="36" text-anchor="middle" font-size="18" font-weight="900">Mosca de ojos rojos</text>
                <text x="644" y="36" text-anchor="middle" font-size="18" font-weight="900">Mosca de ojos blancos</text>
                <text x="380" y="330" text-anchor="middle" font-size="18" font-weight="900">Mosca resultante de ojos rojos</text>

                <g transform="translate(44 70)">
                  <ellipse cx="42" cy="32" rx="32" ry="22" fill="none" stroke="currentColor" stroke-width="4"></ellipse>
                  <ellipse cx="92" cy="32" rx="42" ry="28" fill="none" stroke="currentColor" stroke-width="4"></ellipse>
                  <circle cx="20" cy="18" r="5" fill="currentColor"></circle><circle cx="20" cy="46" r="5" fill="currentColor"></circle>
                  <line x1="123" y1="20" x2="150" y2="3" stroke="currentColor" stroke-width="3"></line><line x1="123" y1="44" x2="150" y2="62" stroke="currentColor" stroke-width="3"></line>
                  <line x1="58" y1="55" x2="44" y2="80" stroke="currentColor" stroke-width="3"></line><line x1="82" y1="60" x2="72" y2="88" stroke="currentColor" stroke-width="3"></line><line x1="105" y1="58" x2="116" y2="86" stroke="currentColor" stroke-width="3"></line>
                </g>

                <g transform="translate(574 70)">
                  <ellipse cx="42" cy="32" rx="32" ry="22" fill="none" stroke="currentColor" stroke-width="4"></ellipse>
                  <ellipse cx="92" cy="32" rx="42" ry="28" fill="none" stroke="currentColor" stroke-width="4"></ellipse>
                  <circle cx="20" cy="18" r="5" fill="currentColor"></circle><circle cx="20" cy="46" r="5" fill="currentColor"></circle>
                  <line x1="123" y1="20" x2="150" y2="3" stroke="currentColor" stroke-width="3"></line><line x1="123" y1="44" x2="150" y2="62" stroke="currentColor" stroke-width="3"></line>
                  <line x1="58" y1="55" x2="44" y2="80" stroke="currentColor" stroke-width="3"></line><line x1="82" y1="60" x2="72" y2="88" stroke="currentColor" stroke-width="3"></line><line x1="105" y1="58" x2="116" y2="86" stroke="currentColor" stroke-width="3"></line>
                </g>

                <g transform="translate(236 62)">
                  <path d="M18 10 C0 50, 0 112, 20 152" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"></path>
                  <path d="M78 10 C96 50, 96 112, 76 152" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"></path>
                  <text x="18" y="180" text-anchor="middle" font-size="30" font-weight="900">G</text>
                  <text x="78" y="180" text-anchor="middle" font-size="30" font-weight="900">G</text>
                </g>
                <g transform="translate(448 62)">
                  <path d="M18 10 C0 50, 0 112, 20 152" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"></path>
                  <path d="M78 10 C96 50, 96 112, 76 152" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"></path>
                  <rect x="7" y="79" width="24" height="12" fill="white" stroke="currentColor" stroke-width="2"></rect>
                  <rect x="66" y="79" width="24" height="12" fill="white" stroke="currentColor" stroke-width="2"></rect>
                  <text x="18" y="180" text-anchor="middle" font-size="30" font-weight="900">g</text>
                  <text x="78" y="180" text-anchor="middle" font-size="30" font-weight="900">g</text>
                </g>

                <line x1="310" y1="220" x2="364" y2="260" stroke="currentColor" stroke-width="5" marker-end="url(#arr-g118)"></line>
                <line x1="516" y1="220" x2="396" y2="260" stroke="currentColor" stroke-width="5" marker-end="url(#arr-g118)"></line>

                <g transform="translate(308 204)">
                  <path d="M18 10 C0 50, 0 112, 20 152" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"></path>
                  <path d="M98 10 C116 50, 116 112, 96 152" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"></path>
                  <rect x="86" y="79" width="24" height="12" fill="white" stroke="currentColor" stroke-width="2"></rect>
                  <text x="18" y="180" text-anchor="middle" font-size="30" font-weight="900">G</text>
                  <text x="98" y="180" text-anchor="middle" font-size="30" font-weight="900">g</text>
                </g>
              </g>
            </svg>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con la información del cruce, ¿el individuo resultante es homocigoto o heterocigoto para este gen?",
    options: [
      { letter: "A", text: "Homocigoto, porque tiene dos alelos." },
      { letter: "B", text: "Heterocigoto, porque tiene un solo alelo." },
      { letter: "C", text: "Homocigoto, porque tiene el alelo G y el alelo g." },
      { letter: "D", text: "Heterocigoto, porque tiene el alelo G y el alelo g." }
    ],
    correctAnswer: "D",
    explanation: "Un individuo es heterocigoto cuando posee dos alelos diferentes para un mismo gen. En el cruce mostrado, el individuo resultante tiene un alelo G y un alelo g; por eso es heterocigoto. La respuesta correcta es D."
  }
  ,
  {
    uid: "s1-cn-119",
    session: 1,
    block: 1,
    number: 119,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Propiedades de las sustancias",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 119",
    stem: "Para efectuar un procedimiento, un estudiante tiene las sustancias que se relacionan en la tabla.",
    resources: [
      {
        type: "table",
        caption: "Propiedades de las sustancias",
        headers: ["Propiedad", "Sustancia 1", "Sustancia 2", "Sustancia 3", "Sustancia 4"],
        rows: [
          ["Punto de ebullición (°C)", "-196", "59", "-189", "-34"],
          ["¿Es soluble en agua?", "Sí", "Sí", "No", "Sí"],
          ["¿Es conductor?", "Sí", "Sí", "No", "No"]
        ]
      }
    ],
    prompt: "Si el estudiante debe usar una sustancia cuyo punto de ebullición sea menor que 130 °C, soluble en agua y que no conduzca la electricidad, ¿cuál sustancia debería elegir?",
    options: [
      { letter: "A", text: "La sustancia 1." },
      { letter: "B", text: "La sustancia 2." },
      { letter: "C", text: "La sustancia 3." },
      { letter: "D", text: "La sustancia 4." }
    ],
    correctAnswer: "D",
    explanation: "La sustancia elegida debe cumplir tres condiciones: punto de ebullición menor que 130 °C, ser soluble en agua y no conducir la electricidad. La sustancia 4 tiene punto de ebullición de -34 °C, es soluble en agua y no es conductora. Por tanto, la respuesta correcta es D."
  }
  ,
  {
    uid: "s1-cn-120",
    session: 1,
    block: 4,
    number: 120,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Química y física: cambios de estado y curvas de calentamiento",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Ciencias Naturales - Pregunta 120",
    stem: `Un investigador realizó un experimento en el que sometió un bloque de hierro a temperaturas muy altas. Él descubrió que la temperatura del hierro no cambia mientras cambia su fase. La siguiente tabla muestra los registros que hizo el investigador de temperatura, fase y cambios de fase del hierro durante su experimento.`,
    resources: [
      {
        type: "table",
        caption: "Registros de temperatura y estado del hierro",
        headers: ["Temperatura (°C)", "Estado del hierro"],
        rows: [
          ["0", "Sólido"],
          ["750", "Sólido"],
          ["1.535", "Cambio de sólido a líquido"],
          ["2.255", "Líquido"],
          ["2.750", "Cambio de líquido a gaseoso"],
          ["3.000", "Gaseoso"]
        ]
      }
    ],
    prompt: "¿Cuál de las siguientes gráficas corresponde a los datos de temperatura en el tiempo registrados por el investigador?",
    options: [
      {
        letter: "A",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Gráfica A">
            <p class="reaction-option-title">Gráfica A</p>
            <svg class="reaction-chart-svg" viewBox="0 0 420 270" role="img" aria-label="Gráfica A con aumento continuo de temperatura sin mesetas de cambio de fase">
              <defs><marker id="arr-g120-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"></path></marker></defs>
              <line x1="62" y1="218" x2="386" y2="218" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g120-a)"></line>
              <line x1="62" y1="218" x2="62" y2="28" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g120-a)"></line>
              <g opacity=".25" stroke="currentColor"><line x1="62" y1="171" x2="378" y2="171"></line><line x1="62" y1="124" x2="378" y2="124"></line><line x1="62" y1="77" x2="378" y2="77"></line></g>
              <polyline points="62,218 150,126 250,88 350,38" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <circle cx="150" cy="126" r="5" fill="currentColor"></circle><circle cx="250" cy="88" r="5" fill="currentColor"></circle><circle cx="350" cy="38" r="5" fill="currentColor"></circle>
              <g font-size="13" font-weight="800"><text x="40" y="222">0</text><text x="28" y="175">750</text><text x="18" y="128">1.500</text><text x="18" y="81">2.250</text><text x="18" y="34">3.000</text></g>
              <text x="206" y="252" text-anchor="middle" font-size="14" font-weight="900">Tiempo</text>
              <text x="18" y="124" transform="rotate(-90 18 124)" text-anchor="middle" font-size="14" font-weight="900">Temperatura (°C)</text>
              <text x="125" y="150" font-size="15" font-weight="900">Sólido</text><text x="236" y="116" font-size="15" font-weight="900">Líquido</text><text x="315" y="61" font-size="15" font-weight="900">Gaseoso</text>
            </svg>
          </div>
        `
      },
      {
        letter: "B",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Gráfica B">
            <p class="reaction-option-title">Gráfica B</p>
            <svg class="reaction-chart-svg" viewBox="0 0 420 270" role="img" aria-label="Gráfica B con una línea recta ascendente">
              <defs><marker id="arr-g120-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"></path></marker></defs>
              <line x1="62" y1="218" x2="386" y2="218" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g120-b)"></line>
              <line x1="62" y1="218" x2="62" y2="28" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g120-b)"></line>
              <g opacity=".25" stroke="currentColor"><line x1="62" y1="171" x2="378" y2="171"></line><line x1="62" y1="124" x2="378" y2="124"></line><line x1="62" y1="77" x2="378" y2="77"></line></g>
              <line x1="62" y1="218" x2="350" y2="38" stroke="currentColor" stroke-width="5" stroke-linecap="round"></line>
              <circle cx="350" cy="38" r="5" fill="currentColor"></circle>
              <g font-size="13" font-weight="800"><text x="40" y="222">0</text><text x="28" y="175">750</text><text x="18" y="128">1.500</text><text x="18" y="81">2.250</text><text x="18" y="34">3.000</text></g>
              <text x="206" y="252" text-anchor="middle" font-size="14" font-weight="900">Tiempo</text>
              <text x="18" y="124" transform="rotate(-90 18 124)" text-anchor="middle" font-size="14" font-weight="900">Temperatura (°C)</text>
              <text x="118" y="170" font-size="15" font-weight="900">Sólido</text><text x="225" y="106" font-size="15" font-weight="900">Líquido</text><text x="313" y="57" font-size="15" font-weight="900">Gaseoso</text>
            </svg>
          </div>
        `
      },
      {
        letter: "C",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Gráfica C">
            <p class="reaction-option-title">Gráfica C</p>
            <svg class="reaction-chart-svg" viewBox="0 0 420 270" role="img" aria-label="Gráfica C con mesetas durante los cambios de fase del hierro">
              <defs><marker id="arr-g120-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"></path></marker></defs>
              <line x1="62" y1="218" x2="386" y2="218" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g120-c)"></line>
              <line x1="62" y1="218" x2="62" y2="28" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g120-c)"></line>
              <g opacity=".25" stroke="currentColor"><line x1="62" y1="171" x2="378" y2="171"></line><line x1="62" y1="124" x2="378" y2="124"></line><line x1="62" y1="77" x2="378" y2="77"></line></g>
              <polyline points="62,218 132,121 185,121 252,62 320,62 350,38" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <circle cx="132" cy="121" r="5" fill="currentColor"></circle><circle cx="185" cy="121" r="5" fill="currentColor"></circle><circle cx="252" cy="62" r="5" fill="currentColor"></circle><circle cx="320" cy="62" r="5" fill="currentColor"></circle><circle cx="350" cy="38" r="5" fill="currentColor"></circle>
              <g font-size="13" font-weight="800"><text x="40" y="222">0</text><text x="28" y="175">750</text><text x="18" y="128">1.500</text><text x="18" y="81">2.250</text><text x="18" y="34">3.000</text></g>
              <text x="206" y="252" text-anchor="middle" font-size="14" font-weight="900">Tiempo</text>
              <text x="18" y="124" transform="rotate(-90 18 124)" text-anchor="middle" font-size="14" font-weight="900">Temperatura (°C)</text>
              <text x="102" y="151" font-size="15" font-weight="900">Sólido</text><text x="221" y="93" font-size="15" font-weight="900">Líquido</text><text x="320" y="60" font-size="15" font-weight="900">Gaseoso</text>
            </svg>
          </div>
        `
      },
      {
        letter: "D",
        isHtml: true,
        text: `
          <div class="reaction-option-card" aria-label="Gráfica D">
            <p class="reaction-option-title">Gráfica D</p>
            <svg class="reaction-chart-svg" viewBox="0 0 420 270" role="img" aria-label="Gráfica D con varias mesetas adicionales no registradas en la tabla">
              <defs><marker id="arr-g120-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"></path></marker></defs>
              <line x1="62" y1="218" x2="386" y2="218" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g120-d)"></line>
              <line x1="62" y1="218" x2="62" y2="28" stroke="currentColor" stroke-width="3" marker-end="url(#arr-g120-d)"></line>
              <g opacity=".25" stroke="currentColor"><line x1="62" y1="171" x2="378" y2="171"></line><line x1="62" y1="124" x2="378" y2="124"></line><line x1="62" y1="77" x2="378" y2="77"></line></g>
              <polyline points="62,218 100,218 132,171 170,171 205,124 238,124 270,92 305,92 334,62 350,38" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <g font-size="13" font-weight="800"><text x="40" y="222">0</text><text x="28" y="175">750</text><text x="18" y="128">1.500</text><text x="18" y="81">2.250</text><text x="18" y="34">3.000</text></g>
              <text x="206" y="252" text-anchor="middle" font-size="14" font-weight="900">Tiempo</text>
              <text x="18" y="124" transform="rotate(-90 18 124)" text-anchor="middle" font-size="14" font-weight="900">Temperatura (°C)</text>
              <text x="105" y="202" font-size="15" font-weight="900">Sólido</text><text x="225" y="114" font-size="15" font-weight="900">Líquido</text><text x="320" y="61" font-size="15" font-weight="900">Gaseoso</text>
            </svg>
          </div>
        `
      }
    ],
    correctAnswer: "C",
    explanation: "Durante un cambio de fase la temperatura del hierro permanece constante, aunque se siga suministrando energía. Por eso la gráfica correcta debe mostrar tramos horizontales en los cambios de sólido a líquido y de líquido a gaseoso. La opción C representa esas mesetas y luego el aumento de temperatura en cada fase. La respuesta correcta es C."
  }


  ,
  {
    uid: "s2-soc-001",
    session: 2,
    block: 1,
    number: 1,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Desarrollo sostenible y cambio climático",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 1",
    stem: "En 2019, una joven de 16 años pronunció un discurso ante el Parlamento Británico sobre el desarrollo sostenible y la urgencia de actuar decididamente para frenar el cambio climático.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Discurso sobre crisis climática</h3>
            <p>“La crisis climática es, a la vez, el conflicto más fácil y el más difícil al que nos hemos enfrentado. El más fácil porque sabemos lo que tenemos que hacer y el más difícil porque nuestra economía depende de la destrucción de los ecosistemas [...]. Alrededor del 2030, habremos desatado una reacción en cadena irreversible [...] que, seguramente, pondrá fin a nuestra civilización tal como la conocemos. Eso es lo que sucederá, a menos que se tomen medidas sin precedentes”.</p>
            <p>“Y tengan en cuenta que estos cálculos dependen de inventos que todavía no se han hecho a esa escala, inventos que se supone que limpiarán la atmósfera de cantidades astronómicas de dióxido de carbono [...]. Pero quizá la idea más equivocada sobre la crisis climática es que tenemos que ‘reducir’ las emisiones [...]. Sin embargo, eso es solo el comienzo de un proceso rápido que debe llevar al fin de las emisiones en un par de décadas o menos. Y cuando digo ‘fin’ quiero decir cero y, luego, pasar rápidamente a cifras negativas. Eso descarta automáticamente la mayoría de las políticas actuales”.</p>
            <p class="reading-source">Tomado y adaptado de: Thunberg, G. (2019). El discurso completo de Greta Thunberg ante el Parlamento británico: “Volveremos a clase cuando escuchéis a la ciencia”. El País.</p>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes hechos permite sustentar el reclamo de la joven por políticas concretas contra el cambio climático?",
    options: [
      { letter: "A", text: "Durante 2022, la venta de carros eléctricos en América Latina aumentó un 21,7 % frente al año anterior, aunque la mayoría de estos son importados, pues las empresas que se encargan de ensamblar vehículos en la región todavía no los producen." },
      { letter: "B", text: "Si bien las tasas de pobreza en el mundo se han reducido a más de la mitad desde el 2000, la pandemia de la COVID-19 podría aumentar la pobreza a nivel mundial hasta llegar a afectar a 500 millones de personas más o a un 8 % más de la población mundial." },
      { letter: "C", text: "Desde 1990, Reino Unido ha reducido en un 37 % la expulsión de dióxido de carbono al ambiente, gracias al cierre de sus viejas plantas de carbón, aunque todavía no ha conseguido eliminar completamente la generación de estos gases contaminantes." },
      { letter: "D", text: "El crecimiento continuo y sostenido de la capacidad instalada de producción de energía eólica a nivel mundial en los últimos 10 años ha tenido un repunte reciente, gracias al desarrollo de máquinas cada vez más potentes y adaptadas a distintos entornos." }
    ],
    correctAnswer: "C",
    explanation: "El reclamo pide políticas concretas que reduzcan emisiones. La opción C muestra una medida verificable —el cierre de plantas de carbón— asociada con una reducción del dióxido de carbono, aunque todavía insuficiente para eliminar completamente las emisiones. Por eso sustenta mejor el reclamo. La respuesta correcta es C."
  }




  ,
  {
    uid: "s2-soc-002",
    session: 2,
    block: 1,
    number: 2,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Constitución Política de Colombia de 1991 y diversidad étnica",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 2",
    stem: "Una ley en Colombia establecía lo siguiente: \"Artículo 1.°- Para atender a la reducción y civilización de las tribus indígenas en el territorio colombiano, se divide este en seis corregimientos [...]\".",
    prompt: "¿Cuál de los siguientes argumentos permite afirmar que esta ley es anterior a la Constitución política de 1991?",
    options: [
      { letter: "A", text: "Antes de la Constitución de 1991 existía un mayor número de asentamientos indígenas en el país." },
      { letter: "B", text: "Las expresiones del artículo son contrarias a la protección de la diversidad étnica establecida en la Constitución de 1991." },
      { letter: "C", text: "A partir de la Constitución de 1991, se potenció un cambio hacia un Estado más descentralizado." },
      { letter: "D", text: "A partir de la Constitución de 1991, es necesario agotar la consulta previa para aprobar ese tipo de leyes." }
    ],
    correctAnswer: "B",
    explanation: "La Constitución de 1991 reconoce y protege la diversidad étnica y cultural. Por eso, expresiones como ‘reducción y civilización de las tribus indígenas’ resultan incompatibles con ese enfoque de reconocimiento y protección. Esto permite inferir que la ley pertenece a un periodo anterior. La respuesta correcta es B."
  }


  ,
  {
    uid: "s2-soc-003",
    session: 2,
    block: 1,
    number: 3,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Prejuicios, roles de género y socialización familiar",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 3",
    stem: "Un análisis del comportamiento de setenta niños en edad preescolar le permitió a un grupo de investigadores de una universidad concluir que los niños, desde los dos años y medio, pueden discriminar a personas con diferencias sociales y culturales.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Investigación sobre comportamiento infantil</h3>
            <p>Al respecto, los investigadores afirman que:</p>
            <blockquote>“Para el estudio, nos basamos en las actitudes y comportamientos de las madres, debido a que ellas son las que cumplen el papel de formar a sus hijos e hijas en valores”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿La afirmación de los investigadores contiene algún prejuicio?",
    options: [
      { letter: "A", text: "No, porque en la infancia quienes realmente asumen el cuidado y formación de los hijos son las madres." },
      { letter: "B", text: "Sí, porque está afirmando que las madres son las únicas responsables de la formación de los hijos." },
      { letter: "C", text: "No, porque las madres siempre cuidan con afecto a sus hijos enseñándoles todos los valores." },
      { letter: "D", text: "Sí, porque supone que las madres no tienen el papel de sostener económicamente a los hijos." }
    ],
    correctAnswer: "B",
    explanation: "La afirmación atribuye exclusivamente a las madres la responsabilidad de formar en valores a los hijos e hijas. Esa generalización desconoce la participación de otros cuidadores, padres, familias e instituciones, por lo que contiene un prejuicio sobre el rol materno. La respuesta correcta es B."
  }



  ,
  {
    uid: "s2-soc-004",
    session: 2,
    block: 1,
    number: 4,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Movimientos sociales, diversidad sexual y transformación cultural",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 4",
    stem: "Un periodista se aproxima a un grupo de personas que está llevando a cabo una manifestación. Al preguntarle a una de ellas sobre sus motivos para manifestarse, esta contesta lo siguiente:",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Manifestación por diversidad y educación sexual</h3>
            <blockquote>“Buscamos promover el conocimiento y el respeto hacia la diversidad sexual, la educación sexual científica y sin prejuicios morales, y las relaciones interpersonales libres de toda forma de violencia de género”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes sería una postura que esta persona probablemente adoptaría?",
    options: [
      { letter: "A", text: "El respeto hacia el otro en una relación de pareja depende de la adopción de valores familiares tradicionales." },
      { letter: "B", text: "Las manifestaciones son la única ruta que tienen los ciudadanos para lograr los cambios que la sociedad necesita." },
      { letter: "C", text: "Las personas tienen el poder para transformar las condiciones sociales aun cuando estas están fuertemente arraigadas." },
      { letter: "D", text: "La ausencia de sesgos morales en la educación sexual ha hecho que la diversidad sexual sea ampliamente valorada en nuestra sociedad." }
    ],
    correctAnswer: "C",
    explanation: "La persona participa en una manifestación para promover cambios relacionados con el respeto a la diversidad sexual, la educación sexual científica y la eliminación de la violencia de género. Esto supone que las condiciones sociales pueden transformarse mediante la acción ciudadana, incluso si están arraigadas. La respuesta correcta es C."
  }




  ,
  {
    uid: "s2-soc-005",
    session: 2,
    block: 1,
    number: 5,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Inclusión laboral, discapacidad y prejuicios",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 5",
    stem: "En respuesta a la solicitud de adaptar la infraestructura de una empresa para hacerla más accesible a los trabajadores con discapacidad, el jefe de la empresa contestó lo siguiente:",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Accesibilidad laboral y discapacidad</h3>
            <blockquote>“Es cierto que existen muchas barreras para que las personas con discapacidad se integren al mercado laboral. El Estado, en principio, debería asumir un papel más activo frente a esta población, pues los ajustes a la infraestructura no son una responsabilidad que deba asumir exclusivamente una empresa. Además, no se debe pensar que la discapacidad radica en la limitación, ya que el problema de la discapacidad radica en las actitudes personales que impiden superarla de forma efectiva”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes enunciados del jefe de la empresa contiene un prejuicio cuestionable?",
    options: [
      { letter: "A", text: "Existen muchas barreras para que las personas con discapacidad se integren al mercado laboral." },
      { letter: "B", text: "El Estado, en principio, debería asumir un papel más activo frente a la población con discapacidad." },
      { letter: "C", text: "El problema de la discapacidad radica en las actitudes personales que impiden superarla de forma efectiva." },
      { letter: "D", text: "Los ajustes a la infraestructura no son una responsabilidad que deba asumir exclusivamente una empresa." }
    ],
    correctAnswer: "C",
    explanation: "El enunciado C es cuestionable porque desplaza el problema hacia las actitudes personales de quienes tienen discapacidad, como si la superación dependiera principalmente de ellos. Esto ignora las barreras físicas, sociales e institucionales que limitan la inclusión. La respuesta correcta es C."
  }



  ,
  {
    uid: "s2-soc-006",
    session: 2,
    block: 1,
    number: 6,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento sistémico y reflexión crítica",
    componente: "Conflictos socioambientales, pesca industrial y economía local",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 6",
    stem: "En un pueblo panameño, la comunidad se encuentra molesta debido a la presencia de buques industriales que realizan pesca a gran escala en su territorio.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Pesca industrial y conflicto comunitario</h3>
            <p>Según los habitantes, la presencia de buques industriales conduce a tres problemas:</p>
            <ol>
              <li>Las especies nativas se están extinguiendo, lo cual afecta el ecosistema marino de la región y, por ende, el turismo asociado a prácticas como el avistamiento de ballenas.</li>
              <li>Los pescadores artesanales no obtienen el pescado necesario para subsistir.</li>
              <li>Las herramientas de pesca de los nativos son arrastradas por los buques de pesca industrial extranjeros.</li>
            </ol>
            <p>Para resolver el conflicto, se propone generar franjas de tiempo específicas para que los buques industriales pesquen a lo largo del año y brindar asesoramiento científico a los habitantes para que puedan comprobar si la pesca industrial está destruyendo el ecosistema marino.</p>
            <p class="source-note">Tomado y adaptado de: Paz, A. (12 de marzo de 2019). El área protegida que resolvió conflictos entre pescadores artesanales e industriales en Colombia. Mongabay.</p>
          </div>
        `
      }
    ],
    prompt: "De las siguientes circunstancias, ¿cuál podría dificultar que la solución propuesta tenga éxito?",
    options: [
      { letter: "A", text: "Que varias organizaciones científicas se involucren en el proceso de verificación del impacto ecológico de la pesca industrial." },
      { letter: "B", text: "Que se aprovechen al máximo las franjas de tiempo acordadas, incrementando el número de buques industriales en la zona." },
      { letter: "C", text: "Que los pescadores se dediquen a actividades alternativas durante las franjas acordadas para asegurar su subsistencia." },
      { letter: "D", text: "Que la alcaldía del pueblo les brinde a los pescadores un subsidio que les permita recuperar las herramientas perdidas." }
    ],
    correctAnswer: "B",
    explanation: "La solución busca regular la pesca industrial mediante franjas de tiempo y comprobar científicamente sus impactos. Si esas franjas se aprovechan al máximo aumentando el número de buques, la presión sobre el ecosistema y sobre los pescadores artesanales podría crecer, dificultando el éxito de la medida. La respuesta correcta es B."
  }


  ,
  {
    uid: "s2-soc-007",
    session: 2,
    block: 1,
    number: 7,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Participación política, partidos y democracia representativa",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 7",
    stem: "En la Constitución Política de Colombia se establece que todos los ciudadanos tienen el derecho a fundar, organizar y desarrollar partidos y movimientos políticos. También se hace mención a la libertad que tienen las personas para afiliarse o retirarse de los partidos.",
    prompt: "¿Por qué en la Constitución se da importancia a los partidos políticos?",
    options: [
      { letter: "A", text: "Porque contribuyen a que los ciudadanos incidan en las decisiones del país a través de la participación." },
      { letter: "B", text: "Porque favorecen la descentralización política territorial, mediante estrategias de acuerdo clientelistas." },
      { letter: "C", text: "Porque garantizan la gobernabilidad del presidente, promoviendo la censura a las iniciativas de la oposición." },
      { letter: "D", text: "Porque cuentan con las facultades para administrar justicia entre los ciudadanos y los funcionarios del Estado." }
    ],
    correctAnswer: "A",
    explanation: "Los partidos y movimientos políticos son mecanismos de participación democrática: permiten que la ciudadanía se organice, exprese intereses colectivos, proponga ideas y participe en las decisiones públicas. Por eso la Constitución reconoce su importancia. La respuesta correcta es A."
  }


  ,
  {
    uid: "s2-soc-008",
    session: 2,
    block: 1,
    number: 8,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Derechos, servicios públicos y acceso al agua potable",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 8",
    stem: "Un municipio en Colombia es rico en vegetación y recursos hídricos, dentro de los cuales se encuentra uno de los embalses más grandes del país. Sin embargo, sus habitantes no cuentan con acceso universal al agua potable, porque una empresa de acueducto y alcantarillado es dueña de una parte del terreno en el que está localizado el embalse y destina este recurso a otras regiones, entre estas, a la capital del país; además, el acueducto local es bastante obsoleto, por lo que el agua potable llega a pocas personas. Por todo esto, les toca conformarse con aprovechar el agua de dos quebradas cercanas y construir acueductos artesanales, cuya capacidad es mínima y poco confiable, para potabilizarla y acceder a ella.",
    prompt: "De acuerdo con la Constitución Política de Colombia, en la situación descrita está vulnerándose el derecho",
    options: [
      { letter: "A", text: "a un medio ambiente sano." },
      { letter: "B", text: "a participar en las decisiones sobre el uso de los recursos naturales." },
      { letter: "C", text: "al acceso al agua potable." },
      { letter: "D", text: "al enriquecimiento por la explotación de los recursos naturales." }
    ],
    correctAnswer: "C",
    explanation: "La situación muestra que la población no tiene acceso universal, suficiente y confiable al agua potable, pese a vivir en un municipio con abundantes recursos hídricos. Por eso el derecho vulnerado es el acceso al agua potable. La respuesta correcta es C."
  }


  ,
  {
    uid: "s2-soc-009",
    session: 2,
    block: 1,
    number: 9,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Historia política de Colombia, orden público y estado de sitio",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 9",
    stem: "Las elecciones presidenciales del país en 1970 fueron altamente controversiales, debido a dos motivos. Por un lado, hubo diversas denuncias de que se había realizado un fraude electoral y, por otro lado, como consecuencia del descontento de la población, hubo un incremento en la violencia en el país, lo cual llevó a la formación de grupos armados ilegales.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Discurso presidencial y estado de sitio</h3>
            <p>Ahora bien, el presidente en funciones de la época pronunció un discurso la noche de las elecciones, en el que declaró el estado de sitio:</p>
            <blockquote>“La obligación del Gobierno es la de adoptar todas las medidas que sean necesarias para mantener la paz y el orden, porque si las prédicas no bastan, si los llamamientos a la cordialidad no bastan, si la seguridad de que se cumplirán todas las formalidades legales no basta, habrá que emplear los instrumentos que prevé la Constitución, y yo, de eso pueden estar seguros todos, no vacilaré en emplearlos. Mi deber como mandatario de la República es usar esos instrumentos oportunamente y, si es necesario, con la máxima severidad y la máxima energía, y yo, Dios mediante, no habré de faltar a él [...] los datos que estamos recibiendo hora por hora nos confirman que avanza aceleradamente la promoción de un levantamiento general en el país. Por consiguiente, no puedo demorar un momento más las necesarias medidas de prevención y se acaba de numerar y expedir el decreto que declara turbado el orden público y ordena el estado de sitio”.</blockquote>
            <p class="source-note">Tomado y adaptado de: Redacción Política. (2008, 11 de abril). A las 9 no debe haber gente en las calles. El Espectador.</p>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con lo anterior, ¿con qué intención el presidente en funciones declaró el estado de sitio?",
    options: [
      { letter: "A", text: "Ejercer su poder para realizar nuevas elecciones en todo el país." },
      { letter: "B", text: "Ejercer su autoridad para mantenerse en el poder durante otro mandato." },
      { letter: "C", text: "Ejercer su poder para castigar a los culpables de realizar el fraude electoral." },
      { letter: "D", text: "Ejercer su autoridad para evitar alzamientos armados en el país." }
    ],
    correctAnswer: "D",
    explanation: "En el discurso se afirma que el Gobierno debía tomar medidas para mantener la paz y el orden, porque supuestamente avanzaba la promoción de un levantamiento general. Por eso, la intención declarada del estado de sitio era prevenir alzamientos armados y preservar el orden público. La respuesta correcta es D."
  }




  ,
  {
    uid: "s2-soc-010",
    session: 2,
    block: 1,
    number: 10,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Reforma tributaria, oposición y gobierno",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 10",
    stem: "Desde hace una década, en un país se viene afirmando que se necesita una reforma tributaria que permita mejorar sustancialmente la situación fiscal del Estado. Ante esta situación, un congresista, que se fue volviendo cada vez más popular con los años, afirmó lo siguiente en diferentes momentos:",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Dos posiciones frente a una reforma tributaria</h3>
            <blockquote>“Un Congreso que se atrevió a hacer una reforma tributaria en plena crisis económica, gravando la canasta familiar, que afecta a las clases menos favorecidas, no tiene perdón. Se vienen protestas y los congresistas de la oposición estaremos con los manifestantes”. <strong>(2012)</strong></blockquote>
            <blockquote>“El Ministro de Hacienda y los congresistas de los partidos de Gobierno, luego de debatir cinco horas en el Palacio, apoyamos la reforma tributaria porque grava solo a las clases altas. Por ello, eliminamos varios impuestos que generaban preocupación en los sectores empobrecidos del país”. <strong>(2017)</strong></blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes razones permitiría explicar la diferencia entre ambas posiciones del congresista?",
    options: [
      { letter: "A", text: "La diferencia de popularidad entre un congresista poco conocido y un congresista que se convirtió en figura pública nacional." },
      { letter: "B", text: "Las diferencias económicas fiscales que tiene el país entre los años mencionados." },
      { letter: "C", text: "La diferencia en la posición política que ocupa el congresista en los años señalados y en el enfoque propuesto para la reforma." },
      { letter: "D", text: "La obligación de los congresistas de cambiar de posición durante Gobiernos distintos." }
    ],
    correctAnswer: "C",
    explanation: "En 2012 el congresista habla desde la oposición y rechaza una reforma que, según él, afecta a las clases menos favorecidas. En 2017 habla junto al Gobierno y apoya una reforma con un enfoque diferente: gravar a las clases altas y eliminar impuestos preocupantes para sectores empobrecidos. Por eso la diferencia se explica por el cambio de posición política y por el enfoque de la reforma. La respuesta correcta es C."
  }


  ,
  {
    uid: "s2-soc-011",
    session: 2,
    block: 1,
    number: 11,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Políticas públicas, educación superior y equidad",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 11",
    stem: "Con el fin de mejorar el acceso a la educación superior, en el Plan Nacional de Desarrollo 2014-2018 para Colombia, se proponía lo siguiente:",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Financiación de la demanda en educación superior</h3>
            <blockquote><strong>“Financiación de la demanda en un contexto de alta calidad y equidad:</strong> se fomentará el acceso a la educación superior de los estudiantes con condiciones socioeconómicas menos favorables y buen desempeño académico, mediante el otorgamiento de créditos-becas para cursar sus estudios en instituciones o programas con acreditación de alta calidad”.</blockquote>
            <p class="source-note">Tomado de: Presidencia de la República de Colombia. (2014). <em>Plan Nacional de Desarrollo “Todos por un nuevo país” 2014-2018</em>, p. 97. Imprenta Nacional de Colombia.</p>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con lo anterior, ¿qué factor se está pasando por alto en el programa para la selección de los estudiantes beneficiarios?",
    options: [
      { letter: "A", text: "El impacto del nivel socioeconómico de los estudiantes y sus familias en sus posibilidades de acceso a la educación superior." },
      { letter: "B", text: "La calidad de los programas de educación superior a los que ingresarían los estudiantes que resulten beneficiados con el crédito-beca." },
      { letter: "C", text: "El impacto de la calidad de la educación primaria y secundaria en el rendimiento académico de los estudiantes que aspiran al beneficio." },
      { letter: "D", text: "El buen desempeño académico en su formación primaria y secundaria que deben tener los estudiantes beneficiados con el crédito-beca." }
    ],
    correctAnswer: "C",
    explanation: "El programa considera las condiciones socioeconómicas, el buen desempeño académico y la acreditación de alta calidad de las instituciones o programas. Sin embargo, al exigir buen desempeño académico, pasa por alto que la calidad de la educación primaria y secundaria puede afectar ese rendimiento y, por tanto, las posibilidades de acceder al beneficio. La respuesta correcta es C."
  }




  ,
  {
    uid: "s2-soc-012",
    session: 2,
    block: 1,
    number: 12,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Segregación, exclusión y genocidio",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 12",
    stem: "Durante la Segunda Guerra Mundial, la Alemania nazi fue responsable de un genocidio contra la población judía, con el que se perseguía la eliminación de todos los judíos de Europa. A este genocidio le precedió la exclusión de dicha población del resto de la población europea en los países que fueron invadidos por Alemania. Los judíos fueron confinados a barrios especiales, denominados ‘guetos’, donde se los separaba de sus compatriotas para, luego, ser enviados a campos de concentración y trabajo forzado.",
    prompt: "De acuerdo con lo anterior, ¿con cuál de los siguientes conceptos se puede relacionar el concepto de ‘genocidio’?",
    options: [
      { letter: "A", text: "Emigración." },
      { letter: "B", text: "Inmigración." },
      { letter: "C", text: "Segregación." },
      { letter: "D", text: "Inclusión." }
    ],
    correctAnswer: "C",
    explanation: "El texto describe que antes del genocidio los judíos fueron excluidos y separados del resto de la población mediante guetos. Esa separación sistemática de un grupo social se relaciona con la segregación. Por eso, la respuesta correcta es C."
  }





  ,
  {
    uid: "s2-soc-013",
    session: 2,
    block: 1,
    number: 13,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Cultura, tradición, tecnología apropiada y solución de problemas sociales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 13",
    stem: "Los habitantes de una aldea de África están pasando por una terrible hambruna. La agricultura ha sido la principal fuente de alimento de esta población; sin embargo, debido al calentamiento global, las políticas ineficaces del presidente y la época de sequía, no hay agua suficiente para regar los cultivos.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Hambruna, tradición y solución tecnológica</h3>
            <p>Ante esta situación, los líderes de la aldea han decidido dejar su suerte a “los designios de Dios”. Ellos confían en que, como en épocas de sequía pasadas, la lluvia llegará, siempre y cuando mantengan las mismas técnicas de siembra, cultivo y riego por lluvia. Ellos aseguran que la comunidad sobrevivirá de la misma forma en que sobrevivieron sus antecesores.</p>
            <p>Por otro lado, para resolver el problema, en una aldea, un grupo de estudiantes propone diseñar un molino de viento que permite extraer agua de los pozos del lugar. El molino, que no es muy complejo, sería construido con materiales reciclados de la aldea y, de esta forma, se contaría con una técnica alternativa para el riego de los cultivos.</p>
          </div>
        `
      }
    ],
    prompt: "En la situación anterior, ¿cuál de las siguientes condiciones obstaculiza la implementación de la solución propuesta por los estudiantes?",
    options: [
      { letter: "A", text: "El calentamiento global." },
      { letter: "B", text: "La falta de sustento económico." },
      { letter: "C", text: "La tradición cultural de siembra." },
      { letter: "D", text: "La falta de apoyo del Gobierno." }
    ],
    correctAnswer: "C",
    explanation: "La solución de los estudiantes propone una técnica alternativa de riego mediante un molino de viento. El obstáculo descrito es que los líderes desean mantener las mismas técnicas tradicionales de siembra, cultivo y riego por lluvia, confiando en que la comunidad sobrevivirá como sus antecesores. Por eso, la condición que dificulta la implementación es la tradición cultural de siembra. La respuesta correcta es C."
  }



  ,
  {
    uid: "s2-soc-014",
    session: 2,
    block: 1,
    number: 14,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Modelos económicos e intervención del Estado",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 14",
    stem: "Cuando en un país existen, simultáneamente, prácticas que permiten la actividad libre y legal de las empresas particulares y la intervención del Estado, decimos que en ese país predomina un modelo de economía dual o de economía mixta de mercado, ya que los medios de producción están siendo compartidos por el sector público y el privado tanto en la producción de bienes como en la prestación de servicios.",
    prompt: "¿Cuál de las siguientes acciones representa un rasgo de intervención estatal en un modelo de economía mixta?",
    options: [
      { letter: "A", text: "Una alcaldía decide terminar un contrato de construcción de alcantarillado por incumplimiento del contratista." },
      { letter: "B", text: "Un jefe de recursos humanos de una multinacional llama a varios empleados para negociar un incremento salarial por sus buenos resultados." },
      { letter: "C", text: "Los empleadores y los trabajadores se reúnen para negociar un incremento en el salario mínimo para el siguiente año." },
      { letter: "D", text: "Dos empresas compiten en una convocatoria para saber cuál de ellas ofrece mejor precio para la realización de un contrato." }
    ],
    correctAnswer: "A",
    explanation: "La economía mixta combina la actividad privada con la intervención del Estado. La opción A muestra a una alcaldía, es decir, una entidad estatal, actuando sobre un contrato de obra pública. Las demás opciones se centran principalmente en relaciones entre actores privados o laborales. Por eso, la respuesta correcta es A."
  }


  ,
  {
    uid: "s2-soc-015",
    session: 2,
    block: 1,
    number: 15,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Censura, medios de comunicación y videojuegos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 15",
    stem: "En los últimos años, algunos periodistas han promovido la censura a los videojuegos con contenidos violentos, debido a que varias personas han confesado que habían jugado este tipo de videojuegos antes de cometer un delito. No obstante, según algunos expertos, estas razones no son adecuadas para justificar la censura porque, además de tratarse de casos aislados, el mismo razonamiento permitiría censurar otros medios de la industria del entretenimiento, como el cine o la televisión, que también pueden incidir negativamente en el comportamiento de las personas.",
    prompt: "Ahora bien, ¿cuál de las siguientes razones podría utilizarse para cuestionar la posición de los expertos?",
    options: [
      { letter: "A", text: "Tanto los videojuegos como el cine y la televisión pueden tener un impacto importante en el comportamiento social de las personas." },
      { letter: "B", text: "Únicamente se han presentado casos aislados de delitos cometidos como resultado de la influencia de contenidos televisivos violentos." },
      { letter: "C", text: "Como la interacción del jugador es más activa que la del televidente, la influencia de los videojuegos sobre el comportamiento es mayor." },
      { letter: "D", text: "No es posible afirmar que el cine y los videojuegos tengan un impacto diferente en las personas, pues en ambos casos la relación con el contenido es similar." }
    ],
    correctAnswer: "C",
    explanation: "Los expertos sostienen que censurar videojuegos por posibles efectos negativos permitiría censurar también cine o televisión, porque todos serían medios de entretenimiento con posibles efectos similares. La opción C cuestiona esa comparación, pues señala una diferencia relevante: en los videojuegos el usuario interactúa activamente, por lo que su influencia podría ser mayor que la de otros medios. Por eso, la respuesta correcta es C."
  }


  ,
  {
    uid: "s2-soc-016",
    session: 2,
    block: 1,
    number: 16,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Discriminación laboral y diversidad",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 16",
    stem: "Una investigación realizada por una universidad reveló que, en tres ciudades principales, el 40 % de la población LGBTIQ+ es víctima de exclusión laboral por razones de identidad de género y orientación sexual. Frente a estos resultados, voceros del Ministerio del Trabajo afirmaron que, si bien eran alarmantes, la investigación no consideraba los distintos panoramas y contextos laborales en donde se generaba la exclusión, pues, en muchos casos, el rechazo a ciertos postulantes dependía de otras razones, como los perfiles de las vacantes.",
    prompt: "¿Se puede afirmar que los voceros del Ministerio del Trabajo están contradiciendo lo expuesto en los resultados de la investigación?",
    options: [
      { letter: "A", text: "No, pues reconocen que hay altas cifras de exclusión laboral por razones de identidad de género y orientación sexual." },
      { letter: "B", text: "No, porque reconocen que deben realizarse estudios e investigaciones de este estilo para poder crear nuevas rutas en contra de la discriminación." },
      { letter: "C", text: "Sí, porque sugieren que la investigación se limita a describir la situación de exclusión laboral sin tener en cuenta otras variables que hacen parte del proceso." },
      { letter: "D", text: "Sí, porque consideran que hay variables más relevantes para evaluar un fenómeno relacionado con los procesos de contratación que no tienen que ver con la identidad de género y la orientación sexual." }
    ],
    correctAnswer: "C",
    explanation: "La investigación atribuye la exclusión laboral a razones de identidad de género y orientación sexual. Los voceros no niegan que las cifras sean alarmantes, pero sí cuestionan el alcance del estudio al afirmar que no tuvo en cuenta distintos contextos laborales y otras variables, como los perfiles de las vacantes. Por eso, contradicen parcialmente la interpretación de los resultados. La respuesta correcta es C."
  }


  ,
  {
    uid: "s2-soc-017",
    session: 2,
    block: 1,
    number: 17,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Derechos, libertad de creencias y normas institucionales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 17",
    stem: "En una institución educativa se le niega la posibilidad a una estudiante de hacer lectura del tarot a sus compañeros de clase y, frente a sus peticiones, las directivas argumentan que esta práctica no puede ser realizada, en cuanto no existe ningún sustento científico que le dé validez. Por el contrario, manifiestan que puede resultar perjudicial para aquellas personas que son fácilmente influenciables o débiles en sus creencias. Frente a la situación, la estudiante afectada dice: ‘La actitud de las directivas es irracional e injusta, el tarot hace parte de mis creencias. Es una práctica de tradición familiar y, por ello, puedo ejercerla libremente’.",
    prompt: "¿Cuál puede ser la intención de la estudiante al asegurar que está siendo discriminada?",
    options: [
      { letter: "A", text: "Desatender lo que se indica en los lineamientos institucionales." },
      { letter: "B", text: "Poner en tela de juicio el conocimiento que tienen las directivas." },
      { letter: "C", text: "Conseguir a largo plazo algún tipo de remuneración económica." },
      { letter: "D", text: "Evidenciar la vulneración que se está haciendo a sus derechos." }
    ],
    correctAnswer: "D",
    explanation: "La estudiante afirma que la lectura del tarot hace parte de sus creencias y de una tradición familiar. Al decir que está siendo discriminada, busca mostrar que la decisión institucional estaría afectando su libertad de creencias y su derecho a ejercerlas. Por eso, la respuesta correcta es D."
  }


  ,
  {
    uid: "s2-soc-018",
    session: 2,
    block: 1,
    number: 18,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Derechos, convivencia escolar y libre desarrollo de la personalidad",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 18",
    stem: "En un colegio, la comunidad educativa ha hecho un ejercicio participativo de revisión y actualización del manual de convivencia escolar. En el marco de este ejercicio, los directivos han abierto una serie de diálogos entre los distintos actores del colegio —estudiantes, docentes, padres y madres, y coordinadores—, con el fin de acordar entre todos cuáles son los derechos y los deberes de los diferentes miembros de la institución.",
    prompt: "Los estudiantes proponen ajustar el manual para promover acciones que respeten su derecho al libre desarrollo de la personalidad, ¿cuál de las siguientes opciones es un ejemplo de esta propuesta?",
    options: [
      { letter: "A", text: "La posibilidad de que los estudiantes puedan elegir al docente que imparta las distintas asignaturas." },
      { letter: "B", text: "La prohibición de impartir un solo culto religioso para respetar la diversidad de creencias en el colegio." },
      { letter: "C", text: "La autorización para que las estudiantes en estado de embarazo continúen con sus estudios si así lo desean." },
      { letter: "D", text: "La apertura de un programa de alimentación escolar que garantice la adecuada nutrición de los estudiantes." }
    ],
    correctAnswer: "B",
    explanation: "La propuesta busca proteger el libre desarrollo de la personalidad dentro del manual de convivencia. La opción B reconoce la diversidad de creencias y evita imponer un único culto religioso, lo cual favorece la autonomía y la expresión de distintas convicciones personales. Por eso, la respuesta correcta es B."
  }




  ,
  {
    uid: "s2-soc-019",
    session: 2,
    block: 1,
    number: 19,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Pueblos indígenas, biodiversidad y responsabilidad ambiental",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 19",
    stem: "Diversos estudios han encontrado que la biodiversidad en territorios habitados por indígenas de diferentes países está igual o mejor preservada que la que se encuentra en áreas naturales protegidas por el Estado; por ello, hay un creciente reconocimiento del liderazgo que deben tener los pueblos indígenas en la conservación y cuidado del planeta. Teniendo en cuenta lo anterior, en un congreso internacional en el que se analizan los efectos del cambio climático y la pérdida de biodiversidad, se ha propuesto que cada país incluya en sus programas de gobierno la obligación de consultar a los pueblos indígenas de su territorio para formular las políticas ambientales.",
    prompt: "Si la propuesta se implementa, ¿qué efecto NO deseado podría tener esta solución?",
    options: [
      { letter: "A", text: "Que se disminuya la participación de los pueblos indígenas en la formulación de políticas dirigidas a otros ámbitos como el de la salud, la cultura, el comercio o el trabajo." },
      { letter: "B", text: "Que se fortalezca una mirada colonialista sobre el medio ambiente que se basa en la necesidad de separar al ser humano de la naturaleza para poder preservarla." },
      { letter: "C", text: "Que se fortalezca la articulación entre los conocimientos, saberes y prácticas de los pueblos indígenas y la definición de los programas gubernamentales de protección ambiental." },
      { letter: "D", text: "Que se disminuya la responsabilidad que tienen las personas pertenecientes a otras poblaciones frente a los deberes de cuidado, preservación y compromiso con la protección de la naturaleza." }
    ],
    correctAnswer: "D",
    explanation: "La propuesta reconoce el liderazgo de los pueblos indígenas en la protección ambiental. Sin embargo, un efecto no deseado podría ser que otros grupos sociales interpreten que el cuidado de la naturaleza es responsabilidad exclusiva de los pueblos indígenas y reduzcan su propio compromiso ambiental. Por eso, la respuesta correcta es D."
  }


  ,
  {
    uid: "s2-soc-020",
    session: 2,
    block: 1,
    number: 20,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Conflictos socioambientales y manejo de especies invasoras",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 20",
    stem: "El pez león es una especie marina invasora que no tiene depredadores en las costas colombianas y que se ha convertido en una amenaza para los ecosistemas marinos. Por esta razón, se han propuesto dos soluciones para combatir su acelerado crecimiento: 1) promover la caza intensiva del pez león, lo cual impedirá que deprede la fauna y la flora en las zonas marinas; y 2) promover el consumo del pez león, lo cual permitirá el crecimiento económico de las zonas pesqueras.",
    prompt: "De acuerdo con lo anterior, ¿las dos propuestas descritas son compatibles entre sí?",
    options: [
      { letter: "A", text: "Sí, porque el crecimiento económico de las zonas pesqueras permitirá un mejor cuidado de los ecosistemas marinos." },
      { letter: "B", text: "No, porque la caza intensiva busca erradicar al pez león para evitar cualquier impacto en los ecosistemas marinos." },
      { letter: "C", text: "Sí, porque se puede promover el consumo de los peces león que sean cazados para evitar su propagación." },
      { letter: "D", text: "No, porque el cultivo de peces león para su consumo impedirá controlar su impacto en los ecosistemas." }
    ],
    correctAnswer: "C",
    explanation: "Las dos propuestas son compatibles: la caza intensiva ayuda a controlar la propagación del pez león y, al mismo tiempo, los ejemplares cazados pueden destinarse al consumo para beneficiar económicamente a las comunidades pesqueras. Por eso, la respuesta correcta es C."
  }



  ,
  {
    uid: "s2-soc-021",
    session: 2,
    block: 1,
    number: 21,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Constitución Política y reformas constitucionales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 21",
    stem: "Ante los alarmantes casos de feminicidio en el país, un candidato a la Presidencia de la República, durante una rueda de prensa, aseguró que, en caso de ser elegido, su primera medida sería realizar una reforma constitucional que permita condenar a cadena perpetua a quienes cometan este tipo de delitos contra las mujeres.",
    prompt: "De acuerdo con la Constitución Política de Colombia, en caso de ser elegido el candidato, ¿podría implementar su propuesta?",
    options: [
      { letter: "A", text: "No, porque el poder judicial es el encargado de dictar las sentencias sobre los casos de feminicidio, no el presidente." },
      { letter: "B", text: "Sí, porque el presidente de la República tiene la facultad de realizar reformas constitucionales cuando lo considere necesario." },
      { letter: "C", text: "No, porque el Congreso es el único órgano que cuenta con las facultades para llevar a cabo reformas constitucionales." },
      { letter: "D", text: "Sí, porque todos los colombianos rechazan el feminicidio y el presidente está en la obligación de cumplir la voluntad del pueblo." }
    ],
    correctAnswer: "C",
    explanation: "La propuesta exige modificar la Constitución, y un presidente no puede implementar una reforma constitucional de manera unilateral. En el contexto de la pregunta, la opción que mejor contradice la afirmación del candidato es que dicha facultad no corresponde directamente al presidente. Por eso, la respuesta correcta es C."
  }



  ,
  {
    uid: "s2-soc-022",
    session: 2,
    block: 1,
    number: 22,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Historia política de Colombia, liderazgo popular y crítica a las élites",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 22",
    stem: "Lea con atención el siguiente discurso de un político colombiano, pronunciado en Bogotá en 1946:",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Discurso en Bogotá, 1946</h3>
            <blockquote>“Ante el agrietamiento de la oligarquía, ante el hecho de no haber podido imponer los candidatos contra la opinión pública, ante el hecho de haber fracasado con la intransigencia y haber fracasado con la transigencia, ante el hecho de haber puesto al Partido Conservador a decidir de la suerte del candidato liberal y no haberlo logrado, hemos llegado ya, entonces, ante el peligro de esta avalancha humana, que no es mi nombre sino la restauración moral y democrática de la república, ¡libra una batalla, librará una batalla!, ¡vencerá a la oligarquía liberal y aplastará a la oligarquía conservadora!”.</blockquote>
            <p class="reading-source">Tomado y adaptado de: Wikisource. (s. f.). <em>Discurso en el Teatro Municipal de 1946</em>.</p>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la evidencia para afirmar que el anterior discurso fue pronunciado por Jorge Eliécer Gaitán?",
    options: [
      { letter: "A", text: "Su discurso caudillista con el que advierte lo perjudicial de un levantamiento popular para la estabilidad del país." },
      { letter: "B", text: "Su intención de criticar a los políticos tradicionales como estrategia para posicionar sus intereses electorales." },
      { letter: "C", text: "Su propósito de construir alianzas partidistas para garantizar la paz y el respeto por la democracia en el país." },
      { letter: "D", text: "Su crítica a la concentración del poder entre los partidos Liberal y Conservador en el marco del Frente Nacional." }
    ],
    correctAnswer: "B",
    explanation: "El discurso critica directamente a las élites u oligarquías liberal y conservadora, rasgo asociado al lenguaje político de Jorge Eliécer Gaitán y a su estrategia de disputar el apoyo popular frente a los políticos tradicionales. Por eso, la respuesta correcta es B."
  }


  ,
  {
    uid: "s2-soc-023",
    session: 2,
    block: 1,
    number: 23,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Discriminación, diversidad sexual y derechos humanos",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 23",
    stem: "Lee la siguiente noticia:",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Noticia</h3>
            <p>“Un presunto caso de discriminación se presentó en contra de un congresista cuando se encontraba debatiendo un proyecto de ley para eliminar las terapias de conversión, una terapia que busca cambiar por la fuerza la orientación sexual de las personas homosexuales, por medio de ritos y prácticas cuestionables. El congresista fue acusado por dos colegas suyos de tener un conflicto de interés, debido a que la ley lo beneficiaba a él directamente, por hacer parte de la comunidad homosexual. Así lo denunció el mismo congresista a los medios de comunicación”.</p>
            <p class="reading-source">Tomado y adaptado de: Saavedra, L. (8 de junio de 2022). <em>Caracol Radio</em>.</p>
          </div>
        `
      }
    ],
    prompt: "¿Qué concepto social podría definir la situación enunciada en la noticia?",
    options: [
      { letter: "A", text: "Transfobia." },
      { letter: "B", text: "Homofobia." },
      { letter: "C", text: "Xenofobia." },
      { letter: "D", text: "Misoginia." }
    ],
    correctAnswer: "B",
    explanation: "La situación se relaciona con discriminación hacia una persona por su orientación sexual homosexual. Este tipo de rechazo o prejuicio se denomina homofobia. Por eso, la respuesta correcta es B."
  }


  ,
  {
    uid: "s2-soc-024",
    session: 2,
    block: 1,
    number: 24,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Geografía histórica, manejo del agua y adaptación al territorio",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 24",
    stem: "El pueblo maya se asentó en la península de Yucatán, en donde desarrolló sistemas sofisticados de recolección y almacenamiento de aguas lluvias y subterráneas.",
    resources: [],
    prompt: "¿Cuál de las siguientes características es un factor geográfico de la península de Yucatán que explica el desarrollo de dichos sistemas?",
    options: [
      { letter: "A", text: "El intercambio comercial que los mayas pudieron establecer con las poblaciones asentadas en las islas del Caribe, porque así pudieron aprender nuevas técnicas de construcción." },
      { letter: "B", text: "Las intensas lluvias durante todo el año, porque esto obligó a los mayas a construir edificios resistentes para resguardarse y asegurar la supervivencia de la población." },
      { letter: "C", text: "Las guerras permanentes con otras civilizaciones en América como los incas, porque gracias a las elaboradas técnicas de construcción maya sus enemigos no destruyeron sus acueductos." },
      { letter: "D", text: "La ausencia de ríos o fuentes hídricas superficiales, situación que obligó a los mayas a organizarse y hacer construcciones para garantizar el abastecimiento permanente de agua." }
    ],
    correctAnswer: "D",
    explanation: "La península de Yucatán se caracteriza por la escasez de ríos superficiales, lo que hizo necesario desarrollar sistemas de captación y almacenamiento de agua lluvia y subterránea. Por eso, la respuesta correcta es D."
  }



  ,
  {
    uid: "s2-soc-025",
    session: 2,
    block: 1,
    number: 25,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Desarrollo sostenible, equidad y protección de recursos naturales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 25",
    stem: "Considere el siguiente fragmento:",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">Sociales y Ciudadanas</div>
            <h3>Desarrollo sostenible</h3>
            <blockquote>“No podemos apoyar un modelo de desarrollo que agota nuestros recursos naturales y destruye el ambiente en el que coexistimos y del que dependemos para sobrevivir; por lo tanto, no llegaremos muy lejos con un desarrollo desequilibrado que, desproporcionadamente, beneficia a los pocos ricos y deja atrás a los pobres extremos. El desarrollo sostenible es un modelo de desarrollo que podemos mantener y apoyar. Queremos crecer juntos, transformándonos en una sociedad más justa y equitativa; queremos también prosperar en el presente, pero sin comprometer los recursos del futuro”.</blockquote>
            <p class="reading-source">Tomado y adaptado de: ONU México. <em>¿Qué es el desarrollo sostenible y por qué es importante?</em></p>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con el texto anterior, ¿cuál de las siguientes afirmaciones apoya el desarrollo sostenible?",
    options: [
      { letter: "A", text: "Una protección de la naturaleza que no ponga en riesgo la distribución actual de la riqueza." },
      { letter: "B", text: "Un crecimiento económico que aproveche en el presente todos los recursos naturales." },
      { letter: "C", text: "Una explotación ilimitada de recursos naturales que beneficie a pobres y ricos por igual." },
      { letter: "D", text: "Un crecimiento económico que asegure la preservación de los recursos naturales." }
    ],
    correctAnswer: "D",
    explanation: "El desarrollo sostenible busca satisfacer las necesidades del presente sin comprometer los recursos del futuro. Por eso, la afirmación que mejor apoya esta idea es promover el crecimiento económico asegurando la preservación de los recursos naturales. La respuesta correcta es D."
  }


  ,
  {
    uid: "s2-soc-026",
    session: 2,
    block: 1,
    number: 26,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Ambiente, desarrollo sostenible y derechos colectivos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 26",
    stem: "En un municipio se propone construir una carretera que atravesaría una zona de páramo. Según la alcaldía, la obra permitiría mejorar el transporte de productos agrícolas y fortalecer la economía local. Sin embargo, varias organizaciones ambientales advierten que el páramo abastece de agua a diferentes comunidades y que la construcción podría afectar gravemente este ecosistema. Algunos comerciantes apoyan la obra porque consideran que generará empleo y aumentará sus ingresos. Por su parte, varios habitantes rurales afirman que el acceso al agua debe protegerse por encima de los beneficios económicos inmediatos.",
    resources: [],
    prompt: "De acuerdo con la situación anterior, ¿cuál de los siguientes argumentos permite defender mejor la protección del páramo?",
    options: [
      { letter: "A", text: "La construcción de la carretera debe realizarse porque el crecimiento económico del municipio beneficia a todos sus habitantes." },
      { letter: "B", text: "La decisión debe dejarse únicamente en manos de los comerciantes, porque ellos serían los principales beneficiados por la obra." },
      { letter: "C", text: "La protección del páramo es prioritaria, porque de este ecosistema depende el acceso al agua y el equilibrio ambiental de varias comunidades." },
      { letter: "D", text: "La carretera debe construirse si la mayoría de los habitantes vota a favor, sin considerar los posibles impactos ambientales." }
    ],
    correctAnswer: "C",
    explanation: "La opción C reconoce la importancia del páramo como ecosistema estratégico y relaciona su protección con derechos colectivos, como el acceso al agua y el ambiente sano. Por eso, la respuesta correcta es C."
  }

  ,
  {
    uid: "s2-soc-027",
    session: 2,
    block: 1,
    number: 27,
    area: "Sociales y Ciudadanas",
    competencia: "Convivencia y paz",
    componente: "Inclusión, migración y diversidad cultural",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 27",
    stem: "En una institución educativa, algunos estudiantes migrantes han manifestado sentirse excluidos porque sus compañeros hacen burlas sobre su acento y sus costumbres. Ante esta situación, un docente propone realizar actividades pedagógicas para que los estudiantes conozcan diferentes tradiciones culturales y reflexionen sobre la importancia del respeto a la diversidad. Sin embargo, algunos padres de familia se oponen a la propuesta, argumentando que ‘los estudiantes extranjeros deberían adaptarse completamente a las costumbres del país donde ahora viven’.",
    resources: [],
    prompt: "¿Cuál de las siguientes afirmaciones cuestiona mejor la postura de los padres de familia?",
    options: [
      { letter: "A", text: "Los estudiantes migrantes deben abandonar sus costumbres para evitar conflictos dentro de la institución educativa." },
      { letter: "B", text: "La convivencia escolar exige reconocer y respetar la diversidad cultural, sin obligar a los estudiantes a renunciar a su identidad." },
      { letter: "C", text: "Las instituciones educativas deben evitar tratar temas culturales porque estos pertenecen únicamente al ámbito familiar." },
      { letter: "D", text: "Los estudiantes nacionales deben recibir un trato preferencial porque pertenecen a la cultura mayoritaria del país." }
    ],
    correctAnswer: "B",
    explanation: "La opción B defiende el respeto por la diversidad cultural y rechaza una postura discriminatoria o asimilacionista frente a los estudiantes migrantes. Por eso, la respuesta correcta es B."
  }

  ,
  {
    uid: "s2-soc-028",
    session: 2,
    block: 1,
    number: 28,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Equidad, política pública y brecha digital",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Sociales y Ciudadanas - Pregunta 28",
    stem: "El Gobierno nacional creó un programa de apoyo económico para mujeres emprendedoras. Para acceder al beneficio, las interesadas deben inscribirse únicamente por internet y cargar varios documentos en una plataforma digital. No obstante, varias mujeres de zonas rurales no han podido postularse porque en sus veredas no hay conexión estable a internet y muchas de ellas no cuentan con equipos tecnológicos. Ante esta situación, algunas organizaciones sociales afirman que el programa, aunque busca promover la equidad, no está llegando a todas las mujeres que lo necesitan.",
    resources: [],
    prompt: "¿Qué factor se está pasando por alto en el diseño de este programa?",
    options: [
      { letter: "A", text: "La necesidad de exigir mayores requisitos digitales para garantizar que solo participen personas con experiencia empresarial." },
      { letter: "B", text: "La importancia de priorizar exclusivamente a las mujeres que viven en ciudades, porque tienen más posibilidades de crear empresas." },
      { letter: "C", text: "La desigualdad en el acceso a internet y a herramientas tecnológicas entre mujeres urbanas y rurales." },
      { letter: "D", text: "La obligación de reemplazar todos los programas económicos por capacitaciones presenciales." }
    ],
    correctAnswer: "C",
    explanation: "La opción C identifica una barrera de acceso relacionada con la brecha digital y la desigualdad territorial, lo cual puede impedir que el programa cumpla su propósito de equidad. Por eso, la respuesta correcta es C."
  }


  ,
  {
    uid: "s2-mat-029",
    session: 2,
    block: 2,
    number: 29,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Clasificación de polígonos según número de lados",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 29",
    stem: "En la figura se muestran seis polígonos, los cuales se distribuyeron en dos grupos. El grupo X se compone de los tres polígonos con mayor número de lados; los otros tres polígonos conforman el grupo Z.",
    resources: [
      {
        type: "html",
        html: `
          <div class="geometry-card" style="display:grid;gap:14px;justify-items:center">
            <svg viewBox="0 0 620 360" role="img" aria-label="Seis polígonos distribuidos en los grupos X y Z" style="width:min(100%,640px);height:auto;border:1px solid var(--line);border-radius:18px;background:var(--panel);padding:12px">
              <defs>
                <filter id="softShadow29" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.18"/>
                </filter>
              </defs>
              <path d="M70,75 C125,25 222,34 280,90 C330,138 319,220 255,268 C190,316 82,284 52,210 C35,165 35,108 70,75Z" fill="none" stroke="currentColor" stroke-width="8" opacity="0.85"/>
              <path d="M360,64 C430,22 534,41 565,117 C594,188 560,292 477,315 C400,338 330,287 334,220 C337,170 310,113 360,64Z" fill="none" stroke="currentColor" stroke-width="8" opacity="0.85"/>
              <text x="112" y="58" font-size="36" font-weight="900" fill="currentColor">X</text>
              <text x="514" y="58" font-size="36" font-weight="900" fill="currentColor">Z</text>

              <polygon points="171,82 230,82 214,155 184,155" fill="#9aa3ad" stroke="#64748b" stroke-width="4" filter="url(#softShadow29)"/>
              <polygon points="122,202 170,218 160,251 194,268 144,279 104,245" fill="#9aa3ad" stroke="#64748b" stroke-width="4" filter="url(#softShadow29)"/>
              <polygon points="263,162 308,146 340,174 330,220 302,214 283,235 252,210" fill="#9aa3ad" stroke="#64748b" stroke-width="4" filter="url(#softShadow29)"/>

              <polygon points="448,70 493,150 402,150" fill="#9aa3ad" stroke="#64748b" stroke-width="4" filter="url(#softShadow29)"/>
              <polygon points="414,190 475,213 435,232 408,255" fill="#9aa3ad" stroke="#64748b" stroke-width="4" filter="url(#softShadow29)"/>
              <polygon points="465,260 500,292 465,325 430,292" fill="#9aa3ad" stroke="#64748b" stroke-width="4" filter="url(#softShadow29)"/>
            </svg>
          </div>
        `
      }
    ],
    prompt: "Entre los polígonos del grupo X, ¿cuál tiene menor número de lados?",
    options: [
      { letter: "A", isHtml: true, text: `<div style="display:flex;align-items:center;gap:12px"><svg viewBox="0 0 90 90" style="width:70px;height:70px"><polygon points="45,8 82,78 8,78" fill="#9aa3ad" stroke="#64748b" stroke-width="5"/></svg><span>Triángulo.</span></div>` },
      { letter: "B", isHtml: true, text: `<div style="display:flex;align-items:center;gap:12px"><svg viewBox="0 0 90 90" style="width:70px;height:70px"><polygon points="45,6 80,45 45,84 10,45" fill="#9aa3ad" stroke="#64748b" stroke-width="5"/></svg><span>Rombo.</span></div>` },
      { letter: "C", isHtml: true, text: `<div style="display:flex;align-items:center;gap:12px"><svg viewBox="0 0 90 90" style="width:70px;height:70px"><polygon points="26,16 65,31 56,55 78,68 37,76 11,52" fill="#9aa3ad" stroke="#64748b" stroke-width="5"/></svg><span>Polígono cóncavo del grupo X.</span></div>` },
      { letter: "D", isHtml: true, text: `<div style="display:flex;align-items:center;gap:12px"><svg viewBox="0 0 90 90" style="width:70px;height:70px"><polygon points="18,12 72,12 59,78 31,78" fill="#9aa3ad" stroke="#64748b" stroke-width="5"/></svg><span>Polígono tipo trapecio.</span></div>` }
    ],
    correctAnswer: "C",
    explanation: "El grupo X contiene los tres polígonos con mayor número de lados. Al comparar únicamente esos polígonos, el polígono cóncavo de la opción C es el que tiene menor número de lados dentro de ese grupo. Por tanto, la respuesta correcta es C."
  }
,

  {
    uid: "s2-mat-030",
    session: 2,
    block: 2,
    number: 30,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Estadística descriptiva",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 30",
    stem: "Una persona quiere comprar un teléfono celular de alta tecnología. Para ello, elabora la siguiente tabla con siete opciones, en la que se indica la marca, el modelo y el precio para cada una de estas:",
    context: [
      {
        type: "html",
        content: `
          <div class="table-wrap" role="img" aria-label="Tabla de marcas, modelos y precios de teléfonos celulares">
            <table class="data-table compact-table">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Precio en pesos</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Ringring</td><td>X1</td><td>1.400.000</td></tr>
                <tr><td>SoiBeep</td><td>Enos</td><td>1.200.000</td></tr>
                <tr><td>Ringring</td><td>X2</td><td>1.400.000</td></tr>
                <tr><td>SoiBeep</td><td>Gow1</td><td>1.500.000</td></tr>
                <tr><td>Telebene</td><td>Gaia</td><td>1.600.000</td></tr>
                <tr><td>Uthil</td><td>Hul</td><td>1.250.000</td></tr>
                <tr><td>Uthil</td><td>Paxx</td><td>1.350.000</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "Si la persona decide comprar el teléfono celular de menor precio, ¿cuál debe ser la marca de su elección?",
    options: [
      { letter: "A", text: "Ringring." },
      { letter: "B", text: "Telebene." },
      { letter: "C", text: "SoiBeep." },
      { letter: "D", text: "Uthil." }
    ],
    correctAnswer: "C",
    explanation: "Al comparar los precios de la tabla, el menor valor es 1.200.000 pesos. Ese precio corresponde al modelo Enos de la marca SoiBeep. Por tanto, la respuesta correcta es C."
  }


,
  {
    uid: "s2-mat-031",
    session: 2,
    block: 2,
    number: 31,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Conteo, principio multiplicativo y combinatoria",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 31",
    stem: "En una ciudad hay dos tipos de placas para identificar los vehículos: Tipo 1: para vehículos particulares y de transporte público, placa con 3 letras y 3 dígitos; tanto las letras como los dígitos se pueden repetir. Tipo 2: para vehículos de transporte pesado, placa con la letra T seguida de 4 dígitos; los dígitos se pueden repetir.",
    resources: [],
    prompt: "Sabiendo que hay 26 letras y 10 dígitos, ¿cuál es la expresión que permite calcular el número máximo de placas de los dos tipos que pueden registrarse en esa ciudad?",
    options: [
      { letter: "A", isHtml: true, text: "26<sup>3</sup> × 10<sup>3</sup> + 26 × 10<sup>4</sup>" },
      { letter: "B", isHtml: true, text: "(26<sup>3</sup> + 1) × (10<sup>3</sup> + 10<sup>4</sup>)" },
      { letter: "C", isHtml: true, text: "(26<sup>3</sup> + 26) × (10<sup>3</sup> + 10<sup>4</sup>)" },
      { letter: "D", isHtml: true, text: "26<sup>3</sup> × 10<sup>3</sup> + 1 × 10<sup>4</sup>" }
    ],
    correctAnswer: "D",
    explanation: "Para las placas tipo 1 hay 26 opciones para cada una de las 3 letras y 10 opciones para cada uno de los 3 dígitos, por lo que se obtienen 26³ × 10³ placas. Para las placas tipo 2, la letra T es fija, así que solo hay 1 opción de letra y 10 opciones para cada uno de los 4 dígitos: 1 × 10⁴. Al sumar ambos tipos, la expresión correcta es 26³ × 10³ + 1 × 10⁴. Por tanto, la respuesta correcta es D."
  }

,
  {
    uid: "s2-mat-032",
    session: 2,
    block: 2,
    number: 32,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Aritmética, división entera y comparación de cantidades",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 32",
    stem: "Una persona cuenta con $5.000 para comprar la mayor cantidad posible de paquetes de papas fritas. En el supermercado 1 venden un paquete de papas fritas en $1.000 y ofrecen la promoción \"lleve 5 paquetes por el precio de 4\". Para saber cuántos paquetes puede comprar, se efectúa el procedimiento indicado. En el supermercado 2 venden cada paquete a $850.",
    context: [
      {
        type: "html",
        content: `
          <div class="procedure-card" style="display:grid;gap:14px">
            <div class="callout" style="padding:14px 16px;border:1px solid var(--line);border-radius:16px;background:var(--panel)">
              <strong>Supermercado 1</strong><br>
              Precio por paquete: <strong>$1.000</strong><br>
              Promoción: <strong>lleve 5 paquetes por el precio de 4</strong>
            </div>
            <div class="table-wrap" role="img" aria-label="Procedimiento para calcular la cantidad de paquetes en el supermercado 1">
              <table class="data-table compact-table">
                <tbody>
                  <tr><th>Paso 1</th><td>Dividir la cantidad de dinero entre $1.000 y aproximar al entero menor más próximo.</td></tr>
                  <tr><th>Paso 2</th><td>Dividir el número obtenido en el paso 1 entre 4 y aproximar al entero menor más próximo.</td></tr>
                  <tr><th>Paso 3</th><td>Sumar los resultados de los pasos 1 y 2.</td></tr>
                </tbody>
              </table>
            </div>
            <div class="callout" style="padding:14px 16px;border:1px solid var(--line);border-radius:16px;background:var(--panel)">
              <strong>Supermercado 2</strong><br>
              Precio por paquete: <strong>$850</strong><br>
              Procedimiento: dividir la cantidad de dinero entre $850 y aproximar al entero menor más próximo.
            </div>
          </div>
        `
      }
    ],
    prompt: "Con los $5.000, ¿en cuál de los dos supermercados puede comprar una mayor cantidad de paquetes de papas fritas?",
    options: [
      { letter: "A", text: "En el supermercado 1, pues puede comprar 5 paquetes de papas." },
      { letter: "B", text: "En el supermercado 2, pues puede comprar 5 paquetes de papas." },
      { letter: "C", text: "En el supermercado 1, pues puede comprar 6 paquetes de papas." },
      { letter: "D", text: "En el supermercado 2, pues puede comprar 6 paquetes de papas." }
    ],
    correctAnswer: "C",
    explanation: "En el supermercado 1, con $5.000 puede pagar 5 paquetes de $1.000. Como por cada 4 paquetes pagados recibe 1 adicional, obtiene 1 paquete extra: 5 + 1 = 6 paquetes. En el supermercado 2, $5.000 ÷ $850 = 5 paquetes completos, porque no alcanza para 6. Por tanto, compra más paquetes en el supermercado 1 y la respuesta correcta es C."
  }



,
  {
    uid: "s2-mat-033",
    session: 2,
    block: 2,
    number: 33,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Proporcionalidad directa y patrones numéricos",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 33",
    stem: "Sobre una carretera recta un automóvil viaja a rapidez constante. A partir de cierto momento, se registra la distancia que ha recorrido el automóvil cada minuto. La tabla que contiene dichos datos es la siguiente:",
    context: [
      {
        type: "html",
        content: `
          <div class="table-wrap" role="img" aria-label="Tabla de tiempo y distancia recorrida por un automóvil">
            <table class="data-table compact-table">
              <tbody>
                <tr>
                  <th>Tiempo (min)</th>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <th>Distancia recorrida (km)</th>
                  <td>3</td>
                  <td>6</td>
                  <td>9</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "¿Cuál debe ser el valor de la distancia correspondiente al minuto 4 y qué tipo de proporcionalidad existe entre la distancia recorrida y el tiempo?",
    options: [
      { letter: "A", text: "12 y la proporcionalidad es inversa." },
      { letter: "B", text: "16 y la proporcionalidad es directa." },
      { letter: "C", text: "12 y la proporcionalidad es directa." },
      { letter: "D", text: "16 y la proporcionalidad es inversa." }
    ],
    correctAnswer: "C",
    explanation: "La distancia aumenta 3 km por cada minuto: 1 minuto corresponde a 3 km, 2 minutos a 6 km y 3 minutos a 9 km. Por tanto, en 4 minutos recorrerá 12 km. Como al aumentar el tiempo aumenta la distancia en la misma proporción, la relación es de proporcionalidad directa. La respuesta correcta es C."
  }

,
  {
    uid: "s2-mat-034",
    session: 2,
    block: 2,
    number: 34,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Expresiones algebraicas y representación de datos",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 34",
    stem: "Sofía ha diseñado la siguiente tabla para relacionar la estatura de uno de sus pacientes con la edad, durante sus primeros cuatro meses de vida.",
    context: [
      {
        type: "html",
        content: `
          <div class="table-wrap" role="img" aria-label="Tabla de edad en meses y estatura en centímetros">
            <table class="data-table compact-table">
              <thead>
                <tr>
                  <th>Edad (meses)</th>
                  <th>Estatura (centímetros)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>73</td></tr>
                <tr><td>2</td><td>79</td></tr>
                <tr><td>3</td><td>85</td></tr>
                <tr><td>4</td><td>91</td></tr>
              </tbody>
            </table>
          </div>
          <div class="formula-card" style="margin-top:14px;padding:14px 16px;border:1px solid var(--line);border-radius:16px;background:var(--panel);text-align:center;font-weight:800">
            Estatura = 67 − (6 × edad)
          </div>
        `
      }
    ],
    prompt: "¿Es verdadero afirmar que la expresión algebraica establecida por Sofía permite representar la información presentada en la tabla?",
    options: [
      { letter: "A", text: "Sí, porque, al reemplazar las edades presentadas en la tabla en la expresión, se obtiene cada una de las estaturas presentadas allí." },
      { letter: "B", text: "No, porque la cantidad que multiplica a la edad en la expresión encontrada debe ser 18." },
      { letter: "C", text: "No, porque, por ejemplo, para un mes de edad, la estatura es diferente de 67 − 6." },
      { letter: "D", text: "Sí, porque para hallar la estatura hay que multiplicar la edad por −6." }
    ],
    correctAnswer: "C",
    explanation: "La expresión propuesta no representa la tabla. Si edad = 1, la expresión da 67 − 6 = 61, pero en la tabla la estatura correspondiente es 73 cm. Por tanto, la afirmación es falsa y la respuesta correcta es C."
  }

,
  {
    uid: "s2-mat-035",
    session: 2,
    block: 2,
    number: 35,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Probabilidad, combinatoria y conteo",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 35",
    stem: "En una bolsa hay 9 bolas de igual peso y tamaño, 4 azules y 5 negras. Un concurso consiste en sacar, en un solo intento, 3 bolas de la bolsa. La persona gana si al menos 2 de las bolas son azules. La probabilidad de ganar se puede calcular como:",
    context: [
      {
        type: "html",
        content: `
          <div class="formula-card" style="margin:14px 0;padding:14px 16px;border:1px solid var(--line);border-radius:16px;background:var(--panel);text-align:center;font-weight:800">
            Probabilidad = <span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1.15;margin-left:6px">
              <span style="border-bottom:2px solid currentColor;padding:0 8px 4px">Número de casos favorables</span>
              <span style="padding-top:4px">Número de casos posibles</span>
            </span>
          </div>
          <div class="info-card" style="margin-top:12px">
            <p>El número de casos favorables se obtiene a partir de la suma de:</p>
            <ul>
              <li>El número de formas de escoger 2 bolas azules entre las 4 azules y 1 bola negra entre las 5 negras.</li>
              <li>El número de formas de escoger 3 bolas azules entre las 4 azules.</li>
            </ul>
          </div>
        `
      }
    ],
    prompt: "Para conocer esta probabilidad, se debe calcular, también, el número de",
    options: [
      { letter: "A", text: "formas de escoger 6 bolas en un conjunto de 9 bolas." },
      { letter: "B", text: "formas de escoger 6 bolas en un conjunto de 6 bolas." },
      { letter: "C", text: "formas de escoger 3 bolas en un conjunto de 9 bolas." },
      { letter: "D", text: "formas de escoger 3 bolas en un conjunto de 6 bolas." }
    ],
    correctAnswer: "C",
    explanation: "Para calcular una probabilidad se necesitan los casos favorables y los casos posibles. Como el experimento consiste en sacar 3 bolas de una bolsa con 9 bolas, el número de casos posibles corresponde a las formas de escoger 3 bolas entre las 9 disponibles. Por tanto, la respuesta correcta es C."
  }
,
  {
    uid: "s2-mat-036",
    session: 2,
    block: 2,
    number: 36,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Promedio aritmético y ecuaciones sencillas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 36",
    stem: "En una biblioteca escolar se registró la cantidad de libros leídos por cuatro estudiantes durante un mes. Luego, se desea incluir el dato de un quinto estudiante para que el promedio del grupo sea de 6 libros.",
    resources: [
      {
        type: "table",
        caption: "Libros leídos durante el mes",
        headers: ["Estudiante", "Cantidad de libros"],
        rows: [
          ["1", "3"],
          ["2", "5"],
          ["3", "4"],
          ["4", "8"],
          ["5", "x"]
        ]
      }
    ],
    prompt: "¿Cuántos libros debe haber leído el quinto estudiante para que el promedio sea 6?",
    options: [
      { letter: "A", text: "8 libros." },
      { letter: "B", text: "9 libros." },
      { letter: "C", text: "10 libros." },
      { letter: "D", text: "12 libros." }
    ],
    correctAnswer: "C",
    explanation: "Para que 5 estudiantes tengan promedio de 6 libros, el total debe ser 5 × 6 = 30 libros. Los cuatro primeros leyeron 3 + 5 + 4 + 8 = 20 libros. Por tanto, el quinto debe haber leído 30 − 20 = 10 libros. La respuesta correcta es C."
  }
,
  {
    uid: "s2-mat-037",
    session: 2,
    block: 2,
    number: 37,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Geometría: área de figuras planas",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 37",
    stem: "En un parque se quiere sembrar césped en una zona rectangular. En el centro de esa zona habrá una plazoleta cuadrada donde no se sembrará césped, como se muestra en la figura.",
    resources: [
      {
        type: "html",
        html: `
          <div class="geometry-card" style="display:grid;gap:14px;justify-items:center">
            <svg viewBox="0 0 520 320" role="img" aria-label="Zona rectangular de 12 metros por 8 metros con una plazoleta cuadrada de 4 metros por 4 metros" style="width:min(100%,560px);height:auto;border:1px solid var(--line);border-radius:18px;background:var(--panel);padding:12px">
              <rect x="80" y="60" width="360" height="200" rx="8" fill="#d9f99d" stroke="#64748b" stroke-width="4"/>
              <rect x="200" y="110" width="120" height="120" rx="6" fill="#cbd5e1" stroke="#475569" stroke-width="4"/>
              <text x="246" y="52" font-size="22" font-weight="800" fill="currentColor">12 m</text>
              <text x="20" y="170" font-size="22" font-weight="800" fill="currentColor">8 m</text>
              <text x="238" y="102" font-size="18" font-weight="800" fill="currentColor">4 m</text>
              <text x="326" y="177" font-size="18" font-weight="800" fill="currentColor">4 m</text>
              <text x="218" y="176" font-size="16" font-weight="800" fill="currentColor">Plazoleta</text>
              <text x="180" y="286" font-size="16" fill="currentColor">Zona verde rectangular</text>
            </svg>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es el área de la zona donde se sembrará césped?",
    options: [
      { letter: "A", text: "48 m²." },
      { letter: "B", text: "80 m²." },
      { letter: "C", text: "96 m²." },
      { letter: "D", text: "112 m²." }
    ],
    correctAnswer: "B",
    explanation: "El área del rectángulo es 12 × 8 = 96 m². El área de la plazoleta cuadrada es 4 × 4 = 16 m². La zona de césped corresponde a 96 − 16 = 80 m². La respuesta correcta es B."
  }
,
  {
    uid: "s2-mat-038",
    session: 2,
    block: 2,
    number: 38,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Proporcionalidad directa y escala",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 38",
    stem: "En un mapa turístico se indica que 1 centímetro en el mapa representa 5 kilómetros en la realidad. La distancia entre dos pueblos en el mapa es de 7 centímetros.",
    resources: [
      {
        type: "html",
        html: `
          <div class="formula-card" style="margin:14px 0;padding:14px 16px;border:1px solid var(--line);border-radius:16px;background:var(--panel);text-align:center;font-weight:800">
            Escala: 1 cm → 5 km
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la distancia real entre los dos pueblos?",
    options: [
      { letter: "A", text: "35 km." },
      { letter: "B", text: "12 km." },
      { letter: "C", text: "25 km." },
      { letter: "D", text: "40 km." }
    ],
    correctAnswer: "A",
    explanation: "La escala indica que cada centímetro equivale a 5 km. Si en el mapa hay 7 cm, la distancia real es 7 × 5 = 35 km. La respuesta correcta es A."
  }
,
  {
    uid: "s2-mat-039",
    session: 2,
    block: 2,
    number: 39,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Porcentajes y lectura de tablas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 39",
    stem: "En una encuesta a 80 estudiantes se preguntó por el deporte que más practican. Los resultados se muestran en la siguiente tabla.",
    resources: [
      {
        type: "table",
        caption: "Deporte más practicado por los estudiantes",
        headers: ["Deporte", "Número de estudiantes"],
        rows: [
          ["Fútbol", "32"],
          ["Baloncesto", "24"],
          ["Voleibol", "24"]
        ]
      }
    ],
    prompt: "Un estudiante afirma que el voleibol representa el 40 % de las respuestas. ¿Es correcta su afirmación?",
    options: [
      { letter: "A", text: "Sí, porque 24 estudiantes equivalen al 40 % de 80." },
      { letter: "B", text: "Sí, porque el voleibol y el baloncesto tienen la misma cantidad de estudiantes." },
      { letter: "C", text: "No, porque el 40 % corresponde a 24 estudiantes y el voleibol tiene 32." },
      { letter: "D", text: "No, porque 24 estudiantes de 80 equivalen al 30 %, no al 40 %." }
    ],
    correctAnswer: "D",
    explanation: "Para hallar el porcentaje de estudiantes que practican voleibol se calcula 24 ÷ 80 = 0,30, es decir, 30 %. Por tanto, la afirmación del estudiante no es correcta. La respuesta correcta es D."
  }

,
  {
    uid: "s2-mat-040",
    session: 2,
    block: 2,
    number: 40,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Operaciones con números enteros y seguimiento de procedimientos",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 40",
    stem: "La calculadora de un computador quedó mal configurada y, ahora, al pedirle que haga la multiplicación entre dos números, ejecuta el siguiente proceso:",
    resources: [
      {
        type: "html",
        html: `
          <div class="procedure-card" style="margin:14px 0;padding:16px 18px;border:1px solid var(--line);border-radius:18px;background:var(--panel)">
            <ol style="margin:0;padding-left:22px;display:grid;gap:8px">
              <li>Suma los dos números.</li>
              <li>Eleva el resultado de la suma al cuadrado.</li>
              <li>Al resultado del paso anterior le suma 1.</li>
            </ol>
          </div>
        `
      }
    ],
    prompt: "¿Qué resultado obtendrá una persona que le pida a esta calculadora el producto entre -1 y 5?",
    options: [
      { letter: "A", text: "17" },
      { letter: "B", text: "26" },
      { letter: "C", text: "-5" },
      { letter: "D", text: "-15" }
    ],
    correctAnswer: "A",
    explanation: "La calculadora no multiplica directamente. Primero suma los números: -1 + 5 = 4. Luego eleva el resultado al cuadrado: 4² = 16. Finalmente suma 1: 16 + 1 = 17. La respuesta correcta es A."
  }



,
  {
    uid: "s2-mat-041",
    session: 2,
    block: 2,
    number: 41,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Geometría: comparación de longitudes y trayectorias",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 41",
    stem: "En un parque de diversiones, para desplazarse del juego P al juego Q una persona cuenta con las siguientes trayectorias:",
    resources: [
      {
        type: "html",
        html: `
          <div class="geometry-card" style="display:grid;gap:16px;justify-items:center">
            <svg viewBox="0 0 820 330" role="img" aria-label="Tres trayectorias entre los puntos P y Q: una línea recta, un camino triangular equilátero y un arco semicircular" style="width:min(100%,860px);height:auto;border:1px solid var(--line);border-radius:18px;background:var(--panel);padding:16px">
              <defs>
                <marker id="dot41" markerWidth="6" markerHeight="6" refX="3" refY="3">
                  <circle cx="3" cy="3" r="3" fill="currentColor" />
                </marker>
              </defs>
              <text x="90" y="36" font-size="24" font-weight="900" fill="currentColor">Trayectoria 1</text>
              <text x="350" y="36" font-size="24" font-weight="900" fill="currentColor">Trayectoria 2</text>
              <text x="625" y="36" font-size="24" font-weight="900" fill="currentColor">Trayectoria 3</text>

              <line x1="70" y1="145" x2="235" y2="145" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
              <text x="52" y="155" font-size="28" font-weight="900" fill="currentColor">P</text>
              <text x="245" y="155" font-size="28" font-weight="900" fill="currentColor">Q</text>

              <polyline points="350,210 440,70 530,210" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
              <text x="329" y="223" font-size="28" font-weight="900" fill="currentColor">P</text>
              <text x="436" y="58" font-size="28" font-weight="900" fill="currentColor">S</text>
              <text x="538" y="223" font-size="28" font-weight="900" fill="currentColor">Q</text>

              <path d="M620,210 A92,92 0 0 1 804,210" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
              <text x="600" y="223" font-size="28" font-weight="900" fill="currentColor">P</text>
              <text x="812" y="223" font-size="28" font-weight="900" fill="currentColor">Q</text>
            </svg>
            <div class="info-card" style="max-width:900px">
              <p>La trayectoria 1 corresponde a una línea recta que comunica los dos juegos.</p>
              <p>La trayectoria 2 corresponde a un camino que va hasta el juego S, de forma que el triángulo PQS es equilátero.</p>
              <p>La trayectoria 3 corresponde a un camino en forma de semicírculo donde el segmento PQ es un diámetro.</p>
            </div>
          </div>
        `
      }
    ],
    prompt: "De menor a mayor, ¿cuál es el orden de las longitudes de las trayectorias?",
    options: [
      { letter: "A", text: "Trayectoria 1, Trayectoria 3, Trayectoria 2." },
      { letter: "B", text: "Trayectoria 1, Trayectoria 2, Trayectoria 3." },
      { letter: "C", text: "Trayectoria 2, Trayectoria 3, Trayectoria 1." },
      { letter: "D", text: "Trayectoria 3, Trayectoria 2, Trayectoria 1." }
    ],
    correctAnswer: "A",
    explanation: "Si el segmento PQ mide d, la trayectoria 1 mide d. Como el triángulo PQS es equilátero, la trayectoria 2 mide PS + SQ = d + d = 2d. La trayectoria 3 es un semicírculo de diámetro d, por tanto mide la mitad de la circunferencia: πd/2, aproximadamente 1,57d. Entonces, de menor a mayor: trayectoria 1, trayectoria 3 y trayectoria 2. La respuesta correcta es A."
  }

,
  {
    uid: "s2-mat-042",
    session: 2,
    block: 2,
    number: 42,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Medidas de tendencia central: promedio aritmético",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 42",
    stem: "Las edades en años de los integrantes de un equipo que quiere participar en un torneo se muestran a continuación: 19, 28, 32, 19, 17, 28, 23, 28, 24, 15, 17.",
    resources: [
      {
        type: "html",
        html: `
          <div class="info-card" style="margin:14px 0">
            <p>El torneo tiene una norma que indica que, para que un equipo pueda participar, la edad promedio debe ser mayor a 25 años.</p>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes procedimientos permite establecer si el equipo puede o no participar?",
    options: [
      { letter: "A", text: "Paso 1. Sumar todas las edades de los integrantes. Paso 2. Dividir el valor obtenido en el paso 1 entre el número de integrantes. Paso 3. Comparar el valor obtenido en el paso 2 con respecto al número 25." },
      { letter: "B", text: "Paso 1. Sumar todas las edades de los integrantes. Paso 2. Multiplicar el valor obtenido en el paso 1 entre el número de integrantes. Paso 3. Comparar el valor obtenido en el paso 2 con respecto al número 25." },
      { letter: "C", text: "Paso 1. Ordenar las edades de menor a mayor. Paso 2. Identificar el dato que está en la posición central. Paso 3. Comparar el dato identificado en el paso anterior con el número 25." },
      { letter: "D", text: "Paso 1. Contar el número de veces que aparece cada edad. Paso 2. Identificar el dato que más veces se repite. Paso 3. Comparar el dato identificado en el paso anterior con el número 25." }
    ],
    correctAnswer: "A",
    explanation: "La norma habla de edad promedio. Para verificarla se debe calcular el promedio aritmético: sumar todas las edades, dividir entre el número de integrantes y comparar el resultado con 25. Las otras opciones calculan otras medidas o procedimientos incorrectos. La respuesta correcta es A."
  }




,
  {
    uid: "s2-mat-043",
    session: 2,
    block: 2,
    number: 43,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Geometría: cálculo de áreas por descomposición",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 43",
    stem: "En un terreno rectangular de 60 m × 40 m se ha decidido poner un jardín en medio, con la forma mostrada en la figura.",
    resources: [
      {
        type: "html",
        html: `
          <div class="geometry-card" style="display:grid;gap:16px;justify-items:center">
            <svg viewBox="0 0 760 470" role="img" aria-label="Terreno rectangular de 60 metros por 40 metros con un jardín central en forma de romboide" style="width:min(100%,820px);height:auto;border:1px solid var(--line);border-radius:18px;background:var(--panel);padding:16px">
              <defs>
                <marker id="arrow43" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
                </marker>
                <pattern id="gardenDots43" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="2.4" fill="currentColor" opacity=".35" />
                  <circle cx="14" cy="12" r="2" fill="currentColor" opacity=".28" />
                </pattern>
              </defs>

              <text x="380" y="32" text-anchor="middle" font-size="24" font-weight="900" fill="currentColor">Terreno rectangular: 60 m × 40 m</text>

              <rect x="90" y="70" width="560" height="320" fill="none" stroke="currentColor" stroke-width="5" />

              <polygon points="190,70 650,230 190,390 90,230" fill="url(#gardenDots43)" stroke="currentColor" stroke-width="5" stroke-linejoin="round" />
              <text x="360" y="225" text-anchor="middle" font-size="30" font-weight="900" fill="currentColor">Jardín</text>

              <line x1="90" y1="54" x2="650" y2="54" stroke="currentColor" stroke-width="3" marker-start="url(#arrow43)" marker-end="url(#arrow43)" />
              <text x="370" y="48" text-anchor="middle" font-size="24" font-weight="800" fill="currentColor">60 m</text>

              <line x1="670" y1="70" x2="670" y2="390" stroke="currentColor" stroke-width="3" marker-start="url(#arrow43)" marker-end="url(#arrow43)" />
              <text x="696" y="235" text-anchor="middle" font-size="24" font-weight="800" fill="currentColor" transform="rotate(90 696 235)">40 m</text>

              <text x="134" y="100" font-size="22" font-weight="900" fill="currentColor">10 m</text>
              <text x="100" y="176" font-size="22" font-weight="900" fill="currentColor">20 m</text>
              <text x="100" y="296" font-size="22" font-weight="900" fill="currentColor">20 m</text>
              <text x="134" y="374" font-size="22" font-weight="900" fill="currentColor">10 m</text>

              <text x="394" y="100" font-size="22" font-weight="900" fill="currentColor">50 m</text>
              <text x="588" y="176" font-size="22" font-weight="900" fill="currentColor">20 m</text>
              <text x="588" y="296" font-size="22" font-weight="900" fill="currentColor">20 m</text>
              <text x="394" y="374" font-size="22" font-weight="900" fill="currentColor">50 m</text>
            </svg>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es el área del jardín?",
    options: [
      { letter: "A", text: "120 m²" },
      { letter: "B", text: "2.400 m²" },
      { letter: "C", text: "1.200 m²" },
      { letter: "D", text: "100 m²" }
    ],
    correctAnswer: "C",
    explanation: "El área total del terreno rectangular es 60 × 40 = 2.400 m². Las zonas que quedan fuera del jardín forman cuatro triángulos: dos de base 10 m y altura 20 m, cada uno con área 100 m², y dos de base 50 m y altura 20 m, cada uno con área 500 m². El área fuera del jardín es 100 + 100 + 500 + 500 = 1.200 m². Por tanto, el área del jardín es 2.400 - 1.200 = 1.200 m². La respuesta correcta es C."
  }



,
  {
    uid: "s2-mat-044",
    session: 2,
    block: 2,
    number: 44,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Estadística: correlación lineal",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 44",
    stem: "La correlación estadística indica el grado en que dos o más variables están relacionadas linealmente y, generalmente, se mide a través del coeficiente de correlación de Pearson en una escala de -1 a 1.",
    resources: [
      {
        type: "html",
        html: `
          <div class="info-card" style="margin:14px 0">
            <ul>
              <li>Si este coeficiente está cercano a -1 o a 1, indica una relación lineal fuerte entre las variables.</li>
              <li>Si es positivo, indica que al aumentar el valor de una de las variables cabe esperar aumento en el valor de la otra; si es negativo, cabe esperar disminución en el valor de la otra.</li>
            </ul>
          </div>
          <div class="info-card" style="margin:14px 0">
            <p>Un consejero estudiantil analiza las notas de Física y Cálculo de 200 estudiantes de ingeniería y encuentra que el coeficiente de correlación es <strong>0,92</strong>, con lo cual afirma: “Si un estudiante tiene una nota alta en Física es muy probable que su nota en Cálculo sea alta”.</p>
          </div>
        `
      }
    ],
    prompt: "¿Por qué es verdadera la afirmación del consejero?",
    options: [
      { letter: "A", text: "Porque la nota de Física se obtiene al multiplicar 0,92 por la nota de Cálculo." },
      { letter: "B", text: "Porque 0,92 es menor que 1, lo cual indica que los datos están poco dispersos." },
      { letter: "C", text: "Porque 0,92 es un número real positivo y está cercano a uno." },
      { letter: "D", text: "Porque la constante de proporcionalidad de las notas es 0,92." }
    ],
    correctAnswer: "C",
    explanation: "El coeficiente de correlación 0,92 es positivo y está cercano a 1. Esto indica una relación lineal fuerte y directa: cuando una variable aumenta, se espera que la otra también aumente. Por eso, si una nota en Física es alta, es muy probable que la nota en Cálculo también sea alta. La respuesta correcta es C."
  }

,
  {
    uid: "s2-mat-045",
    session: 2,
    block: 2,
    number: 45,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Conteo: principio multiplicativo",
    dificultad: "Baja",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 45",
    stem: "Esteban y Santiago van a jugar fútbol en un videojuego. Antes de que empiece el partido, cada uno de ellos debe escoger un equipo con su respectivo uniforme. En el juego hay 10 equipos disponibles y cada equipo tiene 3 uniformes diferentes.",
    resources: [
      {
        type: "html",
        html: `
          <div class="info-card" style="margin:14px 0">
            <p><strong>Esteban dice</strong> que el primero que elige tiene <strong>30 posibilidades</strong> para escoger un equipo uniformado.</p>
          </div>
        `
      }
    ],
    prompt: "¿Es correcta la afirmación que hizo Esteban?",
    options: [
      { letter: "A", text: "Sí, porque 10 × 3 es la cantidad de formas posibles de escoger un equipo y un uniforme." },
      { letter: "B", text: "No, porque se debe calcular 10 + 3 para saber la cantidad de posibilidades." },
      { letter: "C", text: "Sí, porque en total hay 10 × 3 equipos de fútbol para jugar el partido." },
      { letter: "D", text: "No, porque cada equipo solo puede jugar una vez, entonces solo hay 10 opciones." }
    ],
    correctAnswer: "A",
    explanation: "Para escoger un equipo uniformado se elige primero uno de los 10 equipos y luego uno de los 3 uniformes disponibles para ese equipo. Por el principio multiplicativo, el número de posibilidades es 10 × 3 = 30. Por tanto, la afirmación de Esteban es correcta. La respuesta correcta es A."
  }


,
  {
    uid: "s2-mat-046",
    session: 2,
    block: 2,
    number: 46,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Estadística: promedio aritmético",
    dificultad: "Baja",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 46",
    stem: "Un campesino tiene varias vacas en su finca. En la tabla, aparece la producción de leche de las vacas durante 5 días de una semana.",
    resources: [
      {
        type: "table",
        caption: "Producción de leche durante cinco días",
        headers: ["Día", "Producción de leche (litros)"],
        rows: [
          ["Lunes", "75"],
          ["Martes", "65"],
          ["Miércoles", "75"],
          ["Jueves", "65"],
          ["Viernes", "70"],
          ["Total", "350"]
        ]
      }
    ],
    prompt: "Una persona afirma que, durante esos 5 días, las vacas produjeron, en promedio, 70 litros de leche por día. ¿Es verdadera esta afirmación?",
    options: [
      { letter: "A", text: "Sí, porque el viernes produjeron 70 litros de leche." },
      { letter: "B", text: "No, porque solamente produjeron 70 litros de leche un día." },
      { letter: "C", text: "Sí, porque la producción total es igual a la multiplicación de 70 litros de leche por el número de días." },
      { letter: "D", text: "No, porque el martes y el jueves la producción fue de menos de 70 litros de leche." }
    ],
    correctAnswer: "C",
    explanation: "El promedio diario se calcula dividiendo la producción total entre el número de días: 350 ÷ 5 = 70. De forma equivalente, si el promedio es 70 durante 5 días, la producción total debe ser 70 × 5 = 350 litros, que coincide con la tabla. Por tanto, la afirmación es verdadera y la respuesta correcta es C."
  }


,
  {
    uid: "s2-mat-047",
    session: 2,
    block: 2,
    number: 47,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Porcentajes y criterios de comparación",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 47",
    stem: "En un país las personas deben pagar el llamado ‘impuesto distributivo’, que es equivalente a la suma del 5 % de los ingresos totales del año anterior más el 1 % del patrimonio bruto. Este impuesto, sin embargo, solo debe ser pagado por aquellos ciudadanos cuyo patrimonio supere los 350.000 dólares o que el 40 % de sus ingresos del año anterior sean mayores que 20.000 dólares.",
    resources: [
      {
        type: "table",
        caption: "Información de algunos ciudadanos",
        headers: ["Nombre", "Ingresos totales año anterior", "Patrimonio"],
        rows: [
          ["Luisa", "16.000", "400.000"],
          ["Ernesta", "400.000", "100.000"],
          ["Paolo", "45.000", "300.000"]
        ]
      }
    ],
    prompt: "¿A cuál o a cuáles de estos ciudadanos se le debe cobrar el ‘impuesto distributivo’?",
    options: [
      { letter: "A", text: "Luisa y Ernesta únicamente." },
      { letter: "B", text: "Luisa y Paolo únicamente." },
      { letter: "C", text: "Solamente Ernesta." },
      { letter: "D", text: "Solamente Paolo." }
    ],
    correctAnswer: "A",
    explanation: "El impuesto se cobra si se cumple al menos una de las dos condiciones: patrimonio mayor que 350.000 dólares o que el 40 % de los ingresos sea mayor que 20.000 dólares. Luisa paga porque su patrimonio es 400.000, mayor que 350.000. Ernesta paga porque el 40 % de 400.000 es 160.000, mayor que 20.000. Paolo no paga porque su patrimonio es 300.000 y el 40 % de 45.000 es 18.000. Por tanto, la respuesta correcta es A."
  }


,
  {
    uid: "s2-mat-048",
    session: 2,
    block: 2,
    number: 48,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Geometría: clasificación de polígonos",
    dificultad: "Baja",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 48",
    stem: "En una sastrería se cortan telas para manteles de diferentes formas geométricas como se muestra en la figura.",
    resources: [
      {
        type: "html",
        html: `
          <div class="geo-card mateles-card" aria-label="Formas de manteles">
            <style>
              .manteles-card{padding:14px;border:1px solid rgba(15,23,42,.14);border-radius:16px;background:linear-gradient(180deg,#fff,#f8fafc);}
              .manteles-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;align-items:end;}
              .mantel-item{text-align:center;font-weight:800;color:#1f2937;}
              .mantel-shape{height:150px;display:flex;align-items:center;justify-content:center;margin-top:8px;border-radius:12px;background:#ffffff;box-shadow:inset 0 0 0 1px rgba(15,23,42,.08);}
              .mantel-svg{width:120px;height:120px;max-width:90%;}
              @media (max-width:640px){.manteles-grid{grid-template-columns:1fr;}.mantel-shape{height:120px}.mantel-svg{width:96px;height:96px}}
            </style>
            <div class="manteles-grid">
              <div class="mantel-item">
                <div>Mantel 1</div>
                <div class="mantel-shape">
                  <svg class="mantel-svg" viewBox="0 0 120 120" role="img" aria-label="Mantel cuadrado de cuatro lados">
                    <rect x="18" y="18" width="84" height="84" fill="#d1d5db" stroke="#111827" stroke-width="4"/>
                  </svg>
                </div>
              </div>
              <div class="mantel-item">
                <div>Mantel 2</div>
                <div class="mantel-shape">
                  <svg class="mantel-svg" viewBox="0 0 120 120" role="img" aria-label="Mantel triangular de tres lados">
                    <polygon points="60,14 108,100 12,100" fill="#d1d5db" stroke="#111827" stroke-width="4"/>
                  </svg>
                </div>
              </div>
              <div class="mantel-item">
                <div>Mantel 3</div>
                <div class="mantel-shape">
                  <svg class="mantel-svg" viewBox="0 0 120 120" role="img" aria-label="Mantel hexagonal de seis lados">
                    <polygon points="36,14 84,14 110,60 84,106 36,106 10,60" fill="#d1d5db" stroke="#111827" stroke-width="4"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        `
      }
    ],
    prompt: "Una persona necesita hacer una lista ordenando información sobre los manteles, teniendo en cuenta el número de lados que tiene la forma del mantel. Si decide que ordenará de menor a mayor número de lados, ¿cuál debe ser el orden de la lista?",
    options: [
      { letter: "A", text: "Mantel 1 - Mantel 3 - Mantel 2" },
      { letter: "B", text: "Mantel 1 - Mantel 2 - Mantel 3" },
      { letter: "C", text: "Mantel 2 - Mantel 3 - Mantel 1" },
      { letter: "D", text: "Mantel 2 - Mantel 1 - Mantel 3" }
    ],
    correctAnswer: "D",
    explanation: "El Mantel 2 tiene forma triangular, por tanto tiene 3 lados. El Mantel 1 tiene forma cuadrada, por tanto tiene 4 lados. El Mantel 3 tiene forma hexagonal, por tanto tiene 6 lados. Ordenados de menor a mayor número de lados quedan: Mantel 2, Mantel 1 y Mantel 3. Por tanto, la respuesta correcta es D."
  }

,
  {
    uid: "s2-mat-049",
    session: 2,
    block: 2,
    number: 49,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Conteo: combinaciones y selección de grupos",
    dificultad: "Baja",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 49",
    stem: "El profesor de un colegio ha decidido organizar un grupo de estudiantes para representar a la institución en una actividad.",
    resources: [],
    prompt: "¿Qué información se necesita para calcular el número total de posibles grupos que puede organizar el profesor?",
    options: [
      { letter: "A", text: "La cantidad de estudiantes que tendrá el grupo." },
      { letter: "B", text: "El número de estudiantes del colegio y la cantidad de estudiantes que tendrá el grupo." },
      { letter: "C", text: "La cantidad de grupos que va a organizar." },
      { letter: "D", text: "El número de estudiantes del colegio y la cantidad de grupos que va a organizar." }
    ],
    correctAnswer: "B",
    explanation: "Para calcular cuántos grupos diferentes se pueden formar, se necesita conocer el total de estudiantes disponibles y cuántos estudiantes tendrá cada grupo. Con esos dos datos se puede determinar el número de posibles selecciones o combinaciones. Por tanto, la respuesta correcta es B."
  }

,
  {
    uid: "s2-mat-050",
    session: 2,
    block: 2,
    number: 50,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Estadística: cuartiles y gráfica de cajas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Matemáticas - Pregunta 50",
    stem: "La tabla muestra las estaturas, ordenadas de menor a mayor, de 11 estudiantes de grado once. El cuartil 1 (Q1) es 162 cm porque este valor es mayor o igual que las tres primeras estaturas de la tabla.",
    resources: [
      {
        type: "table",
        caption: "Estaturas ordenadas de 11 estudiantes",
        headers: ["Estudiante", "Estatura (cm)", "Cuartil"],
        rows: [
          ["1", "155", "Mín."],
          ["2", "156", ""],
          ["3", "162", "Q1"],
          ["4", "163", ""],
          ["5", "164", ""],
          ["6", "165", "Q2"],
          ["7", "167", ""],
          ["8", "168", ""],
          ["9", "170", "Q3"],
          ["10", "171", ""],
          ["11", "172", "Máx."]
        ]
      },
      {
        type: "html",
        html: `
          <div class="boxplot-card" aria-label="Opciones de gráficas de cajas">
            <style>
              .boxplot-card{padding:14px;border:1px solid rgba(15,23,42,.14);border-radius:18px;background:linear-gradient(180deg,#fff,#f8fafc);}
              .boxplot-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}
              .boxplot-option{border:1px solid rgba(15,23,42,.12);border-radius:16px;background:#fff;padding:10px;box-shadow:0 10px 22px rgba(15,23,42,.06);}
              .boxplot-option strong{display:block;margin-bottom:6px;color:#0f172a;}
              .boxplot-svg{width:100%;height:270px;max-height:45vh;}
              .boxplot-axis{stroke:#111827;stroke-width:2;}
              .boxplot-line{stroke:#111827;stroke-width:3;fill:none;}
              .boxplot-box{fill:#f1f5f9;stroke:#111827;stroke-width:3;}
              .boxplot-label{font-size:12px;font-weight:800;fill:#1f2937;}
              .boxplot-tick{font-size:10px;fill:#475569;}
              @media (max-width:760px){.boxplot-grid{grid-template-columns:1fr}.boxplot-svg{height:240px}}
            </style>
            <div class="boxplot-grid">
              <div class="boxplot-option">
                <strong>A.</strong>
                <svg class="boxplot-svg" viewBox="0 0 220 270" role="img" aria-label="Gráfica A con eje de 1 a 11">
                  <line class="boxplot-axis" x1="42" y1="18" x2="42" y2="245"/>
                  ${Array.from({length:11},(_,i)=>`<text class="boxplot-tick" x="22" y="${230-i*19}">${i+1}</text><line x1="36" y1="${226-i*19}" x2="42" y2="${226-i*19}" stroke="#64748b"/>`).join('')}
                  <line class="boxplot-line" x1="120" y1="226" x2="120" y2="36"/>
                  <line class="boxplot-line" x1="92" y1="226" x2="148" y2="226"/>
                  <line class="boxplot-line" x1="92" y1="36" x2="148" y2="36"/>
                  <rect class="boxplot-box" x="78" y="74" width="84" height="114"/>
                  <line class="boxplot-line" x1="78" y1="131" x2="162" y2="131"/>
                  <text class="boxplot-label" x="154" y="40">Máx.</text><text class="boxplot-label" x="166" y="79">Q3</text><text class="boxplot-label" x="166" y="135">Q2</text><text class="boxplot-label" x="166" y="192">Q1</text><text class="boxplot-label" x="154" y="232">Mín.</text>
                </svg>
              </div>
              <div class="boxplot-option">
                <strong>B.</strong>
                <svg class="boxplot-svg" viewBox="0 0 220 270" role="img" aria-label="Gráfica B con Q1 aproximado a 159 y Q3 a 171">
                  <line class="boxplot-axis" x1="42" y1="18" x2="42" y2="245"/>
                  ${[155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172].map((v,i)=>`<text class="boxplot-tick" x="16" y="${235-i*12}">${v}</text><line x1="36" y1="${231-i*12}" x2="42" y2="${231-i*12}" stroke="#64748b"/>`).join('')}
                  <line class="boxplot-line" x1="122" y1="231" x2="122" y2="27"/>
                  <line class="boxplot-line" x1="96" y1="231" x2="148" y2="231"/>
                  <line class="boxplot-line" x1="96" y1="27" x2="148" y2="27"/>
                  <rect class="boxplot-box" x="78" y="39" width="88" height="146"/>
                  <line class="boxplot-line" x1="78" y1="111" x2="166" y2="111"/>
                  <text class="boxplot-label" x="152" y="31">Máx.</text><text class="boxplot-label" x="170" y="45">Q3</text><text class="boxplot-label" x="170" y="115">Q2</text><text class="boxplot-label" x="170" y="189">Q1</text><text class="boxplot-label" x="152" y="237">Mín.</text>
                </svg>
              </div>
              <div class="boxplot-option">
                <strong>C.</strong>
                <svg class="boxplot-svg" viewBox="0 0 220 270" role="img" aria-label="Gráfica C con mínimo 155, Q1 162, Q2 165, Q3 170 y máximo 172">
                  <line class="boxplot-axis" x1="42" y1="18" x2="42" y2="245"/>
                  ${[155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172].map((v,i)=>`<text class="boxplot-tick" x="16" y="${235-i*12}">${v}</text><line x1="36" y1="${231-i*12}" x2="42" y2="${231-i*12}" stroke="#64748b"/>`).join('')}
                  <line class="boxplot-line" x1="122" y1="231" x2="122" y2="27"/>
                  <line class="boxplot-line" x1="96" y1="231" x2="148" y2="231"/>
                  <line class="boxplot-line" x1="96" y1="27" x2="148" y2="27"/>
                  <rect class="boxplot-box" x="78" y="51" width="88" height="96"/>
                  <line class="boxplot-line" x1="78" y1="111" x2="166" y2="111"/>
                  <text class="boxplot-label" x="152" y="31">Máx.</text><text class="boxplot-label" x="170" y="55">Q3</text><text class="boxplot-label" x="170" y="115">Q2</text><text class="boxplot-label" x="170" y="151">Q1</text><text class="boxplot-label" x="152" y="237">Mín.</text>
                </svg>
              </div>
              <div class="boxplot-option">
                <strong>D.</strong>
                <svg class="boxplot-svg" viewBox="0 0 220 270" role="img" aria-label="Gráfica D con Q1 aproximado a 156 y Q3 a 169">
                  <line class="boxplot-axis" x1="42" y1="18" x2="42" y2="245"/>
                  ${[155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172].map((v,i)=>`<text class="boxplot-tick" x="16" y="${235-i*12}">${v}</text><line x1="36" y1="${231-i*12}" x2="42" y2="${231-i*12}" stroke="#64748b"/>`).join('')}
                  <line class="boxplot-line" x1="122" y1="231" x2="122" y2="27"/>
                  <line class="boxplot-line" x1="96" y1="231" x2="148" y2="231"/>
                  <line class="boxplot-line" x1="96" y1="27" x2="148" y2="27"/>
                  <rect class="boxplot-box" x="78" y="63" width="88" height="156"/>
                  <line class="boxplot-line" x1="78" y1="111" x2="166" y2="111"/>
                  <text class="boxplot-label" x="152" y="31">Máx.</text><text class="boxplot-label" x="170" y="67">Q3</text><text class="boxplot-label" x="170" y="115">Q2</text><text class="boxplot-label" x="170" y="223">Q1</text><text class="boxplot-label" x="152" y="237">Mín.</text>
                </svg>
              </div>
            </div>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes gráficas de cajas se corresponde con la información de la tabla?",
    options: [
      { letter: "A", text: "Gráfica A." },
      { letter: "B", text: "Gráfica B." },
      { letter: "C", text: "Gráfica C." },
      { letter: "D", text: "Gráfica D." }
    ],
    correctAnswer: "C",
    explanation: "La tabla indica los cinco valores principales de la gráfica de cajas: mínimo 155, Q1 = 162, Q2 = 165, Q3 = 170 y máximo 172. La única gráfica que ubica esos valores en esas posiciones es la opción C. Por tanto, la respuesta correcta es C."
  }

,
  {
    uid: "s2-cnat-051",
    session: 2,
    block: 3,
    number: 51,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Ecología: polinización y equilibrio ecosistémico",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 51",
    stem: "Soacha es un municipio en el departamento de Cundinamarca que cuenta con una gran diversidad ecológica, debido a su ubicación geográfica y a su variedad de ecosistemas. La extinción de especies en este municipio tendría impactos significativos en el ecosistema local, como es el caso del colibrí rutilante (Colibri coruscans), única ave polinizadora en algunas regiones del municipio, la cual se encuentra en vía de extinción local.",
    resources: [],
    prompt: "Dada la situación anterior, ¿por qué la extinción de los colibríes rutilantes afectaría el ecosistema de Soacha?",
    options: [
      { letter: "A", text: "Porque su extinción llevaría a un aumento en algunas plantas invasoras, ya que la especie no se alimentaría de ellas." },
      { letter: "B", text: "Porque, sin los colibríes, otras especies de aves polinizadoras podrían reproducirse en exceso y sobrepoblar el ecosistema." },
      { letter: "C", text: "Porque los colibríes son conocidos por su capacidad para eliminar insectos, por lo que su extinción resultaría en un incremento en la población de plagas." },
      { letter: "D", text: "Porque los colibríes son polinizadores y su desaparición llevaría a la disminución de la capacidad reproductiva de las plantas que polinizan." }
    ],
    correctAnswer: "D",
    explanation: "El texto indica que el colibrí rutilante es una ave polinizadora y que, en algunas regiones, cumple un papel único. Si desaparece, las plantas que dependen de su polinización tendrían menor capacidad de reproducirse, afectando el equilibrio del ecosistema local. Por tanto, la respuesta correcta es D."
  }


,
  {
    uid: "s2-cnat-052",
    session: 2,
    block: 3,
    number: 52,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Física: fuerzas en movimiento",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 52",
    stem: "Juan está haciendo clavados desde el borde de una piscina, como se muestra en la figura.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="dive-figure" aria-label="Secuencia de un clavadista desde el borde de una piscina hasta el agua">
            <svg viewBox="0 0 760 270" role="img" aria-labelledby="diveTitle diveDesc" style="width:100%;max-width:760px;display:block;margin:auto;border:1px solid var(--line);border-radius:18px;background:linear-gradient(180deg,#f8fafc 0%,#f8fafc 44%,#dbeafe 44%,#dbeafe 100%);">
              <title id="diveTitle">Clavado desde el borde de una piscina</title>
              <desc id="diveDesc">Secuencia simplificada de Juan saltando desde una plataforma y desplazándose por el aire hasta entrar al agua.</desc>
              <rect x="38" y="78" width="82" height="158" rx="4" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
              <rect x="120" y="112" width="600" height="124" fill="#bfdbfe" stroke="#60a5fa" stroke-width="2" opacity="0.65"/>
              <line x1="120" y1="112" x2="720" y2="112" stroke="#2563eb" stroke-width="3" opacity="0.45"/>
              <g stroke="#0f172a" stroke-width="5" stroke-linecap="round" fill="none">
                <circle cx="82" cy="45" r="12" fill="#0f172a" stroke="none"/>
                <path d="M76 58 C70 78 70 92 84 108"/>
                <path d="M76 72 L58 94"/>
                <path d="M82 74 L102 96"/>
                <path d="M84 108 L65 132"/>
                <path d="M86 108 L108 132"/>
              </g>
              <g stroke="#0f172a" stroke-width="5" stroke-linecap="round" fill="none" transform="translate(222,36) rotate(8)">
                <circle cx="0" cy="10" r="11" fill="#0f172a" stroke="none"/>
                <path d="M14 14 C44 18 82 22 122 15"/>
                <path d="M50 18 L46 50"/>
                <path d="M88 18 L100 48"/>
              </g>
              <g stroke="#0f172a" stroke-width="5" stroke-linecap="round" fill="none" transform="translate(415,90) rotate(15)">
                <circle cx="0" cy="12" r="11" fill="#0f172a" stroke="none"/>
                <path d="M14 14 C48 18 92 22 138 14"/>
                <path d="M54 18 L44 50"/>
                <path d="M92 18 L113 44"/>
              </g>
              <g stroke="#0f172a" stroke-width="5" stroke-linecap="round" fill="none" transform="translate(585,145) rotate(5)">
                <circle cx="0" cy="12" r="10" fill="#0f172a" stroke="none"/>
                <path d="M13 14 C50 18 96 18 142 12"/>
                <path d="M55 18 L42 42"/>
                <path d="M98 16 L122 36"/>
              </g>
              <text x="42" y="255" fill="#475569" font-size="15" font-family="Arial, sans-serif">Piscina</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "De acuerdo con la información anterior, ¿cuál de las siguientes fuerzas permanece constante durante todo el recorrido de Juan?",
    options: [
      { letter: "A", text: "La fuerza normal." },
      { letter: "B", text: "La fuerza centrípeta." },
      { letter: "C", text: "La fuerza gravitacional." },
      { letter: "D", text: "La fuerza de flotación." }
    ],
    correctAnswer: "C",
    explanation: "Durante el clavado, la fuerza que permanece actuando de manera constante sobre Juan es su peso o fuerza gravitacional, dirigida hacia abajo. La fuerza normal solo aparece cuando hay contacto con una superficie; la flotación aparece al estar dentro del agua, y la fuerza centrípeta no corresponde al movimiento descrito. Por tanto, la respuesta correcta es C."
  }




,
  {
    uid: "s2-cnat-053",
    session: 2,
    block: 3,
    number: 53,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Química: escala de pH y clasificación de sustancias",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 53",
    stem: "Juanita investigó que las sustancias ácidas liberan iones H⁺, las sustancias básicas liberan iones OH⁻ y las soluciones neutras presentan un equilibrio entre los iones H⁺ y OH⁻. Con esta información, Juanita decidió medir el pH de algunas sustancias, para clasificarlas en la escala de pH, y registró sus datos en la siguiente tabla.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="pH de sustancias comunes">
              <thead>
                <tr>
                  <th>Sustancia</th>
                  <th>Jugo de limón</th>
                  <th>Jugo de tomate</th>
                  <th>Agua</th>
                  <th>Jabón</th>
                  <th>Blanqueador</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>pH</th>
                  <td>2</td>
                  <td>4</td>
                  <td>7</td>
                  <td>11</td>
                  <td>13</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ph-scale-card" style="margin-top:18px;padding:16px;border:1px solid var(--line);border-radius:18px;background:var(--card-soft);">
            <p style="margin:0 0 10px;font-weight:800;text-align:center;">Escala de pH</p>
            <div style="display:grid;grid-template-columns:repeat(15,1fr);gap:2px;align-items:end;">
              ${Array.from({ length: 15 }, (_, i) => `<div style="text-align:center;font-size:12px;font-weight:700;color:var(--muted);">${i}</div>`).join("")}
              ${Array.from({ length: 15 }, (_, i) => `<div style="height:18px;border-radius:5px;background:${i < 7 ? 'linear-gradient(90deg,#fed7aa,#fb923c)' : i === 7 ? '#e2e8f0' : 'linear-gradient(90deg,#86efac,#22c55e)'};"></div>`).join("")}
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:13px;font-weight:700;color:var(--muted);">
              <span>pH ácido</span><span>pH neutro</span><span>pH básico</span>
            </div>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con la información anterior, ¿qué característica comparten el jugo de limón y el jugo de tomate?",
    options: [
      { letter: "A", text: "Son sustancias ácidas." },
      { letter: "B", text: "Tienen el mismo pH." },
      { letter: "C", text: "Tienen equilibrio de iones." },
      { letter: "D", text: "Liberan iones OH⁻." }
    ],
    correctAnswer: "A",
    explanation: "El jugo de limón tiene pH 2 y el jugo de tomate tiene pH 4. Ambos valores son menores que 7, por lo que corresponden a sustancias ácidas. Por tanto, la respuesta correcta es A."
  }


,
  {
    uid: "s2-cnat-054",
    session: 2,
    block: 3,
    number: 54,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Física: relación presión-volumen en gases",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 54",
    stem: "Los alvéolos son bolsas en donde se produce el intercambio de O₂ y CO₂ entre el pulmón y la sangre durante la respiración. En ellos se da la neumonía, una infección que inflama los alvéolos al llenarlos de líquido o pus, lo que dificulta la respiración.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="question-resource" aria-label="Alvéolos normales y alvéolos con neumonía">
            <svg viewBox="0 0 820 330" role="img" style="width:100%;max-width:820px;display:block;margin:auto;border:1px solid var(--line);border-radius:18px;background:linear-gradient(180deg,#ffffff,#f8fafc);">
              <text x="26" y="34" font-size="22" font-weight="800" fill="#0f172a">Intercambio gaseoso en los alvéolos</text>
              <text x="26" y="62" font-size="14" fill="#475569">Los alvéolos normales tienen espacio para el aire; en la neumonía pueden llenarse de líquido o pus.</text>
              <g transform="translate(70 105)">
                <text x="0" y="-20" font-size="18" font-weight="800" fill="#166534">Alvéolos normales</text>
                <circle cx="55" cy="70" r="44" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>
                <circle cx="126" cy="72" r="42" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>
                <circle cx="92" cy="132" r="42" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>
                <path d="M92 48 V10" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
                <text x="39" y="78" font-size="15" font-weight="700" fill="#166534">aire</text>
                <text x="110" y="80" font-size="15" font-weight="700" fill="#166534">O₂</text>
                <text x="76" y="139" font-size="15" font-weight="700" fill="#166534">CO₂</text>
              </g>
              <g transform="translate(490 105)">
                <text x="0" y="-20" font-size="18" font-weight="800" fill="#991b1b">Neumonía</text>
                <circle cx="55" cy="70" r="44" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
                <circle cx="126" cy="72" r="42" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
                <circle cx="92" cy="132" r="42" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
                <path d="M92 48 V10" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
                <circle cx="55" cy="76" r="24" fill="#7f1d1d" opacity="0.55"/>
                <circle cx="125" cy="77" r="23" fill="#7f1d1d" opacity="0.55"/>
                <circle cx="92" cy="135" r="22" fill="#7f1d1d" opacity="0.55"/>
                <text x="41" y="78" font-size="13" font-weight="800" fill="#7f1d1d">pus</text>
                <text x="101" y="80" font-size="13" font-weight="800" fill="#7f1d1d">líquido</text>
              </g>
              <path d="M315 175 C365 130, 415 130, 460 175" fill="none" stroke="#94a3b8" stroke-width="3" marker-end="url(#arrow)"/>
              <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" /></marker></defs>
              <text x="306" y="217" font-size="15" font-weight="700" fill="#475569">reducción del volumen disponible para aire</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "De acuerdo con la figura, al padecer neumonía hay una reducción del volumen alveolar y, necesariamente, del volumen disponible para el aire dentro de ellos. En una situación extrema, algunos alvéolos pueden quedar bloqueados por líquido o pus. En esta situación, ¿una reducción del volumen alveolar implica necesariamente un aumento de la presión del aire dentro de ellos?",
    options: [
      { letter: "A", text: "No, porque la presión de aire dentro de los alvéolos debe ser similar a la presión atmosférica." },
      { letter: "B", text: "No, porque la presión debe disminuir, ya que el CO₂ no tiene por dónde salir del cuerpo." },
      { letter: "C", text: "Sí, porque habrá más O₂ en el aire, lo que hace que aumente la presión." },
      { letter: "D", text: "Sí, porque la presión es inversamente proporcional al volumen al comprimir el aire." }
    ],
    correctAnswer: "D",
    explanation: "Si una misma cantidad de aire se comprime en un volumen menor, la presión aumenta. Esto corresponde a una relación inversa entre presión y volumen. Por tanto, la respuesta correcta es D."
  },
  {
    uid: "s2-cnat-055",
    session: 2,
    block: 3,
    number: 55,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Interpretación de gráficas científicas",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 55",
    stem: "Un grupo de investigadoras encuentra que, para controlar la neumonía, el uso de las vacunas PPSV23 y PCV13 reduce aproximadamente un 60 % la posibilidad de ingresar al hospital por causa de esta enfermedad. La vacuna PPSV23 protege contra 23 cepas de bacterias neumocócicas y la vacuna PCV13 protege contra 13 cepas.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap" style="max-width:520px;margin:auto;">
            <table class="data-table" aria-label="Número de cepas protegidas por vacuna">
              <thead><tr><th>Vacuna</th><th>Número de cepas neumocócicas</th></tr></thead>
              <tbody><tr><td>PPSV23</td><td>23</td></tr><tr><td>PCV13</td><td>13</td></tr></tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con la información anterior, ¿cuál de las siguientes gráficas representa correctamente el número de cepas de bacterias neumocócicas para las que protege cada vacuna?",
    options: [
      { letter: "A", isHtml: true, text: `<div class="mini-chart"><strong>Vacuna PPSV23: 23</strong><br><strong>Vacuna PCV13: 13</strong><div style="display:flex;gap:30px;align-items:end;height:90px;margin-top:8px"><span style="height:74px;width:45px;background:#334155;border-radius:6px 6px 0 0"></span><span style="height:42px;width:45px;background:#64748b;border-radius:6px 6px 0 0"></span></div></div>` },
      { letter: "B", isHtml: true, text: `<div class="mini-chart"><strong>Vacuna PPSV23: 13</strong><br><strong>Vacuna PCV13: 23</strong><div style="display:flex;gap:30px;align-items:end;height:90px;margin-top:8px"><span style="height:42px;width:45px;background:#64748b;border-radius:6px 6px 0 0"></span><span style="height:74px;width:45px;background:#334155;border-radius:6px 6px 0 0"></span></div></div>` },
      { letter: "C", isHtml: true, text: `<div class="mini-chart"><strong>Vacuna PPSV23: 60</strong><br><strong>Vacuna PCV13: 40</strong><div style="display:flex;gap:30px;align-items:end;height:90px;margin-top:8px"><span style="height:82px;width:45px;background:#334155;border-radius:6px 6px 0 0"></span><span style="height:55px;width:45px;background:#64748b;border-radius:6px 6px 0 0"></span></div></div>` },
      { letter: "D", isHtml: true, text: `<div class="mini-chart"><strong>Vacuna PPSV23: 90</strong><br><strong>Vacuna PCV13: 10</strong><div style="display:flex;gap:30px;align-items:end;height:90px;margin-top:8px"><span style="height:86px;width:45px;background:#334155;border-radius:6px 6px 0 0"></span><span style="height:12px;width:45px;background:#64748b;border-radius:6px 6px 0 0"></span></div></div>` }
    ],
    correctAnswer: "A",
    explanation: "La información indica que PPSV23 protege contra 23 cepas y PCV13 contra 13 cepas. La gráfica correcta debe mostrar una barra mayor para PPSV23 con valor 23 y una menor para PCV13 con valor 13. Por tanto, la respuesta correcta es A."
  },
  {
    uid: "s2-cnat-056",
    session: 2,
    block: 3,
    number: 56,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Biología: vacunas y prevención de enfermedades",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 56",
    stem: "Un grupo de investigadoras encuentra que, para controlar la neumonía, el uso de las vacunas PPSV23 y PCV13 reduce aproximadamente un 60 % la posibilidad de ingresar al hospital por causa de esta enfermedad. Estas vacunas protegen contra cepas de bacterias neumocócicas que pueden causar neumonía.",
    prompt: "De acuerdo con la información anterior, ¿por qué se deben usar vacunas para reducir la posibilidad de ingresar al hospital a causa de la neumonía?",
    options: [
      { letter: "A", text: "Porque las vacunas aumentan el contagio de las cepas de bacterias en un 60 %." },
      { letter: "B", text: "Porque las vacunas disminuyen el contagio de cepas de bacterias que producen neumonía." },
      { letter: "C", text: "Porque las vacunas aumentan en un 90 % el volumen de los alvéolos pulmonares." },
      { letter: "D", text: "Porque las vacunas ayudan a aumentar el volumen de sangre dentro de los alvéolos pulmonares." }
    ],
    correctAnswer: "B",
    explanation: "Las vacunas ayudan al organismo a prevenir infecciones causadas por cepas bacterianas asociadas con la neumonía. Por eso reducen la posibilidad de enfermar gravemente o requerir hospitalización. Por tanto, la respuesta correcta es B."
  }


,
  {
    uid: "s2-cnat-057",
    session: 2,
    block: 3,
    number: 57,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Biología: transporte a través de la membrana celular",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 57",
    stem: "La siguiente imagen muestra algunos de los tipos de transporte a través de la membrana celular. Las células mantienen siempre una baja concentración de glucosa en comparación con el medio exterior. En el proceso de absorción de glucosa por parte de la célula, esta no requiere energía y el transporte de dicha molécula a través de la membrana celular se realiza a favor del gradiente de concentración por medio de proteínas transportadoras.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="question-resource" aria-label="Tipos de transporte a través de la membrana celular">
            <svg viewBox="0 0 920 360" role="img" style="width:100%;max-width:920px;display:block;margin:auto;border:1px solid var(--line);border-radius:18px;background:linear-gradient(180deg,#ffffff,#f8fafc);">
              <text x="30" y="34" font-size="22" font-weight="800" fill="#0f172a">Transporte a través de la membrana celular</text>
              <text x="30" y="62" font-size="14" fill="#475569">La glucosa entra a favor del gradiente y sin gasto de energía mediante proteínas transportadoras.</text>
              <text x="30" y="104" font-size="15" font-weight="700" fill="#475569">Espacio extracelular</text>
              <text x="30" y="318" font-size="15" font-weight="700" fill="#475569">Citoplasma</text>
              <g transform="translate(120 150)">
                <rect x="0" y="0" width="700" height="26" rx="13" fill="#cbd5e1"/>
                <rect x="0" y="45" width="700" height="26" rx="13" fill="#cbd5e1"/>
                <g fill="#64748b">
                  <circle cx="22" cy="13" r="9"/><circle cx="58" cy="13" r="9"/><circle cx="94" cy="13" r="9"/><circle cx="130" cy="13" r="9"/><circle cx="166" cy="13" r="9"/><circle cx="202" cy="13" r="9"/><circle cx="238" cy="13" r="9"/><circle cx="274" cy="13" r="9"/><circle cx="310" cy="13" r="9"/><circle cx="346" cy="13" r="9"/><circle cx="382" cy="13" r="9"/><circle cx="418" cy="13" r="9"/><circle cx="454" cy="13" r="9"/><circle cx="490" cy="13" r="9"/><circle cx="526" cy="13" r="9"/><circle cx="562" cy="13" r="9"/><circle cx="598" cy="13" r="9"/><circle cx="634" cy="13" r="9"/><circle cx="670" cy="13" r="9"/>
                  <circle cx="22" cy="58" r="9"/><circle cx="58" cy="58" r="9"/><circle cx="94" cy="58" r="9"/><circle cx="130" cy="58" r="9"/><circle cx="166" cy="58" r="9"/><circle cx="202" cy="58" r="9"/><circle cx="238" cy="58" r="9"/><circle cx="274" cy="58" r="9"/><circle cx="310" cy="58" r="9"/><circle cx="346" cy="58" r="9"/><circle cx="382" cy="58" r="9"/><circle cx="418" cy="58" r="9"/><circle cx="454" cy="58" r="9"/><circle cx="490" cy="58" r="9"/><circle cx="526" cy="58" r="9"/><circle cx="562" cy="58" r="9"/><circle cx="598" cy="58" r="9"/><circle cx="634" cy="58" r="9"/><circle cx="670" cy="58" r="9"/>
                </g>
                <g transform="translate(70 -55)">
                  <text x="0" y="0" font-size="15" font-weight="800" fill="#0f172a">Difusión simple</text>
                  <line x1="45" y1="25" x2="45" y2="145" stroke="#0f172a" stroke-width="6" marker-end="url(#arrowDown)"/>
                  <circle cx="45" cy="15" r="8" fill="#22c55e"/>
                </g>
                <g transform="translate(255 -55)">
                  <text x="-10" y="0" font-size="15" font-weight="800" fill="#0f172a">Difusión facilitada</text>
                  <text x="0" y="22" font-size="13" font-weight="700" fill="#64748b">proteína transportadora</text>
                  <path d="M45 50 C25 72,25 100,45 122 C65 100,65 72,45 50 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
                  <line x1="45" y1="25" x2="45" y2="145" stroke="#0f172a" stroke-width="6" marker-end="url(#arrowDown)"/>
                  <circle cx="45" cy="15" r="8" fill="#22c55e"/>
                </g>
                <g transform="translate(500 -55)">
                  <text x="0" y="0" font-size="15" font-weight="800" fill="#0f172a">Transporte activo</text>
                  <text x="8" y="22" font-size="13" font-weight="700" fill="#64748b">requiere energía</text>
                  <path d="M55 50 C30 70,30 102,55 122 C80 102,80 70,55 50 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
                  <line x1="55" y1="145" x2="55" y2="25" stroke="#0f172a" stroke-width="6" marker-end="url(#arrowUp)"/>
                  <text x="92" y="88" font-size="14" font-weight="800" fill="#dc2626">Energía</text>
                </g>
              </g>
              <defs>
                <marker id="arrowDown" markerWidth="9" markerHeight="9" refX="4" refY="7" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,0 L4,8 z" fill="#0f172a" /></marker>
                <marker id="arrowUp" markerWidth="9" markerHeight="9" refX="4" refY="1" orient="auto" markerUnits="strokeWidth"><path d="M0,8 L8,8 L4,0 z" fill="#0f172a" /></marker>
              </defs>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "De acuerdo con la anterior información, ¿qué tipo de transporte celular se lleva a cabo para el ingreso de la glucosa a la célula?",
    options: [
      { letter: "A", text: "Transporte activo." },
      { letter: "B", text: "Transporte pasivo por difusión facilitada mediada por transportadores." },
      { letter: "C", text: "Transporte pasivo por difusión simple." },
      { letter: "D", text: "Transporte pasivo por difusión facilitada mediada por canales." }
    ],
    correctAnswer: "B",
    explanation: "La situación indica tres condiciones: la glucosa entra a favor del gradiente de concentración, no requiere energía y utiliza proteínas transportadoras. Esto corresponde a transporte pasivo por difusión facilitada mediada por transportadores. Por tanto, la respuesta correcta es B."
  }


,
  {
    uid: "s2-cnat-058",
    session: 2,
    block: 3,
    number: 58,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Biología: evolución, mutaciones y selección natural",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 58",
    stem: "La evolución es un fenómeno natural que favorece las mutaciones más aptas para un entorno determinado. En 1802, Lamarck teorizó que estos cambios se daban por un mecanismo que les permitía a los seres trasladar a su descendencia las características que adquirieron en vida. En la actualidad esta teoría fue reevaluada, pues si un organismo en vida estira mucho su cuello para comer de árboles altos, su descendencia no nacerá con el cuello largo, ya que no se presenta una mutación en sus genes, solo es una adaptación individual. El siguiente experimento muestra las mutaciones en los colores de una especie de escarabajos que les permitió adaptarse a su entorno.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="question-resource" aria-label="Mutaciones, selección natural y adaptación en escarabajos">
            <svg viewBox="0 0 920 360" role="img" style="width:100%;max-width:920px;display:block;margin:auto;border:1px solid var(--line);border-radius:18px;background:linear-gradient(180deg,#ffffff,#f8fafc);">
              <text x="30" y="34" font-size="22" font-weight="800" fill="#0f172a">Mutaciones y selección natural</text>
              <text x="30" y="62" font-size="14" fill="#475569">Las mutaciones generan variación; el ambiente favorece las variantes más aptas.</text>
              <g transform="translate(80 105)">
                <text x="0" y="-18" font-size="16" font-weight="800" fill="#0f172a">1. Variación genética</text>
                <circle cx="75" cy="55" r="34" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/>
                <circle cx="155" cy="55" r="34" fill="#93c5fd" stroke="#2563eb" stroke-width="3"/>
                <circle cx="235" cy="55" r="34" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="3"/>
                <text x="20" y="120" font-size="14" font-weight="700" fill="#475569">colores distintos por mutación</text>
              </g>
              <g transform="translate(405 105)">
                <text x="0" y="-18" font-size="16" font-weight="800" fill="#0f172a">2. El ambiente selecciona</text>
                <rect x="0" y="15" width="250" height="105" rx="18" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>
                <path d="M25 100 C55 40,95 130,130 65 S195 40,225 105" fill="none" stroke="#166534" stroke-width="5" opacity="0.6"/>
                <circle cx="60" cy="72" r="18" fill="#dbeafe" stroke="#2563eb" stroke-width="3" opacity="0.4"/>
                <circle cx="122" cy="74" r="18" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="3"/>
                <circle cx="182" cy="73" r="18" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="3"/>
                <text x="28" y="148" font-size="14" font-weight="700" fill="#475569">mutaciones desfavorables se reducen</text>
              </g>
              <g transform="translate(710 105)">
                <text x="0" y="-18" font-size="16" font-weight="800" fill="#0f172a">3. Más descendencia</text>
                <circle cx="32" cy="55" r="24" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="3"/>
                <circle cx="92" cy="55" r="24" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="3"/>
                <circle cx="62" cy="112" r="24" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="3"/>
                <text x="-4" y="165" font-size="14" font-weight="700" fill="#475569">la variante favorable se hereda</text>
              </g>
              <path d="M340 160 L385 160" stroke="#94a3b8" stroke-width="5" marker-end="url(#arrow58)"/>
              <path d="M665 160 L700 160" stroke="#94a3b8" stroke-width="5" marker-end="url(#arrow58)"/>
              <defs><marker id="arrow58" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" /></marker></defs>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "Según este experimento, ¿cuál es la razón por la que se reevaluó la teoría de Lamarck?",
    options: [
      { letter: "A", text: "Porque los escarabajos pueden cambiar de color dependiendo del tipo de suelo." },
      { letter: "B", text: "Porque el experimento muestra que son las mutaciones las que se transmiten." },
      { letter: "C", text: "Porque las aves también pueden evolucionar y lograr cazar a todos los insectos." },
      { letter: "D", text: "Porque en la actualidad los estudios científicos más antiguos son rechazados." }
    ],
    correctAnswer: "B",
    explanation: "La teoría de Lamarck proponía que se heredaban características adquiridas durante la vida. El experimento muestra, en cambio, que la variación heredable proviene de mutaciones genéticas y que el ambiente favorece las mutaciones más aptas. Por tanto, la respuesta correcta es B."
  }



,
  {
    uid: "s2-cnat-059",
    session: 2,
    block: 3,
    number: 59,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Ecología: hipótesis, variables ambientales y contaminación",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 59",
    stem: "Durante los últimos diez años, una población costera ha notado un aumento en la aparición de corales albinos. Un investigador de la región propone como hipótesis que el aumento se debe al incremento en la temperatura promedio anual en este lugar. Sin embargo, al recolectar más información del área, se da cuenta de que la temperatura promedio anual no ha cambiado y que desde hace doce años una fábrica de productos de cuero vierte sus desechos en la costa y contamina las aguas donde crecen los corales.",
    resources: [],
    prompt: "Teniendo en cuenta la nueva información, ¿la hipótesis explica el aumento de corales albinos?",
    options: [
      { letter: "A", text: "No, porque los corales albinos pueden afectarse por otros factores, como aguas residuales de fábricas de cuero." },
      { letter: "B", text: "Sí, porque la temperatura es el principal responsable de la formación de corales albinos." },
      { letter: "C", text: "No, porque no se indica cuánto varía la temperatura en la zona de mayor crecimiento de los corales albinos." },
      { letter: "D", text: "Sí, porque la contaminación de otras fábricas no influye en la aparición de corales albinos." }
    ],
    correctAnswer: "A",
    explanation: "La hipótesis inicial relacionaba el aumento de corales albinos con un incremento de temperatura. La nueva información muestra que la temperatura promedio anual no cambió y que existe otro factor ambiental relevante: la contaminación por desechos de una fábrica de cuero. Por eso, la hipótesis inicial no explica adecuadamente el fenómeno observado. La respuesta correcta es A."
  }



,
  {
    uid: "s2-cnat-060",
    session: 2,
    block: 3,
    number: 60,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Evolución: selección natural, adaptación y camuflaje",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 60",
    stem: "La polilla inglesa del abedul presenta alguna de estas dos coloraciones: tono claro y tono oscuro. Antes de la Revolución Industrial, las polillas de tonos claros eran las más abundantes, pues podían camuflarse sobre la corteza de los abedules, que era de tono claro, y evitar así los depredadores. Durante la Revolución Industrial, la corteza de los abedules se oscureció producto del excesivo hollín liberado por la combustión del carbón, y entonces las polillas de tonos oscuros fueron más comunes que las de tonos claros. En la actualidad, más de un siglo después de finalizada la Revolución Industrial, cuando las lluvias de todos estos años lavaron el hollín, ¿cuál es el tono más común en esta especie de polilla?",
    resources: [],
    prompt: "Seleccione la opción que explica el tono más común esperado en la actualidad.",
    options: [
      { letter: "A", text: "Ambos son igual de comunes, porque las polillas podrán camuflarse sobre las cortezas de tonos claros y las de tonos oscuros." },
      { letter: "B", text: "El tono intermedio, porque las polillas podrán camuflarse sobre las cortezas de tonos claros y de tonos oscuros." },
      { letter: "C", text: "El tono claro, porque las polillas podrán camuflarse sobre la corteza de tono claro de los abedules." },
      { letter: "D", text: "El tono oscuro, porque las polillas podrán camuflarse sobre la corteza de tonos oscuros de los abedules." }
    ],
    correctAnswer: "C",
    explanation: "Si el hollín fue lavado y la corteza de los abedules volvió a ser clara, las polillas claras tienen mayor camuflaje frente a depredadores. Por selección natural, ese tono tendría mayor probabilidad de ser común. La respuesta correcta es C."
  }



,
  {
    uid: "s2-cnat-061",
    session: 2,
    block: 3,
    number: 61,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Química y ciencias de la Tierra: combustibles fósiles y materia orgánica",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 61",
    stem: "El carbón y el petróleo son combustibles fósiles que se formaron hace millones de años. El petróleo se formó a partir de restos vegetales y animales marinos que se transformaron por acción bacteriana, incremento de temperatura y presión. El carbón, por su parte, se formó a partir de la acumulación de restos vegetales y esporas que se comprimieron en pantanos poco profundos y ciénagas, en ausencia de oxígeno.",
    resources: [],
    prompt: "Teniendo en cuenta la información anterior, ¿cuál de las siguientes afirmaciones indica una similitud existente entre el carbón y el petróleo?",
    options: [
      { letter: "A", text: "El petróleo y el carbón son combustibles fósiles a base de carbono e hidrógeno que solo se presentan en estado sólido." },
      { letter: "B", text: "El petróleo y el carbón se formaron a partir de materia orgánica que se transformó por condiciones físicas específicas." },
      { letter: "C", text: "El petróleo y el carbón son combustibles a base de carbono e hidrógeno que presentan estado tanto sólido como líquido." },
      { letter: "D", text: "El petróleo y el carbón se formaron a partir de la materia inorgánica en descomposición desde hace millones de años." }
    ],
    correctAnswer: "B",
    explanation: "La información indica que tanto el petróleo como el carbón se originaron a partir de restos de seres vivos, es decir, materia orgánica, y que su formación dependió de condiciones físicas específicas, como presión, temperatura, compresión o ausencia de oxígeno. Por tanto, la respuesta correcta es B."
  }



,
  {
    uid: "s2-cnat-062",
    session: 2,
    block: 3,
    number: 62,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Física: ondas, sonido y diseño experimental",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 62",
    stem: "Un estudiante construye un teléfono de juguete uniendo dos vasos plásticos a los extremos de una cuerda. Cuando la cuerda se tensiona se puede hablar en un vaso y escuchar el mensaje en el vaso al otro extremo de la cuerda. El estudiante tiene la siguiente hipótesis: si se emite el mismo sonido y la tensión de la cuerda es la misma, la calidad del sonido siempre es igual, sin importar el grueso de la cuerda que se use. Para probar esta hipótesis, el estudiante construye varios teléfonos con cuerdas del mismo material, pero de diferente grosor, y las tensiona con la misma fuerza. Obtiene los resultados que se muestran en la tabla.",
    resources: [
      {
        type: "table",
        caption: "Resultados del experimento",
        headers: ["Grosor de la cuerda (mm)", "Longitud (m)", "Calidad del sonido escuchado"],
        rows: [
          ["2", "5", "Buena"],
          ["6", "5", "Regular"],
          ["10", "5", "Mala"]
        ]
      }
    ],
    prompt: "Luego de analizar los resultados del experimento, ¿qué debe concluir el estudiante sobre su hipótesis?",
    options: [
      { letter: "A", text: "Que es verdadera, porque el sonido únicamente depende del material de la cuerda." },
      { letter: "B", text: "Que es falsa, porque a medida que el grosor de la cuerda aumenta mejora la calidad del sonido." },
      { letter: "C", text: "Que es verdadera, porque la calidad del sonido mejora cuando la longitud de la cuerda aumenta." },
      { letter: "D", text: "Que es falsa, porque a medida que el grosor de la cuerda aumenta desmejora la calidad del sonido." }
    ],
    correctAnswer: "D",
    explanation: "La hipótesis afirmaba que la calidad del sonido sería siempre igual si el sonido emitido y la tensión de la cuerda eran los mismos. Sin embargo, la tabla muestra que, manteniendo la longitud en 5 m y usando el mismo material, al aumentar el grosor de la cuerda de 2 mm a 10 mm la calidad pasa de buena a mala. Por tanto, la hipótesis es falsa y la respuesta correcta es D."
  }

,
  {
    uid: "s2-cnat-063",
    session: 2,
    block: 3,
    number: 63,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Química: reacciones ácido-base y neutralización",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 63",
    stem: "Una reacción de neutralización puede resultar a partir de la interacción de un ácido y una base, como se muestra en la siguiente fórmula general.",
    resources: [
      {
        type: "html",
        content: `<div class="formula-card" style="text-align:center;font-weight:900;font-size:1.25rem;line-height:1.7;padding:16px;border:1px solid var(--line);border-radius:18px;background:var(--soft)">
          <div>HA + B(OH) → BA + H<sub>2</sub>O</div>
          <div style="font-size:.88rem;font-weight:700;margin-top:6px">Ácido + Base → Sal + Agua</div>
          <div style="font-size:.82rem;font-weight:700;margin-top:6px">A: no metal &nbsp;&nbsp; | &nbsp;&nbsp; B: metal</div>
        </div>`
      }
    ],
    prompt: "De acuerdo con la información anterior, ¿cuál de las siguientes reacciones corresponde a una neutralización?",
    options: [
      { letter: "A", text: "6HCl + 2Fe → 2FeCl₃ + 3H₂" },
      { letter: "B", text: "8HNO₃ + 2Al → 2Al(NO₃)₃ + 2NO + 4H₂O" },
      { letter: "C", text: "CaO + H₂O → Ca(OH)₂" },
      { letter: "D", text: "HCl + NaOH → NaCl + H₂O" }
    ],
    correctAnswer: "D",
    explanation: "Una neutralización ocurre cuando un ácido reacciona con una base y se forman una sal y agua. En la opción D, el HCl es un ácido y el NaOH es una base; sus productos son NaCl, una sal, y H₂O, agua. Por tanto, la respuesta correcta es D."
  }

,
  {
    uid: "s2-cnat-064",
    session: 2,
    block: 3,
    number: 64,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Química: métodos de separación de mezclas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 64",
    stem: "Los perfumes se crean a partir de la extracción de las esencias de flores, semillas, hierbas y cáscaras, que han sido sumergidas en agua por horas. Después, por acción del calor, se separan los componentes que han cambiado a estado gaseoso en la mezcla, para luego enfriar y obtener un líquido que posteriormente se envasa para su comercialización. Para realizar el proceso de separación y obtener el perfume se cuenta con varios métodos de separación de mezclas.",
    resources: [
      {
        type: "html",
        content: `<div class="info-card"><strong>Métodos de separación de mezclas</strong><ul><li><strong>Destilación:</strong> consiste en aplicar calor a la mezcla para evaporar un componente y luego condensarlo para separarlo de la mezcla.</li><li><strong>Evaporación:</strong> consiste en aplicar calor a la mezcla hasta que llegue a su punto de ebullición para evaporar algunos componentes y así obtener el componente sólido de la mezcla.</li><li><strong>Cristalización:</strong> consiste en disminuir la temperatura para obtener cristales de algún componente y separarlo de los otros componentes de la mezcla.</li><li><strong>Decantación:</strong> consiste en separar a simple vista los componentes de la mezcla por la diferencia de densidades entre estos.</li></ul></div>`
      }
    ],
    prompt: "Teniendo en cuenta la información anterior, ¿cuál es el método de separación que se utiliza en la producción de perfumes?",
    options: [
      { letter: "A", text: "La destilación, ya que separa las esencias de la mezcla de líquidos gracias a los cambios de temperatura." },
      { letter: "B", text: "La evaporación, ya que obtienen las sustancias sólidas del perfume y las separa de la mezcla inicial." },
      { letter: "C", text: "La cristalización, ya que se obtienen sólidos cristalinos del perfume gracias a cambios de temperatura." },
      { letter: "D", text: "La decantación, ya que separa el perfume de otras sustancias según la densidad de cada componente." }
    ],
    correctAnswer: "A",
    explanation: "El proceso descrito consiste en calentar la mezcla para que algunos componentes pasen a estado gaseoso y luego enfriarlos para obtener nuevamente un líquido. Ese procedimiento corresponde a la destilación, porque combina evaporación y condensación para separar componentes de una mezcla. Por tanto, la respuesta correcta es A."
  }



,
  {
    uid: "s2-cnat-065",
    session: 2,
    block: 3,
    number: 65,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Química: concentración y equilibrio químico",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 65",
    stem: "Un grupo de estudiantes desea saber cómo varía la concentración de ciertas sustancias en una reacción química. Para ello, su docente les muestra los resultados de esa reacción a través de una gráfica.",
    resources: [
      {
        type: "html",
        content: `<div class="info-card" style="text-align:center">
          <div style="font-size:1.2rem;font-weight:900;margin-bottom:10px"><em>M</em> + <em>L</em> → <em>N</em> + <em>Q</em></div>
          <svg viewBox="0 0 520 260" role="img" aria-label="Gráfica de concentración contra tiempo" style="width:100%;max-width:560px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:10px">
            <defs>
              <marker id="arrow65" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L6,3 z" fill="currentColor"></path></marker>
            </defs>
            <line x1="55" y1="210" x2="475" y2="210" stroke="#0f172a" stroke-width="3" marker-end="url(#arrow65)"></line>
            <line x1="55" y1="210" x2="55" y2="35" stroke="#0f172a" stroke-width="3" marker-end="url(#arrow65)"></line>
            <text x="430" y="238" font-size="16" font-weight="700">Tiempo</text>
            <text x="18" y="120" font-size="16" font-weight="700" transform="rotate(-90 18 120)">Concentración</text>
            <path d="M58 196 C105 120, 155 70, 230 62 C300 58, 385 58, 468 58" fill="none" stroke="#111827" stroke-width="5" stroke-linecap="round"></path>
            <path d="M58 52 C105 120, 155 160, 230 168 C300 172, 385 172, 468 172" fill="none" stroke="#111827" stroke-width="5" stroke-linecap="round"></path>
            <text x="250" y="50" font-size="18" font-weight="900">[N] [Q]</text>
            <text x="250" y="195" font-size="18" font-weight="900">[M] [L]</text>
          </svg>
        </div>`
      }
    ],
    prompt: "Uno de los estudiantes concluye de forma errónea que M y L tienen la misma concentración que N y Q desde el tiempo 0. En consecuencia, ¿cuál de las siguientes conclusiones es correcta según las tendencias observadas en la gráfica?",
    options: [
      { letter: "A", text: "Para el tiempo 0, las concentraciones de M, L, N y Q son diferentes entre sí, pero después de un tiempo todas las concentraciones se igualan, hasta llegar al equilibrio." },
      { letter: "B", text: "Una vez el proceso inicia, las concentraciones de M y L disminuyen, mientras que las concentraciones de N y Q aumentan a través del tiempo, hasta llegar al equilibrio." },
      { letter: "C", text: "Una vez el proceso inicia, las concentraciones de M y L aumentan, mientras que las concentraciones de N y Q disminuyen a través del tiempo, hasta llegar al equilibrio." },
      { letter: "D", text: "Para el tiempo 0, las concentraciones de M, L, N y Q son iguales entre sí, pero después de un tiempo todas las concentraciones varían, hasta llegar al equilibrio." }
    ],
    correctAnswer: "B",
    explanation: "La gráfica muestra que los reactivos M y L empiezan con mayor concentración y disminuyen con el tiempo, mientras que los productos N y Q empiezan con menor concentración y aumentan. Luego, las curvas se estabilizan al llegar al equilibrio. Por tanto, la conclusión correcta es B."
  }

,
  {
    uid: "s2-cnat-066",
    session: 2,
    block: 3,
    number: 66,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Física: masa, peso y gravedad",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 66",
    stem: "De no ser por la fuerza de fricción, todos los cuerpos que caen cerca de la superficie terrestre lo harían con la misma aceleración gravitacional, g = 10 m/s² aproximadamente. En este aspecto, la aceleración gravitacional en la Luna es aproximadamente una sexta parte de la de la Tierra. Por esto, un objeto que tiene 6 kg de masa y que en la Tierra pesa 60 N, en la Luna solamente pesa 10 N.",
    resources: [],
    prompt: "Teniendo en cuenta la información anterior, ¿qué masa tendrá un objeto que pesa 50 N en la Luna?",
    options: [
      { letter: "A", text: "50/6 kg." },
      { letter: "B", text: "50 kg." },
      { letter: "C", text: "30 kg." },
      { letter: "D", text: "30/6 kg." }
    ],
    correctAnswer: "C",
    explanation: "En la Luna, la gravedad es una sexta parte de la terrestre: g_Luna = 10/6 m/s². Como el peso se calcula con P = m × g, entonces m = P/g = 50 ÷ (10/6) = 50 × 6/10 = 30 kg. Por tanto, la respuesta correcta es C."
  }
,
  {
    uid: "s2-cnat-067",
    session: 2,
    block: 3,
    number: 67,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Ciencias ambientales: interpretación de gráficas de emisiones",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 67",
    stem: "Las actividades agrícolas y ganaderas, así como la industria alimentaria, producen gran cantidad de residuos orgánicos que, al descomponerse, contribuyen al aumento de las emisiones de gases de efecto invernadero, como vapor de agua, óxido nitroso, dióxido de carbono y metano. El metano (CH₄) preocupa porque puede tener un efecto contaminante mayor que el CO₂. Un grupo de científicos consultó el comportamiento de las emisiones anuales de CH₄ entre 2000 y 2020.",
    resources: [
      {
        type: "html",
        html: `<figure class="question-resource science-graph-card" aria-label="Emisiones anuales de metano entre 2000 y 2020">
          <div class="resource-title"><strong>Emisiones de CH₄ entre 2000 y 2020</strong></div>
          <svg viewBox="0 0 760 360" role="img" style="width:100%;max-width:760px;display:block;margin:auto;border:1px solid var(--line);border-radius:18px;background:#ffffff;">
            <defs><marker id="arrow67" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L6,3 z" fill="#0f172a"></path></marker></defs>
            <line x1="70" y1="305" x2="710" y2="305" stroke="#0f172a" stroke-width="3" marker-end="url(#arrow67)"></line>
            <line x1="70" y1="305" x2="70" y2="35" stroke="#0f172a" stroke-width="3" marker-end="url(#arrow67)"></line>
            <text x="340" y="345" font-size="16" font-weight="700">Año</text>
            <text x="22" y="180" font-size="16" font-weight="700" transform="rotate(-90 22 180)">Emisiones de CH₄ (toneladas)</text>
            <g stroke="#e2e8f0" stroke-width="1">
              <line x1="70" y1="260" x2="700" y2="260"></line><line x1="70" y1="215" x2="700" y2="215"></line><line x1="70" y1="170" x2="700" y2="170"></line><line x1="70" y1="125" x2="700" y2="125"></line><line x1="70" y1="80" x2="700" y2="80"></line>
            </g>
            <g font-size="12" fill="#475569" text-anchor="end"><text x="62" y="309">0</text><text x="62" y="264">4.000</text><text x="62" y="219">8.000</text><text x="62" y="174">10.000</text><text x="62" y="129">12.000</text><text x="62" y="84">16.000</text></g>
            <polyline fill="none" stroke="#111827" stroke-width="4" points="88,205 118,198 148,190 178,180 208,171 238,165 268,154 298,148 328,126 358,116 388,111 418,106 448,100 478,74 508,69 538,63 568,60 598,55 628,50 658,45 688,42"></polyline>
            <g fill="#111827">
              <circle cx="88" cy="205" r="5"/><circle cx="118" cy="198" r="5"/><circle cx="148" cy="190" r="5"/><circle cx="178" cy="180" r="5"/><circle cx="208" cy="171" r="5"/><circle cx="238" cy="165" r="5"/><circle cx="268" cy="154" r="5"/><circle cx="298" cy="148" r="5"/><circle cx="328" cy="126" r="5"/><circle cx="358" cy="116" r="5"/><circle cx="388" cy="111" r="5"/><circle cx="418" cy="106" r="5"/><circle cx="448" cy="100" r="5"/><circle cx="478" cy="74" r="5"/><circle cx="508" cy="69" r="5"/><circle cx="538" cy="63" r="5"/><circle cx="568" cy="60" r="5"/><circle cx="598" cy="55" r="5"/><circle cx="628" cy="50" r="5"/><circle cx="658" cy="45" r="5"/><circle cx="688" cy="42" r="5"/>
            </g>
            <g font-size="11" fill="#475569" text-anchor="middle"><text x="88" y="323">2000</text><text x="238" y="323">2005</text><text x="388" y="323">2010</text><text x="538" y="323">2015</text><text x="688" y="323">2020</text></g>
          </svg>
        </figure>`
      }
    ],
    prompt: "De acuerdo con los datos reportados en la gráfica, ¿cuál de las siguientes conclusiones responde adecuadamente la pregunta de los científicos?",
    options: [
      { letter: "A", text: "Las emisiones de gas metano aumentaron a más del doble entre el 2000 y el 2020." },
      { letter: "B", text: "Las emisiones de gas metano se duplicaron entre el 2009 y el 2011." },
      { letter: "C", text: "Las emisiones de gas metano se triplicaron entre el 2016 y el 2020." },
      { letter: "D", text: "Las emisiones de gas metano se mantuvieron constantes entre el 2000 y el 2020." }
    ],
    correctAnswer: "A",
    explanation: "La gráfica muestra que en el año 2000 las emisiones estaban cerca de 6.000 toneladas y en 2020 se acercaban a 14.500 toneladas. Ese valor es más del doble del inicial. Por tanto, la respuesta correcta es A."
  },
  {
    uid: "s2-cnat-068",
    session: 2,
    block: 3,
    number: 68,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Química: clasificación de mezclas",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 68",
    stem: "Luego de analizar los resultados, los científicos proponen implementar biodigestores a pequeña escala en poblaciones rurales que generan grandes cantidades de residuos orgánicos. Los biodigestores aprovechan la digestión anaerobia, en ausencia de oxígeno, que realizan bacterias para transformar desechos orgánicos mezclados con agua en biogás y fertilizantes.",
    resources: [
      {
        type: "html",
        html: `<figure class="question-resource" aria-label="Modelo de biodigestor">
          <div class="resource-title"><strong>Modelo simplificado de biodigestor</strong></div>
          <svg viewBox="0 0 820 330" role="img" style="width:100%;max-width:820px;display:block;margin:auto;border:1px solid var(--line);border-radius:18px;background:linear-gradient(180deg,#ffffff,#f8fafc);">
            <defs><marker id="arrow68" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L6,3 z" fill="#0f172a"></path></marker></defs>
            <text x="26" y="34" font-size="18" font-weight="800" fill="#0f172a">Entrada, digestión anaerobia y salida de productos</text>
            <path d="M145 110 Q410 30 675 110 L650 250 Q410 300 170 250 Z" fill="#e0f2fe" stroke="#0f172a" stroke-width="3"></path>
            <path d="M170 190 Q410 235 650 190 L650 250 Q410 300 170 250 Z" fill="#bfdbfe" stroke="#64748b" stroke-width="2"></path>
            <text x="250" y="225" font-size="15" font-weight="800" fill="#1e3a8a">1. Agua + residuos orgánicos + bacterias anaerobias</text>
            <text x="285" y="128" font-size="15" font-weight="800" fill="#334155">2. Volumen gaseoso: CO₂ + CH₄</text>
            <line x1="45" y1="135" x2="160" y2="155" stroke="#0f172a" stroke-width="4" marker-end="url(#arrow68)"></line><text x="30" y="118" font-size="14" font-weight="800">Entrada de residuos</text>
            <line x1="410" y1="80" x2="410" y2="28" stroke="#0f172a" stroke-width="4" marker-end="url(#arrow68)"></line><text x="430" y="45" font-size="14" font-weight="800">Salida de biogás</text>
            <line x1="660" y1="220" x2="775" y2="220" stroke="#0f172a" stroke-width="4" marker-end="url(#arrow68)"></line><text x="585" y="287" font-size="14" font-weight="800">Salida de fertilizante producido</text>
            <rect x="486" y="72" width="16" height="70" fill="#94a3b8" stroke="#0f172a"/><text x="515" y="110" font-size="14" font-weight="800">Válvula de seguridad</text>
          </svg>
        </figure>`
      }
    ],
    prompt: "Se desea clasificar la mezcla inicial que se forma al agregar los residuos orgánicos en el biodigestor. Si una mezcla se clasifica en homogénea cuando no se pueden diferenciar a simple vista sus partes y heterogénea cuando se pueden diferenciar sus partes, ¿qué tipo de mezcla se tiene al inicio del proceso?",
    options: [
      { letter: "A", text: "Una mezcla heterogénea de biogás y fertilizantes como productos iniciales del proceso." },
      { letter: "B", text: "Una mezcla homogénea de dióxido de carbono como único producto del proceso." },
      { letter: "C", text: "Una mezcla heterogénea de estiércol de animales, residuos de alimentos y agua." },
      { letter: "D", text: "Una mezcla homogénea de bacterias aerobias, biogás y estiércol de animales." }
    ],
    correctAnswer: "C",
    explanation: "Al inicio del proceso se agregan agua y residuos orgánicos, como estiércol o residuos de alimentos. Como estas partes pueden diferenciarse a simple vista, se trata de una mezcla heterogénea. Por tanto, la respuesta correcta es C."
  },
  {
    uid: "s2-cnat-069",
    session: 2,
    block: 3,
    number: 69,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Tecnología y ambiente: seguridad en biodigestores",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 69",
    stem: "En el biodigestor, los residuos orgánicos se transforman en biogás y fertilizante. Como durante el proceso se acumulan gases como CO₂ y CH₄ en el volumen gaseoso, el modelo incluye una válvula de seguridad y una conducción de biogás hacia la cocina.",
    resources: [
      {
        type: "html",
        content: `<div class="info-card"><strong>Elementos del biodigestor</strong><ul><li><strong>Entrada:</strong> residuos orgánicos mezclados con agua.</li><li><strong>Volumen gaseoso:</strong> acumulación de biogás, principalmente CO₂ y CH₄.</li><li><strong>Válvula de seguridad:</strong> permite controlar la presión interna.</li><li><strong>Salida:</strong> conducción de biogás y fertilizante producido.</li></ul></div>`
      }
    ],
    prompt: "De acuerdo con el modelo, ¿cuál es el manejo apropiado que se debe hacer para evitar la acumulación de gases y el aumento en la presión al interior del biodigestor?",
    options: [
      { letter: "A", text: "Depositar en el biodigestor diariamente todo tipo de residuos orgánicos e inorgánicos generados por los habitantes de la zona." },
      { letter: "B", text: "Aumentar drásticamente la temperatura del biodigestor para acelerar el proceso de descomposición de los residuos orgánicos." },
      { letter: "C", text: "Revisar constantemente la válvula de seguridad para evitar la acumulación de gases que puedan ocasionar la explosión del biodigestor." },
      { letter: "D", text: "Retirar la válvula de seguridad para acelerar el proceso de descomposición de los residuos sólidos e incrementar la producción de biogás." }
    ],
    correctAnswer: "C",
    explanation: "La válvula de seguridad permite controlar la presión interna del biodigestor. Revisarla constantemente ayuda a evitar acumulación peligrosa de gases y reduce el riesgo de explosión. Por tanto, la respuesta correcta es C."
  }


,
  {
    uid: "s2-cnat-070",
    session: 2,
    block: 3,
    number: 70,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Biología molecular: organización y representación de datos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 70",
    stem: "En una investigación se analizó el número de bases nitrogenadas presentes en una de las hebras del ADN mitocondrial de cuatro especies de caracoles. Las bases nitrogenadas son adenina (A), citosina (C), guanina (G) y timina (T).",
    resources: [
      {
        type: "html",
        html: `<figure class="question-resource" aria-label="Tabla de bases nitrogenadas en caracoles">
          <div class="resource-title"><strong>Bases nitrogenadas en cuatro especies de caracoles</strong></div>
          <div class="table-wrap">
            <table class="data-table compact">
              <thead><tr><th>Especie de caracol</th><th>A</th><th>C</th><th>G</th><th>T</th></tr></thead>
              <tbody>
                <tr><td><em>Haliotis rubra</em></td><td>5.844</td><td>4.515</td><td>2.398</td><td>4.150</td></tr>
                <tr><td><em>Haliotis tuberculata</em></td><td>5.746</td><td>4.265</td><td>2.224</td><td>4.286</td></tr>
                <tr><td><em>Haliotis discus</em></td><td>5.605</td><td>4.105</td><td>2.163</td><td>3.911</td></tr>
                <tr><td><em>Haliotis diversicolor</em></td><td>5.720</td><td>4.258</td><td>2.224</td><td>3.974</td></tr>
              </tbody>
            </table>
          </div>
          <p class="resource-note">La opción correcta debe representar que A es la base más abundante, C es la segunda, T es cercana a C pero menor, y G es la menor en las cuatro especies.</p>
        </figure>`
      }
    ],
    prompt: "De acuerdo con la información presentada, ¿cuál de las siguientes gráficas muestra de forma correcta la tabulación de los datos?",
    options: [
      { letter: "A", text: "Una gráfica en la que la base C aparece alrededor de 2.000 y la base G alrededor de 4.000 para las especies, intercambiando los valores de C y G." },
      { letter: "B", text: "Una gráfica en la que la base T aparece como la menor y la base G con valores cercanos a 4.000." },
      { letter: "C", text: "Una gráfica en la que A se mantiene cerca de 5.600 a 5.800, C cerca de 4.100 a 4.500, G cerca de 2.100 a 2.400 y T cerca de 3.900 a 4.300." },
      { letter: "D", text: "Una gráfica en la que C aparece como la base más abundante y A con valores cercanos a 4.000." }
    ],
    correctAnswer: "C",
    explanation: "En la tabla, para las cuatro especies, la adenina (A) tiene los valores más altos; la citosina (C) está alrededor de 4.100 a 4.500; la timina (T) está cerca de 3.900 a 4.300, y la guanina (G) tiene los valores más bajos, alrededor de 2.100 a 2.400. La gráfica que conserva esta organización es la opción C."
  }

,
  {
    uid: "s2-cnat-071",
    session: 2,
    block: 3,
    number: 71,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Biología vegetal: transporte de sustancias en plantas",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 71",
    stem: "La selva tropical se caracteriza por sus altas temperaturas y densa vegetación, donde las plantas luchan por alcanzar la luz del sol, uno de los recursos esenciales para la fotosíntesis. En este ecosistema, la savia juega un papel muy importante, pues es como la sangre de las plantas, y transporta los nutrientes y el agua desde las raíces hasta las partes superiores de los árboles gigantes, donde las hojas pueden capturar fácilmente la luz del sol para la fotosíntesis.",
    resources: [
      {
        type: "html",
        html: `<div class="info-card"><strong>Idea clave</strong><p>La savia permite distribuir agua y nutrientes dentro de la planta. Este transporte es fundamental para que las hojas, especialmente en plantas altas, puedan realizar procesos como la fotosíntesis.</p></div>`
      }
    ],
    prompt: "Teniendo en cuenta lo descrito anteriormente, ¿por qué el movimiento de la savia es crucial para el funcionamiento de las plantas en la selva tropical?",
    options: [
      { letter: "A", text: "Porque mantiene una temperatura adecuada en todas las estructuras del cuerpo de la planta, evitando el sobrecalentamiento causado por la temperatura tropical." },
      { letter: "B", text: "Porque proporciona altura a los árboles para alcanzar fácilmente la luz del sol." },
      { letter: "C", text: "Porque transporta los nutrientes y el agua desde las raíces hasta las partes superiores de las plantas, permitiendo la distribución de estos recursos en toda la planta." },
      { letter: "D", text: "Porque repele a los insectos y a los herbívoros que pueden dañar las plantas en la selva." }
    ],
    correctAnswer: "C",
    explanation: "La savia cumple la función de transportar agua y nutrientes desde las raíces hacia otras partes de la planta. En árboles altos de la selva tropical, este transporte permite que las hojas reciban los recursos necesarios para procesos como la fotosíntesis. Por tanto, la respuesta correcta es C."
  }


,
  {
    uid: "s2-cnat-072",
    session: 2,
    block: 3,
    number: 72,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Ciencias de la Tierra: instrumentos meteorológicos y energía eólica",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 72",
    stem: "En la construcción de un parque eólico que aprovecha la energía del viento para producir electricidad, se miden diferentes propiedades del aire usando distintos instrumentos.",
    resources: [
      {
        type: "html",
        html: `<div class="table-wrap">
            <table>
              <thead>
                <tr><th>Instrumento</th><th>Propiedad que mide</th></tr>
              </thead>
              <tbody>
                <tr><td>Barómetro</td><td>Presión atmosférica</td></tr>
                <tr><td>Termómetro</td><td>Temperatura del aire</td></tr>
                <tr><td>Anemómetro</td><td>Dirección y velocidad del viento</td></tr>
                <tr><td>Higrómetro</td><td>Contenido de humedad del aire</td></tr>
              </tbody>
            </table>
          </div>
          <p class="resource-note">Para aprovechar la energía eólica, el aire debe viajar entre 3 m/s y 25 m/s.</p>`
      }
    ],
    prompt: "¿Cuál instrumento de medida se debe revisar para verificar que se cumpla este requisito?",
    options: [
      { letter: "A", text: "El barómetro." },
      { letter: "B", text: "El termómetro." },
      { letter: "C", text: "El anemómetro." },
      { letter: "D", text: "El higrómetro." }
    ],
    correctAnswer: "C",
    explanation: "El requisito está expresado en metros por segundo (m/s), una unidad de velocidad. Según la tabla, el instrumento que mide la dirección y la velocidad del viento es el anemómetro. Por eso, la respuesta correcta es C."
  }



,
  {
    uid: "s2-cnat-073",
    session: 2,
    block: 3,
    number: 73,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Ecología: interacciones y equilibrio de ecosistemas",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 73",
    stem: "Preocupados por la extracción masiva de musgo para hacer decoraciones navideñas, un grupo de estudiantes investigó las interacciones que tienen estos organismos en un bosque cercano a su escuela. Encontraron que el musgo es usado como material de construcción de nidos por varias aves; es refugio de insectos, arañas y ranas; el agua permite su reproducción; y el musgo retiene el agua como una esponja y la libera lentamente.",
    resources: [
      {
        type: "html",
        html: `<div class="info-card"><strong>Interacciones del musgo en el bosque</strong><ul><li>Sirve como material para nidos de varias aves.</li><li>Funciona como refugio para insectos, arañas y ranas.</li><li>Depende del agua para reproducirse.</li><li>Retiene agua y la libera lentamente, ayudando a conservar la humedad.</li></ul></div>`
      }
    ],
    prompt: "Según la información anterior, ¿de qué manera estas interacciones intervienen en el equilibrio del bosque?",
    options: [
      { letter: "A", text: "Permiten que el musgo sea usado para decoraciones navideñas." },
      { letter: "B", text: "Disminuyen el agua proveniente de la lluvia y de la atmósfera." },
      { letter: "C", text: "Contribuyen a la humedad del bosque y a la presencia de especies." },
      { letter: "D", text: "Permiten la proliferación de plagas como insectos, arañas y ranas." }
    ],
    correctAnswer: "C",
    explanation: "El musgo contribuye al equilibrio del bosque porque retiene y libera agua lentamente, lo que ayuda a mantener la humedad, y además proporciona refugio o material de nido para diferentes especies. Por tanto, la respuesta correcta es C."
  }

,
  {
    uid: "s2-cnat-074",
    session: 2,
    block: 3,
    number: 74,
    area: "Ciencias Naturales",
    competencia: "Indagación",
    componente: "Ciencia, tecnología y sociedad: interpretación de datos nutricionales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 74",
    stem: "Un grupo de investigadores quiere saber cuáles son los contenidos nutricionales, en relación con la concentración de azúcares (grados Brix) y el contenido de fibra (%), de tres variedades de manzanas. Después de los análisis, obtuvieron los resultados que se muestran en la tabla.",
    resources: [
      {
        type: "html",
        html: `<div class="table-wrap">
            <table>
              <thead>
                <tr><th>Variedad</th><th>Concentración de azúcar (grados Brix)</th><th>Contenido de fibra (%)</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>15,8</td><td>2,7</td></tr>
                <tr><td>2</td><td>7,3</td><td>2,5</td></tr>
                <tr><td>3</td><td>11,3</td><td>1,7</td></tr>
              </tbody>
            </table>
          </div>
          <p class="resource-note">Los investigadores concluyeron que la variedad de manzana 1, al tener el mayor tamaño, almacenaba mayor cantidad de azúcares y fibra que las variedades 2 y 3, siendo así la mejor para la alimentación humana.</p>`
      }
    ],
    prompt: "Teniendo en cuenta lo anterior, ¿la conclusión dada por los investigadores es correcta?",
    options: [
      { letter: "A", text: "Sí, porque, a mayor tamaño del fruto, mayor porcentaje nutricional de los frutos." },
      { letter: "B", text: "No, porque las tres variedades de manzana aportan igual cantidad de nutrientes." },
      { letter: "C", text: "No, porque no se evaluó el tamaño del fruto ni su relación con las variables." },
      { letter: "D", text: "Sí, porque, a mayor contenido de azúcares, mayor contenido de fibra en los frutos." }
    ],
    correctAnswer: "C",
    explanation: "La tabla solo presenta concentración de azúcares y contenido de fibra; no incluye datos sobre el tamaño del fruto. Por eso, no es válido concluir que la variedad 1 almacena más azúcares y fibra por tener mayor tamaño, ni afirmar que sea la mejor con base en una variable no evaluada. La respuesta correcta es C."
  }


,
  {
    uid: "s2-cnat-075",
    session: 2,
    block: 3,
    number: 75,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Física: cantidad de movimiento y choques",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 75",
    stem: "En un experimento, un carro de juguete choca con otro de la misma masa, que se encuentra inicialmente en reposo, y ambos quedan unidos por un trozo de plastilina. Después del choque, los dos carros se mueven con una velocidad que es la mitad de la velocidad inicial que tenía el carro 1 antes del choque. Una estudiante analiza una situación similar, pero con tres carros de la misma masa: el carro 1 se mueve y choca contra los carros 2 y 3, que inicialmente están en reposo, y los tres quedan unidos después del choque.",
    resources: [
      {
        type: "html",
        html: `<div class="info-card"><strong>Choque con carros de juguete</strong><p><strong>Situación base:</strong> si un carro en movimiento choca con otro carro de igual masa en reposo y ambos quedan unidos, la velocidad final del conjunto es la mitad de la velocidad inicial del carro 1.</p><p><strong>Nueva situación:</strong> el carro 1 choca con dos carros de igual masa en reposo; después del choque, los tres carros quedan unidos y se mueven en la misma dirección.</p></div>`
      }
    ],
    prompt: "En este caso, ¿cómo será la velocidad de los tres carros después del choque?",
    options: [
      { letter: "A", text: "Un tercio de la velocidad inicial del carro 1, porque la plastilina también adquiere cantidad de movimiento después del choque." },
      { letter: "B", text: "Un tercio de la velocidad inicial del carro 1, porque se distribuye en el número de carros que se unen después del choque." },
      { letter: "C", text: "Igual a la velocidad inicial del carro 1, porque todos deben tener la misma velocidad después de quedar unidos." },
      { letter: "D", text: "Igual a la velocidad inicial del carro 1, porque los tres carros tienen la misma masa y por lo tanto la misma velocidad." }
    ],
    correctAnswer: "B",
    explanation: "Como los carros tienen la misma masa y quedan unidos, la cantidad de movimiento inicial del carro 1 se reparte entre los tres carros que forman el conjunto final. Por eso, la velocidad final corresponde a un tercio de la velocidad inicial del carro 1. La respuesta correcta es B."
  }

,
  {
    uid: "s2-cnat-076",
    session: 2,
    block: 3,
    number: 76,
    area: "Ciencias Naturales",
    competencia: "Uso comprensivo del conocimiento científico",
    componente: "Química: propiedades de los materiales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 76",
    stem: "En la industria automotriz se buscan metales que tengan baja densidad, que sean maleables y que presenten alta resistencia a la corrosión. La siguiente tabla presenta algunos metales y sus propiedades.",
    resources: [
      {
        type: "html",
        html: `<div class="table-wrap">
            <table>
              <thead>
                <tr><th>Metal</th><th>Sufre corrosión</th><th>Densidad (g/mL)</th><th>Es maleable</th></tr>
              </thead>
              <tbody>
                <tr><td>Cobre</td><td>No</td><td>8,96</td><td>Sí</td></tr>
                <tr><td>Cromo</td><td>No</td><td>7,2</td><td>Sí</td></tr>
                <tr><td>Escandio</td><td>No</td><td>3,0</td><td>Sí</td></tr>
                <tr><td>Hierro</td><td>Sí</td><td>7,87</td><td>Sí</td></tr>
                <tr><td>Titanio</td><td>No</td><td>4,5</td><td>No</td></tr>
              </tbody>
            </table>
          </div>`
      }
    ],
    prompt: "Con base en las propiedades reportadas en la tabla, si la industria automotriz necesita dos metales que no sufran corrosión por el agua, que sean maleables y cuya densidad no supere los 7,5 g/mL, ¿qué metales se deben elegir?",
    options: [
      { letter: "A", text: "Escandio y titanio." },
      { letter: "B", text: "Hierro y cobre." },
      { letter: "C", text: "Cromo y escandio." },
      { letter: "D", text: "Cromo y titanio." }
    ],
    correctAnswer: "C",
    explanation: "Los metales deben cumplir tres condiciones: no sufrir corrosión, ser maleables y tener densidad menor o igual a 7,5 g/mL. El cromo cumple con densidad 7,2, no corrosión y maleabilidad; el escandio cumple con densidad 3,0, no corrosión y maleabilidad. El titanio no es maleable, el cobre supera 7,5 g/mL y el hierro sufre corrosión. Por tanto, la respuesta correcta es C."
  }

,
  {
    uid: "s2-cnat-077",
    session: 2,
    block: 3,
    number: 77,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Física: temperatura, presión y cambios de estado",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 77",
    stem: "Se tienen dos ollas con la misma cantidad de agua, pero se calientan en dos ciudades diferentes. Las ciudades tienen la misma temperatura ambiental; una se encuentra a 500 m sobre el nivel del mar y la otra a 1.500 m. Se sabe que a mayor altura sobre el nivel del mar, menor es la temperatura de ebullición del agua.",
    resources: [
      {
        type: "html",
        html: `<div class="table-wrap" style="max-width:980px;margin:auto">
          <div class="mini-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;align-items:stretch">
            <div class="graph-card" style="border:1px solid var(--line);border-radius:16px;padding:12px;background:rgba(255,255,255,.72)">
              <strong>A.</strong>
              <svg viewBox="0 0 240 160" role="img" aria-label="Gráfica A" style="width:100%;height:auto">
                <line x1="34" y1="130" x2="220" y2="130" stroke="currentColor" stroke-width="2"/><line x1="34" y1="130" x2="34" y2="18" stroke="currentColor" stroke-width="2"/>
                <text x="14" y="18" font-size="11">Temperatura</text><text x="188" y="150" font-size="11">Tiempo</text>
                <line x1="44" y1="55" x2="210" y2="55" stroke="currentColor" stroke-width="3" stroke-dasharray="8 5"/>
                <line x1="44" y1="92" x2="210" y2="92" stroke="currentColor" stroke-width="3"/>
                <text x="158" y="49" font-size="11">Ciudad a 500 m</text><text x="155" y="88" font-size="11">Ciudad a 1.500 m</text>
              </svg>
            </div>
            <div class="graph-card" style="border:1px solid var(--line);border-radius:16px;padding:12px;background:rgba(255,255,255,.72)">
              <strong>B.</strong>
              <svg viewBox="0 0 240 160" role="img" aria-label="Gráfica B" style="width:100%;height:auto">
                <line x1="34" y1="130" x2="220" y2="130" stroke="currentColor" stroke-width="2"/><line x1="34" y1="130" x2="34" y2="18" stroke="currentColor" stroke-width="2"/>
                <text x="14" y="18" font-size="11">Temperatura</text><text x="188" y="150" font-size="11">Tiempo</text>
                <line x1="44" y1="118" x2="202" y2="30" stroke="currentColor" stroke-width="3"/>
                <line x1="44" y1="118" x2="202" y2="76" stroke="currentColor" stroke-width="3" stroke-dasharray="8 5"/>
                <text x="160" y="36" font-size="11">Ciudad a 1.500 m</text><text x="155" y="72" font-size="11">Ciudad a 500 m</text>
              </svg>
            </div>
            <div class="graph-card" style="border:1px solid var(--line);border-radius:16px;padding:12px;background:rgba(255,255,255,.72)">
              <strong>C.</strong>
              <svg viewBox="0 0 240 160" role="img" aria-label="Gráfica C" style="width:100%;height:auto">
                <line x1="34" y1="130" x2="220" y2="130" stroke="currentColor" stroke-width="2"/><line x1="34" y1="130" x2="34" y2="18" stroke="currentColor" stroke-width="2"/>
                <text x="14" y="18" font-size="11">Temperatura</text><text x="188" y="150" font-size="11">Tiempo</text>
                <polyline points="44,85 112,55 150,48 210,48" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="8 5"/>
                <polyline points="44,118 118,82 154,67 210,67" fill="none" stroke="currentColor" stroke-width="3"/>
                <text x="132" y="42" font-size="11">Ciudad a 500 m</text><text x="132" y="62" font-size="11">Ciudad a 1.500 m</text>
              </svg>
            </div>
            <div class="graph-card" style="border:1px solid var(--line);border-radius:16px;padding:12px;background:rgba(255,255,255,.72)">
              <strong>D.</strong>
              <svg viewBox="0 0 240 160" role="img" aria-label="Gráfica D" style="width:100%;height:auto">
                <line x1="34" y1="130" x2="220" y2="130" stroke="currentColor" stroke-width="2"/><line x1="34" y1="130" x2="34" y2="18" stroke="currentColor" stroke-width="2"/>
                <text x="14" y="18" font-size="11">Temperatura</text><text x="188" y="150" font-size="11">Tiempo</text>
                <polyline points="44,118 112,84 148,52 210,52" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="8 5"/>
                <polyline points="44,118 106,86 132,72 210,72" fill="none" stroke="currentColor" stroke-width="3"/>
                <text x="140" y="45" font-size="11">Ciudad a 500 m</text><text x="132" y="68" font-size="11">Ciudad a 1.500 m</text>
              </svg>
            </div>
          </div>
        </div>`
      }
    ],
    prompt: "¿Cuál de las siguientes gráficas de temperatura en función del tiempo representa el proceso para alcanzar la temperatura de ebullición en las ciudades de distintas alturas?",
    options: [
      { letter: "A", text: "Gráfica A." },
      { letter: "B", text: "Gráfica B." },
      { letter: "C", text: "Gráfica C." },
      { letter: "D", text: "Gráfica D." }
    ],
    correctAnswer: "D",
    explanation: "Las dos ollas inician a la misma temperatura ambiental y, al calentarse, la temperatura aumenta hasta llegar a la ebullición. Como la ciudad ubicada a 1.500 m está a mayor altura, el agua alcanza una temperatura de ebullición menor que en la ciudad ubicada a 500 m. Por eso, la gráfica correcta debe mostrar una meseta más baja para 1.500 m y una meseta más alta para 500 m. La respuesta correcta es D."
  }


,
  {
    uid: "s2-cnat-078",
    session: 2,
    block: 3,
    number: 78,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Física: ondas y sonido",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 78",
    stem: "Un músico está tocando su trompeta cerca de un lago en el que un buzo hace sus prácticas cotidianas. El buzo percibe el sonido como si proviniera de otro lugar debido al fenómeno de la refracción, como se modela en la imagen.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:860px;margin:auto">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:end;min-height:220px;border:1px solid var(--line);border-radius:18px;padding:18px;background:linear-gradient(180deg,rgba(255,255,255,.85),rgba(226,246,255,.65))">
            <div style="align-self:start;font-weight:700">Aire</div>
            <div style="text-align:right;font-weight:700">Sonido refractado</div>
            <div style="grid-column:1 / -1;border-top:4px solid rgba(40,90,120,.45);position:relative;height:120px;background:rgba(58,146,180,.12);border-radius:0 0 14px 14px">
              <span style="position:absolute;left:18px;top:-84px;font-size:46px" aria-hidden="true">🎺</span>
              <span style="position:absolute;right:52px;bottom:18px;font-size:46px" aria-hidden="true">🤿</span>
              <svg viewBox="0 0 700 160" role="img" aria-label="Modelo de refracción del sonido al pasar del aire al agua" style="width:100%;height:100%;position:absolute;left:0;top:0">
                <path d="M80 12 C180 18, 230 38, 315 64 C410 94, 500 112, 620 132" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="10 8"/>
                <path d="M90 22 C145 20, 185 32, 235 50" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/>
                <path d="M295 76 C360 92, 420 106, 485 116" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/>
                <text x="20" y="145" font-size="16">Agua</text>
              </svg>
            </div>
          </div>
        </div>`
      }
    ],
    prompt: "¿Cuál de las siguientes opciones es una característica del sonido que se altera al cambiar del aire al agua?",
    options: [
      { letter: "A", text: "La velocidad." },
      { letter: "B", text: "La fuente." },
      { letter: "C", text: "La profundidad." },
      { letter: "D", text: "La densidad." }
    ],
    correctAnswer: "A",
    explanation: "La refracción ocurre cuando una onda cambia de medio de propagación. Al pasar del aire al agua, el sonido cambia su velocidad de propagación y por eso cambia la dirección con la que se percibe. La fuente del sonido no cambia, y la profundidad o la densidad no son características propias del sonido. Por tanto, la respuesta correcta es A."
  }


,
  {
    uid: "s2-cnat-079",
    session: 2,
    block: 3,
    number: 79,
    area: "Ciencias Naturales",
    competencia: "Explicación de fenómenos",
    componente: "Química: cambios de estado de la materia",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 2 - Ciencias Naturales - Pregunta 79",
    stem: "El CO₂, también conocido como hielo seco, se presenta en estado sólido y, a temperatura ambiente, cambia a estado gaseoso; a este proceso se le conoce como sublimación, mientras que el proceso contrario se denomina sublimación inversa.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto;text-align:center">
          <h4 style="margin:0 0 12px">Cambio de estado del CO₂</h4>
          <svg viewBox="0 0 760 280" role="img" aria-label="Sublimación del dióxido de carbono: de sólido a gaseoso" style="width:100%;height:auto">
            <defs>
              <marker id="arrow79" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="currentColor"></path>
              </marker>
            </defs>
            <rect x="70" y="95" width="120" height="120" rx="12" fill="rgba(20,70,110,.14)" stroke="currentColor" stroke-width="3"></rect>
            <path d="M70 95 L105 62 L225 62 L190 95 Z" fill="rgba(20,70,110,.08)" stroke="currentColor" stroke-width="3"></path>
            <path d="M190 95 L225 62 L225 180 L190 215 Z" fill="rgba(20,70,110,.10)" stroke="currentColor" stroke-width="3"></path>
            <text x="102" y="160" font-size="22" font-weight="700">Sólido</text>
            <path d="M278 86 C360 18, 488 18, 575 86" fill="none" stroke="currentColor" stroke-width="6" marker-end="url(#arrow79)"></path>
            <text x="380" y="42" font-size="24" font-weight="700">Sublimación</text>
            <path d="M575 202 C488 260, 360 260, 278 202" fill="none" stroke="currentColor" stroke-width="6" marker-end="url(#arrow79)"></path>
            <text x="342" y="255" font-size="22" font-weight="700">Sublimación inversa</text>
            <g transform="translate(545 100)">
              <ellipse cx="42" cy="60" rx="58" ry="34" fill="rgba(20,70,110,.08)" stroke="currentColor" stroke-width="3"></ellipse>
              <ellipse cx="88" cy="72" rx="62" ry="38" fill="rgba(20,70,110,.08)" stroke="currentColor" stroke-width="3"></ellipse>
              <ellipse cx="132" cy="58" rx="54" ry="34" fill="rgba(20,70,110,.08)" stroke="currentColor" stroke-width="3"></ellipse>
              <text x="70" y="68" font-size="22" font-weight="700">Gaseoso</text>
            </g>
          </svg>
        </div>`
      }
    ],
    prompt: "Según la información anterior, ¿qué propiedad del CO₂ cambia durante el proceso de sublimación?",
    options: [
      { letter: "A", text: "La densidad, porque la masa de sus moléculas disminuye cuando se sublima a la inversa." },
      { letter: "B", text: "El tamaño de las moléculas, porque en estado sólido su diámetro es menor." },
      { letter: "C", text: "El volumen, porque en estado gaseoso sus moléculas ocupan todo el espacio del recipiente." },
      { letter: "D", text: "La masa, porque durante la sublimación sus moléculas son más pequeñas." }
    ],
    correctAnswer: "C",
    explanation: "En la sublimación, el CO₂ pasa de sólido a gas. La masa y el tamaño de las moléculas no cambian; lo que cambia es la forma en que están distribuidas. En estado gaseoso, las moléculas se separan y ocupan el volumen disponible del recipiente. Por eso, la respuesta correcta es C."
  }


,
  {
    uid: "s2-ing-080",
    session: 2,
    block: 4,
    number: 80,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-at-a-picnic-80-84",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 80",
    stem: "Part 1.A. Read the descriptions and choose the word that matches each description. Topic: At a picnic.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.A · At a Picnic</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. table</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the picnic matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>blanket</td></tr>
                <tr><td>B</td><td>glass</td></tr>
                <tr><td>C</td><td>grass</td></tr>
                <tr><td>D</td><td>hat</td></tr>
                <tr><td>E</td><td>park</td></tr>
                <tr><td>F</td><td>salad</td></tr>
                <tr><td>G</td><td>sandwich</td></tr>
                <tr><td>H</td><td>table <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "80. You find this plant on the ground of fields and the countryside.",
    options: [
      { letter: "A", text: "blanket" },
      { letter: "B", text: "glass" },
      { letter: "C", text: "grass" },
      { letter: "D", text: "hat" },
      { letter: "E", text: "park" },
      { letter: "F", text: "salad" },
      { letter: "G", text: "sandwich" }
    ],
    correctAnswer: "C",
    explanation: "The description refers to a plant found on the ground in fields and the countryside. The matching word is 'grass'. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-081",
    session: 2,
    block: 4,
    number: 81,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-at-a-picnic-80-84",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 81",
    stem: "Part 1.A. Read the descriptions and choose the word that matches each description. Topic: At a picnic.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.A · At a Picnic</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. table</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the picnic matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>blanket</td></tr>
                <tr><td>B</td><td>glass</td></tr>
                <tr><td>C</td><td>grass</td></tr>
                <tr><td>D</td><td>hat</td></tr>
                <tr><td>E</td><td>park</td></tr>
                <tr><td>F</td><td>salad</td></tr>
                <tr><td>G</td><td>sandwich</td></tr>
                <tr><td>H</td><td>table <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "81. It has many vegetables and you can eat it in a bowl.",
    options: [
      { letter: "A", text: "blanket" },
      { letter: "B", text: "glass" },
      { letter: "C", text: "grass" },
      { letter: "D", text: "hat" },
      { letter: "E", text: "park" },
      { letter: "F", text: "salad" },
      { letter: "G", text: "sandwich" }
    ],
    correctAnswer: "F",
    explanation: "The description refers to food with many vegetables that can be eaten in a bowl. The matching word is 'salad'. Therefore, the correct answer is F."
  },
  {
    uid: "s2-ing-082",
    session: 2,
    block: 4,
    number: 82,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-at-a-picnic-80-84",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 82",
    stem: "Part 1.A. Read the descriptions and choose the word that matches each description. Topic: At a picnic.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.A · At a Picnic</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. table</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the picnic matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>blanket</td></tr>
                <tr><td>B</td><td>glass</td></tr>
                <tr><td>C</td><td>grass</td></tr>
                <tr><td>D</td><td>hat</td></tr>
                <tr><td>E</td><td>park</td></tr>
                <tr><td>F</td><td>salad</td></tr>
                <tr><td>G</td><td>sandwich</td></tr>
                <tr><td>H</td><td>table <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "82. This place has trees and children can play there.",
    options: [
      { letter: "A", text: "blanket" },
      { letter: "B", text: "glass" },
      { letter: "C", text: "grass" },
      { letter: "D", text: "hat" },
      { letter: "E", text: "park" },
      { letter: "F", text: "salad" },
      { letter: "G", text: "sandwich" }
    ],
    correctAnswer: "E",
    explanation: "The description refers to a place with trees where children can play. The matching word is 'park'. Therefore, the correct answer is E."
  },
  {
    uid: "s2-ing-083",
    session: 2,
    block: 4,
    number: 83,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-at-a-picnic-80-84",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 83",
    stem: "Part 1.A. Read the descriptions and choose the word that matches each description. Topic: At a picnic.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.A · At a Picnic</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. table</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the picnic matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>blanket</td></tr>
                <tr><td>B</td><td>glass</td></tr>
                <tr><td>C</td><td>grass</td></tr>
                <tr><td>D</td><td>hat</td></tr>
                <tr><td>E</td><td>park</td></tr>
                <tr><td>F</td><td>salad</td></tr>
                <tr><td>G</td><td>sandwich</td></tr>
                <tr><td>H</td><td>table <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "83. You need this to drink lemonade when you are thirsty.",
    options: [
      { letter: "A", text: "blanket" },
      { letter: "B", text: "glass" },
      { letter: "C", text: "grass" },
      { letter: "D", text: "hat" },
      { letter: "E", text: "park" },
      { letter: "F", text: "salad" },
      { letter: "G", text: "sandwich" }
    ],
    correctAnswer: "B",
    explanation: "The description refers to an object used to drink lemonade. The matching word is 'glass'. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-084",
    session: 2,
    block: 4,
    number: 84,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-at-a-picnic-80-84",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 84",
    stem: "Part 1.A. Read the descriptions and choose the word that matches each description. Topic: At a picnic.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.A · At a Picnic</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. table</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the picnic matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>blanket</td></tr>
                <tr><td>B</td><td>glass</td></tr>
                <tr><td>C</td><td>grass</td></tr>
                <tr><td>D</td><td>hat</td></tr>
                <tr><td>E</td><td>park</td></tr>
                <tr><td>F</td><td>salad</td></tr>
                <tr><td>G</td><td>sandwich</td></tr>
                <tr><td>H</td><td>table <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "84. You wear this on your head for the sun.",
    options: [
      { letter: "A", text: "blanket" },
      { letter: "B", text: "glass" },
      { letter: "C", text: "grass" },
      { letter: "D", text: "hat" },
      { letter: "E", text: "park" },
      { letter: "F", text: "salad" },
      { letter: "G", text: "sandwich" }
    ],
    correctAnswer: "D",
    explanation: "The description refers to something worn on the head to protect from the sun. The matching word is 'hat'. Therefore, the correct answer is D."
  }

,
  {
    uid: "s2-ing-085",
    session: 2,
    block: 4,
    number: 85,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-tourist-85-89",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 85",
    stem: "Part 1.B. Read the descriptions and choose the word that matches each description. Topic: Tourist.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.B · Tourist</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. station</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the tourist matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>airport</td></tr>
                <tr><td>B</td><td>bus</td></tr>
                <tr><td>C</td><td>camera</td></tr>
                <tr><td>D</td><td>car</td></tr>
                <tr><td>E</td><td>hotel</td></tr>
                <tr><td>F</td><td>map</td></tr>
                <tr><td>G</td><td>ship</td></tr>
                <tr><td>H</td><td>station <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "85. Tourists use this drawing to look for famous places to visit.",
    options: [
      { letter: "A", text: "airport" },
      { letter: "B", text: "bus" },
      { letter: "C", text: "camera" },
      { letter: "D", text: "car" },
      { letter: "E", text: "hotel" },
      { letter: "F", text: "map" },
      { letter: "G", text: "ship" }
    ],
    correctAnswer: "F",
    explanation: "Tourists use a map to find famous places to visit. Therefore, the correct answer is F."
  },
  {
    uid: "s2-ing-086",
    session: 2,
    block: 4,
    number: 86,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-tourist-85-89",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 86",
    stem: "Part 1.B. Read the descriptions and choose the word that matches each description. Topic: Tourist.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.B · Tourist</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. station</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the tourist matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>airport</td></tr>
                <tr><td>B</td><td>bus</td></tr>
                <tr><td>C</td><td>camera</td></tr>
                <tr><td>D</td><td>car</td></tr>
                <tr><td>E</td><td>hotel</td></tr>
                <tr><td>F</td><td>map</td></tr>
                <tr><td>G</td><td>ship</td></tr>
                <tr><td>H</td><td>station <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "86. You can take photos with this.",
    options: [
      { letter: "A", text: "airport" },
      { letter: "B", text: "bus" },
      { letter: "C", text: "camera" },
      { letter: "D", text: "car" },
      { letter: "E", text: "hotel" },
      { letter: "F", text: "map" },
      { letter: "G", text: "ship" }
    ],
    correctAnswer: "C",
    explanation: "A camera is used to take photos. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-087",
    session: 2,
    block: 4,
    number: 87,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-tourist-85-89",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 87",
    stem: "Part 1.B. Read the descriptions and choose the word that matches each description. Topic: Tourist.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.B · Tourist</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. station</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the tourist matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>airport</td></tr>
                <tr><td>B</td><td>bus</td></tr>
                <tr><td>C</td><td>camera</td></tr>
                <tr><td>D</td><td>car</td></tr>
                <tr><td>E</td><td>hotel</td></tr>
                <tr><td>F</td><td>map</td></tr>
                <tr><td>G</td><td>ship</td></tr>
                <tr><td>H</td><td>station <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "87. It's small and you drive it to go to new places.",
    options: [
      { letter: "A", text: "airport" },
      { letter: "B", text: "bus" },
      { letter: "C", text: "camera" },
      { letter: "D", text: "car" },
      { letter: "E", text: "hotel" },
      { letter: "F", text: "map" },
      { letter: "G", text: "ship" }
    ],
    correctAnswer: "D",
    explanation: "A car is a vehicle people drive to go to new places. Therefore, the correct answer is D."
  },
  {
    uid: "s2-ing-088",
    session: 2,
    block: 4,
    number: 88,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-tourist-85-89",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 88",
    stem: "Part 1.B. Read the descriptions and choose the word that matches each description. Topic: Tourist.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.B · Tourist</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. station</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the tourist matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>airport</td></tr>
                <tr><td>B</td><td>bus</td></tr>
                <tr><td>C</td><td>camera</td></tr>
                <tr><td>D</td><td>car</td></tr>
                <tr><td>E</td><td>hotel</td></tr>
                <tr><td>F</td><td>map</td></tr>
                <tr><td>G</td><td>ship</td></tr>
                <tr><td>H</td><td>station <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "88. On this, you can go from a beach to the sea.",
    options: [
      { letter: "A", text: "airport" },
      { letter: "B", text: "bus" },
      { letter: "C", text: "camera" },
      { letter: "D", text: "car" },
      { letter: "E", text: "hotel" },
      { letter: "F", text: "map" },
      { letter: "G", text: "ship" }
    ],
    correctAnswer: "G",
    explanation: "A ship is used to travel on water. Therefore, the correct answer is G."
  },
  {
    uid: "s2-ing-089",
    session: 2,
    block: 4,
    number: 89,
    area: "Inglés",
    competencia: "Comprensión de lectura literal",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "matching",
    matchingGroup: "s2-ing-tourist-85-89",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 89",
    stem: "Part 1.B. Read the descriptions and choose the word that matches each description. Topic: Tourist.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:920px;margin:auto">
          <h4 style="margin:0 0 10px">Part 1.B · Tourist</h4>
          <p style="margin:0 0 12px">Match each description with the correct word. Two words are extra. The example uses <strong>H. station</strong>.</p>
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Words for the tourist matching exercise">
              <thead>
                <tr><th>Letter</th><th>Word</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>airport</td></tr>
                <tr><td>B</td><td>bus</td></tr>
                <tr><td>C</td><td>camera</td></tr>
                <tr><td>D</td><td>car</td></tr>
                <tr><td>E</td><td>hotel</td></tr>
                <tr><td>F</td><td>map</td></tr>
                <tr><td>G</td><td>ship</td></tr>
                <tr><td>H</td><td>station <em>(example)</em></td></tr>
              </tbody>
            </table>
          </div>
        </div>`
      }
    ],
    prompt: "89. Here tourists take planes to visit different places around the world.",
    options: [
      { letter: "A", text: "airport" },
      { letter: "B", text: "bus" },
      { letter: "C", text: "camera" },
      { letter: "D", text: "car" },
      { letter: "E", text: "hotel" },
      { letter: "F", text: "map" },
      { letter: "G", text: "ship" }
    ],
    correctAnswer: "A",
    explanation: "Tourists take planes at an airport. Therefore, the correct answer is A."
  }

,
  {
    uid: "s2-ing-090",
    session: 2,
    block: 4,
    number: 90,
    area: "Inglés",
    competencia: "Comprensión de avisos y señales",
    componente: "Identificación de contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "notice-location",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 90",
    stem: "Part 2. Read the notice and choose where you can see it.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 2 · Notices</h4>
          <p style="margin:0 0 12px">Where can you see this notice?</p>
          <div style="border:2px solid rgba(30,60,90,.35);border-radius:12px;padding:22px;text-align:center;font-size:1.45rem;font-weight:800;background:rgba(30,60,90,.06)">Fantastic apple pies for birthdays!</div>
        </div>`
      }
    ],
    prompt: "90. Where can you see this notice?",
    options: [
      { letter: "A", text: "in a cake shop" },
      { letter: "B", text: "in a fruit shop" },
      { letter: "C", text: "in a candy shop" }
    ],
    correctAnswer: "A",
    explanation: "The notice offers apple pies for birthdays. This is most likely seen in a cake shop. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-091",
    session: 2,
    block: 4,
    number: 91,
    area: "Inglés",
    competencia: "Comprensión de avisos y señales",
    componente: "Identificación de contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "notice-location",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 91",
    stem: "Part 2. Read the notice and choose where you can see it.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 2 · Notices</h4>
          <p style="margin:0 0 12px">Where can you see this notice?</p>
          <div style="border:2px solid rgba(30,60,90,.35);border-radius:12px;padding:22px;text-align:center;background:rgba(30,60,90,.06)">
            <div style="font-size:1.55rem;font-weight:800">Play with me!</div>
            <div style="margin-top:6px;font-size:1.05rem">Children 2+</div>
          </div>
        </div>`
      }
    ],
    prompt: "91. Where can you see this notice?",
    options: [
      { letter: "A", text: "on a doll box" },
      { letter: "B", text: "on a milk box" },
      { letter: "C", text: "on a shoe box" }
    ],
    correctAnswer: "A",
    explanation: "The words 'Play with me!' and 'Children 2+' suggest a toy. This notice can be seen on a doll box. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-092",
    session: 2,
    block: 4,
    number: 92,
    area: "Inglés",
    competencia: "Comprensión de avisos y señales",
    componente: "Identificación de contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "notice-location",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 92",
    stem: "Part 2. Read the notice and choose where you can see it.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 2 · Notices</h4>
          <p style="margin:0 0 12px">Where can you see this notice?</p>
          <div style="border:2px solid rgba(30,60,90,.35);border-radius:12px;padding:18px;background:rgba(30,60,90,.06);font-size:1.15rem">
            <strong>GET ONE FOR YOUR BIRTHDAY!</strong><br>
            Chocolate and banana for $20<br>
            Chocolate and coconut for $25
          </div>
        </div>`
      }
    ],
    prompt: "92. Where can you see this notice?",
    options: [
      { letter: "A", text: "in a cake store" },
      { letter: "B", text: "in a flower store" },
      { letter: "C", text: "in a drug store" }
    ],
    correctAnswer: "A",
    explanation: "The notice mentions birthday products with chocolate, banana, and coconut. This is most likely seen in a cake store. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-093",
    session: 2,
    block: 4,
    number: 93,
    area: "Inglés",
    competencia: "Comprensión de avisos y señales",
    componente: "Identificación de contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "notice-location",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 93",
    stem: "Part 2. Read the notice and choose where you can see it.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 2 · Notices</h4>
          <p style="margin:0 0 12px">Where can you see this notice?</p>
          <div style="border:2px solid rgba(30,60,90,.35);border-radius:12px;padding:22px;text-align:center;background:rgba(30,60,90,.06)">
            <div style="font-size:1.45rem;font-weight:800">Pick up food here.</div>
            <div style="margin-top:8px;font-size:1.25rem">Enjoy!</div>
          </div>
        </div>`
      }
    ],
    prompt: "93. Where can you see this notice?",
    options: [
      { letter: "A", text: "at a playground" },
      { letter: "B", text: "in a cafeteria" },
      { letter: "C", text: "on a bus" }
    ],
    correctAnswer: "B",
    explanation: "The notice tells people where to pick up food. This is most likely seen in a cafeteria. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-094",
    session: 2,
    block: 4,
    number: 94,
    area: "Inglés",
    competencia: "Comprensión de avisos y señales",
    componente: "Identificación de contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "notice-location",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 94",
    stem: "Part 2. Read the notice and choose where you can see it.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 2 · Notices</h4>
          <p style="margin:0 0 12px">Where can you see this notice?</p>
          <div style="border:2px solid rgba(30,60,90,.35);border-radius:12px;padding:22px;text-align:center;background:rgba(30,60,90,.06)">
            <div style="font-size:1.25rem;font-weight:800">Today</div>
            <div style="font-size:1.45rem;font-weight:800">2x3 on balls and games</div>
            <div style="font-size:1.15rem;font-weight:700">for children</div>
          </div>
        </div>`
      }
    ],
    prompt: "94. Where can you see this notice?",
    options: [
      { letter: "A", text: "in a playground" },
      { letter: "B", text: "in a classroom" },
      { letter: "C", text: "in a sports store" }
    ],
    correctAnswer: "C",
    explanation: "The notice announces a 2x3 promotion on balls and games for children. A sales promotion like this is most likely seen in a sports store. Therefore, the correct answer is C."
  }

,
  {
    uid: "s2-ing-095",
    session: 2,
    block: 4,
    number: 95,
    area: "Inglés",
    competencia: "Comprensión de conversaciones cortas",
    componente: "Respuesta adecuada según contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "conversation-completion",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 95",
    stem: "Part 3. Complete the conversation with the most appropriate response.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 3 · Short conversations</h4>
          <p style="margin:0 0 12px">Choose the best answer to complete the conversation.</p>
          <div style="border-left:4px solid rgba(30,60,90,.35);padding:14px 18px;background:rgba(30,60,90,.06);border-radius:10px;font-size:1.15rem">
            <strong>Question:</strong> Why didn't you put your new coat on yesterday?
          </div>
        </div>`
      }
    ],
    prompt: "95. Choose the correct answer.",
    options: [
      { letter: "A", text: "I liked jeans." },
      { letter: "B", text: "Let's dress up." },
      { letter: "C", text: "It was too warm." }
    ],
    correctAnswer: "C",
    explanation: "The question asks why the person did not wear a new coat. 'It was too warm' gives a logical reason for not wearing a coat. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-096",
    session: 2,
    block: 4,
    number: 96,
    area: "Inglés",
    competencia: "Comprensión de conversaciones cortas",
    componente: "Respuesta adecuada según contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "conversation-completion",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 96",
    stem: "Part 3. Complete the conversation with the most appropriate response.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 3 · Short conversations</h4>
          <p style="margin:0 0 12px">Choose the best answer to complete the conversation.</p>
          <div style="border-left:4px solid rgba(30,60,90,.35);padding:14px 18px;background:rgba(30,60,90,.06);border-radius:10px;font-size:1.15rem">
            <strong>Statement:</strong> This movie is about a really big family.
          </div>
        </div>`
      }
    ],
    prompt: "96. Choose the correct answer.",
    options: [
      { letter: "A", text: "Is it good?" },
      { letter: "B", text: "Is that a lot?" },
      { letter: "C", text: "Is your mom OK?" }
    ],
    correctAnswer: "A",
    explanation: "The statement talks about a movie. Asking 'Is it good?' is a natural response in a conversation about a movie. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-097",
    session: 2,
    block: 4,
    number: 97,
    area: "Inglés",
    competencia: "Comprensión de conversaciones cortas",
    componente: "Respuesta adecuada según contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "conversation-completion",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 97",
    stem: "Part 3. Complete the conversation with the most appropriate response.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 3 · Short conversations</h4>
          <p style="margin:0 0 12px">Choose the best answer to complete the conversation.</p>
          <div style="border-left:4px solid rgba(30,60,90,.35);padding:14px 18px;background:rgba(30,60,90,.06);border-radius:10px;font-size:1.15rem">
            <strong>Question:</strong> Why are they hiding?
          </div>
        </div>`
      }
    ],
    prompt: "97. Choose the correct answer.",
    options: [
      { letter: "A", text: "Come here now!" },
      { letter: "B", text: "I've got no idea." },
      { letter: "C", text: "Is it near?" }
    ],
    correctAnswer: "B",
    explanation: "The question asks for a reason. 'I've got no idea' is an appropriate response when the speaker does not know the reason. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-098",
    session: 2,
    block: 4,
    number: 98,
    area: "Inglés",
    competencia: "Comprensión de conversaciones cortas",
    componente: "Respuesta adecuada según contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "conversation-completion",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 98",
    stem: "Part 3. Complete the conversation with the most appropriate response.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 3 · Short conversations</h4>
          <p style="margin:0 0 12px">Choose the best answer to complete the conversation.</p>
          <div style="border-left:4px solid rgba(30,60,90,.35);padding:14px 18px;background:rgba(30,60,90,.06);border-radius:10px;font-size:1.15rem">
            <strong>Statement:</strong> Everyone bought tickets for the rock concert.
          </div>
        </div>`
      }
    ],
    prompt: "98. Choose the correct answer.",
    options: [
      { letter: "A", text: "Is it on Saturday?" },
      { letter: "B", text: "There was noise." },
      { letter: "C", text: "It is fair!" }
    ],
    correctAnswer: "A",
    explanation: "The statement talks about a concert. Asking whether it is on Saturday is a natural follow-up question about the event. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-099",
    session: 2,
    block: 4,
    number: 99,
    area: "Inglés",
    competencia: "Comprensión de conversaciones cortas",
    componente: "Respuesta adecuada según contexto comunicativo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "conversation-completion",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 99",
    stem: "Part 3. Complete the conversation with the most appropriate response.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:760px;margin:auto">
          <h4 style="margin:0 0 10px">Part 3 · Short conversations</h4>
          <p style="margin:0 0 12px">Choose the best answer to complete the conversation.</p>
          <div style="border-left:4px solid rgba(30,60,90,.35);padding:14px 18px;background:rgba(30,60,90,.06);border-radius:10px;font-size:1.15rem">
            <strong>Statement:</strong> It seems I'll be the new boss of the business department.
          </div>
        </div>`
      }
    ],
    prompt: "99. Choose the correct answer.",
    options: [
      { letter: "A", text: "Excuse me!" },
      { letter: "B", text: "It's ready!" },
      { letter: "C", text: "Congratulations!" }
    ],
    correctAnswer: "C",
    explanation: "The statement suggests good news about a new position. 'Congratulations!' is the most appropriate response. Therefore, the correct answer is C."
  }
  ,
  {
    uid: "s2-ing-100",
    session: 2,
    block: 4,
    number: 100,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Completar texto con preposiciones y conectores básicos",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "cloze-text",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 100",
    stem: "Part 4. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
          <h4 style="margin:0 0 10px">Part 4 · Cloze text</h4>
          <h3 style="margin:0 0 14px;text-align:center">Taj Mahal</h3>
          <p style="line-height:1.65">Taj Mahal, one of the greatest monuments of India, was built <strong>(100) ____</strong> emperor Jahan to remember his wife, Mahal. Most people say Taj Mahal is an important expression of Indian art because of the beautiful way its different materials and shapes were used.</p>
          <p style="line-height:1.65">Plans to build Taj Mahal started in 1623. At that moment, its design process was the idea of architect Ahmad Lahawri, who decided to include a lake at the entrance. More than 20,000 workers took several years to complete the building, and it was finished by 1638. Some buildings in the area were later completed by 1643. In total, building Taj Mahal and the other buildings around took 22 years. While other monuments could be more famous, Taj Mahal will always be the only one built in the name of love.</p>
        </div>`
      }
    ],
    prompt: "100. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "off" },
      { letter: "B", text: "as" },
      { letter: "C", text: "by" }
    ],
    correctAnswer: "C",
    explanation: "The passive construction is 'was built by emperor Jahan'. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-101",
    session: 2,
    block: 4,
    number: 101,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Completar texto con formas verbales en voz pasiva",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "cloze-text",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 101",
    stem: "Part 4. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
          <h4 style="margin:0 0 10px">Part 4 · Cloze text</h4>
          <h3 style="margin:0 0 14px;text-align:center">Taj Mahal</h3>
          <p style="line-height:1.65">Taj Mahal, one of the greatest monuments of India, was built by emperor Jahan to remember his wife, Mahal. Most people say Taj Mahal is an important expression of Indian art because of the beautiful way its different materials and shapes were <strong>(101) ____</strong>.</p>
          <p style="line-height:1.65">Plans to build Taj Mahal started in 1623. At that moment, its design process was the idea of architect Ahmad Lahawri, who decided to include a lake at the entrance. More than 20,000 workers took several years to complete the building, and it was finished by 1638. Some buildings in the area were later completed by 1643. In total, building Taj Mahal and the other buildings around took 22 years. While other monuments could be more famous, Taj Mahal will always be the only one built in the name of love.</p>
        </div>`
      }
    ],
    prompt: "101. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "use" },
      { letter: "B", text: "used" },
      { letter: "C", text: "using" }
    ],
    correctAnswer: "B",
    explanation: "After 'were', the passive voice needs the past participle: 'were used'. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-102",
    session: 2,
    block: 4,
    number: 102,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Completar texto con preposiciones de tiempo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "cloze-text",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 102",
    stem: "Part 4. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
          <h4 style="margin:0 0 10px">Part 4 · Cloze text</h4>
          <h3 style="margin:0 0 14px;text-align:center">Taj Mahal</h3>
          <p style="line-height:1.65">Taj Mahal, one of the greatest monuments of India, was built by emperor Jahan to remember his wife, Mahal. Most people say Taj Mahal is an important expression of Indian art because of the beautiful way its different materials and shapes were used.</p>
          <p style="line-height:1.65">Plans to build Taj Mahal started in 1623. <strong>(102) ____</strong> that moment, its design process was the idea of architect Ahmad Lahawri, who decided to include a lake at the entrance. More than 20,000 workers took several years to complete the building, and it was finished by 1638. Some buildings in the area were later completed by 1643. In total, building Taj Mahal and the other buildings around took 22 years. While other monuments could be more famous, Taj Mahal will always be the only one built in the name of love.</p>
        </div>`
      }
    ],
    prompt: "102. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "At" },
      { letter: "B", text: "To" },
      { letter: "C", text: "Up" }
    ],
    correctAnswer: "A",
    explanation: "The correct expression is 'At that moment'. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-103",
    session: 2,
    block: 4,
    number: 103,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Completar texto con pronombres relativos",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "cloze-text",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 103",
    stem: "Part 4. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
          <h4 style="margin:0 0 10px">Part 4 · Cloze text</h4>
          <h3 style="margin:0 0 14px;text-align:center">Taj Mahal</h3>
          <p style="line-height:1.65">Taj Mahal, one of the greatest monuments of India, was built by emperor Jahan to remember his wife, Mahal. Most people say Taj Mahal is an important expression of Indian art because of the beautiful way its different materials and shapes were used.</p>
          <p style="line-height:1.65">Plans to build Taj Mahal started in 1623. At that moment, its design process was the idea of architect Ahmad Lahawri, <strong>(103) ____</strong> decided to include a lake at the entrance. More than 20,000 workers took several years to complete the building, and it was finished by 1638. Some buildings in the area were later completed by 1643. In total, building Taj Mahal and the other buildings around took 22 years. While other monuments could be more famous, Taj Mahal will always be the only one built in the name of love.</p>
        </div>`
      }
    ],
    prompt: "103. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "which" },
      { letter: "B", text: "where" },
      { letter: "C", text: "who" }
    ],
    correctAnswer: "C",
    explanation: "The blank refers to architect Ahmad Lahawri, a person. The relative pronoun for a person is 'who'. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-104",
    session: 2,
    block: 4,
    number: 104,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Completar texto con determinantes cuantificadores",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "cloze-text",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 104",
    stem: "Part 4. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
          <h4 style="margin:0 0 10px">Part 4 · Cloze text</h4>
          <h3 style="margin:0 0 14px;text-align:center">Taj Mahal</h3>
          <p style="line-height:1.65">Taj Mahal, one of the greatest monuments of India, was built by emperor Jahan to remember his wife, Mahal. Most people say Taj Mahal is an important expression of Indian art because of the beautiful way its different materials and shapes were used.</p>
          <p style="line-height:1.65">Plans to build Taj Mahal started in 1623. At that moment, its design process was the idea of architect Ahmad Lahawri, who decided to include a lake at the entrance. More than 20,000 workers took <strong>(104) ____</strong> years to complete the building, and it was finished by 1638. Some buildings in the area were later completed by 1643. In total, building Taj Mahal and the other buildings around took 22 years. While other monuments could be more famous, Taj Mahal will always be the only one built in the name of love.</p>
        </div>`
      }
    ],
    prompt: "104. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "each" },
      { letter: "B", text: "several" },
      { letter: "C", text: "much" }
    ],
    correctAnswer: "B",
    explanation: "'Several years' means more than two years and fits the context. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-105",
    session: 2,
    block: 4,
    number: 105,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Completar texto con adverbios de tiempo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "cloze-text",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 105",
    stem: "Part 4. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
          <h4 style="margin:0 0 10px">Part 4 · Cloze text</h4>
          <h3 style="margin:0 0 14px;text-align:center">Taj Mahal</h3>
          <p style="line-height:1.65">Taj Mahal, one of the greatest monuments of India, was built by emperor Jahan to remember his wife, Mahal. Most people say Taj Mahal is an important expression of Indian art because of the beautiful way its different materials and shapes were used.</p>
          <p style="line-height:1.65">Plans to build Taj Mahal started in 1623. At that moment, its design process was the idea of architect Ahmad Lahawri, who decided to include a lake at the entrance. More than 20,000 workers took several years to complete the building, and it was finished by 1638. Some buildings in the area were <strong>(105) ____</strong> completed by 1643. In total, building Taj Mahal and the other buildings around took 22 years. While other monuments could be more famous, Taj Mahal will always be the only one built in the name of love.</p>
        </div>`
      }
    ],
    prompt: "105. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "still" },
      { letter: "B", text: "over" },
      { letter: "C", text: "later" }
    ],
    correctAnswer: "C",
    explanation: "The main building was finished by 1638, and some other buildings were completed after that, by 1643. The word 'later' fits this time sequence. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-106",
    session: 2,
    block: 4,
    number: 106,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Completar texto con preposiciones y expresiones de cantidad aproximada",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "cloze-text",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 106",
    stem: "Part 4. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
          <h4 style="margin:0 0 10px">Part 4 · Cloze text</h4>
          <h3 style="margin:0 0 14px;text-align:center">Taj Mahal</h3>
          <p style="line-height:1.65">Taj Mahal, one of the greatest monuments of India, was built by emperor Jahan to remember his wife, Mahal. Most people say Taj Mahal is an important expression of Indian art because of the beautiful way its different materials and shapes were used.</p>
          <p style="line-height:1.65">Plans to build Taj Mahal started in 1623. At that moment, its design process was the idea of architect Ahmad Lahawri, who decided to include a lake at the entrance. More than 20,000 workers took several years to complete the building, and it was finished by 1638. Some buildings in the area were later completed by 1643. In total, building Taj Mahal and the other buildings <strong>(106) ____</strong> took 22 years. While other monuments could be more famous, Taj Mahal will always be the only one built in the name of love.</p>
        </div>`
      }
    ],
    prompt: "106. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "around" },
      { letter: "B", text: "off" },
      { letter: "C", text: "out" }
    ],
    correctAnswer: "A",
    explanation: "'The other buildings around' means the other buildings located near the Taj Mahal. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-107",
    session: 2,
    block: 4,
    number: 107,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Completar texto con conectores de contraste",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "cloze-text",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 107",
    stem: "Part 4. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
          <h4 style="margin:0 0 10px">Part 4 · Cloze text</h4>
          <h3 style="margin:0 0 14px;text-align:center">Taj Mahal</h3>
          <p style="line-height:1.65">Taj Mahal, one of the greatest monuments of India, was built by emperor Jahan to remember his wife, Mahal. Most people say Taj Mahal is an important expression of Indian art because of the beautiful way its different materials and shapes were used.</p>
          <p style="line-height:1.65">Plans to build Taj Mahal started in 1623. At that moment, its design process was the idea of architect Ahmad Lahawri, who decided to include a lake at the entrance. More than 20,000 workers took several years to complete the building, and it was finished by 1638. Some buildings in the area were later completed by 1643. In total, building Taj Mahal and the other buildings around took 22 years. <strong>(107) ____</strong> other monuments could be more famous, Taj Mahal will always be the only one built in the name of love.</p>
        </div>`
      }
    ],
    prompt: "107. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "If" },
      { letter: "B", text: "While" },
      { letter: "C", text: "Except" }
    ],
    correctAnswer: "B",
    explanation: "The sentence contrasts the fame of other monuments with the special meaning of the Taj Mahal. 'While' works as a connector of contrast. Therefore, the correct answer is B."
  }
,
  {
    uid: "s2-ing-108",
    session: 2,
    block: 5,
    number: 108,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación de información explícita e inferencias básicas en texto narrativo/descriptivo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "reading-comprehension",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 108",
    stem: "Part 5. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
  <h4 style="margin:0 0 10px">Part 5 · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">I’ll Be a Nurse</h3>
  <p style="line-height:1.65">I'm Alexa Smith and I've done lots of things, but I always dreamed of being a nurse. Nurses should be quite kind, brave, and really nice with people. They must be careful with everything around them. I’m like this, so I will be able to be the best nurse when I finish my studies and in a short time I will earn money by doing something I like!</p>
  <p style="line-height:1.65">My wish to become a nurse comes from an experience as a teenager. When I was going to visit a friend, who I met through Facebook, I got sick at the airport. Thank God, they found an ambulance and took me to the hospital. A group of fantastic nurses looked after me and I soon got better. Then, I only had to go to the drugstore for a few days. This awesome time at the hospital encouraged me to become a nurse.</p>
  <p style="line-height:1.65">At university, we study hospital vocabulary, lots of health subjects and practice at local hospitals. My classmates and I can easily see how nurses help people feel less pain. These people are always glad and thanking them for their excellent job. Nurses work all the time and spend, even their free time, learning how to improve people's lives. Soon, I hope to be ready to start my career in this wonderful occupation.</p>
</div>`
      }
    ],
    prompt: "108. It’s good if a nurse is",
    options: [
      { letter: "A", text: "excited." },
      { letter: "B", text: "attractive." },
      { letter: "C", text: "friendly." }
    ],
    correctAnswer: "C",
    explanation: "El texto dice que las enfermeras deben ser amables y agradables con las personas; por eso, la opción correcta es C."
  },
  {
    uid: "s2-ing-109",
    session: 2,
    block: 5,
    number: 109,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación de información explícita e inferencias básicas en texto narrativo/descriptivo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "reading-comprehension",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 109",
    stem: "Part 5. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
  <h4 style="margin:0 0 10px">Part 5 · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">I’ll Be a Nurse</h3>
  <p style="line-height:1.65">I'm Alexa Smith and I've done lots of things, but I always dreamed of being a nurse. Nurses should be quite kind, brave, and really nice with people. They must be careful with everything around them. I’m like this, so I will be able to be the best nurse when I finish my studies and in a short time I will earn money by doing something I like!</p>
  <p style="line-height:1.65">My wish to become a nurse comes from an experience as a teenager. When I was going to visit a friend, who I met through Facebook, I got sick at the airport. Thank God, they found an ambulance and took me to the hospital. A group of fantastic nurses looked after me and I soon got better. Then, I only had to go to the drugstore for a few days. This awesome time at the hospital encouraged me to become a nurse.</p>
  <p style="line-height:1.65">At university, we study hospital vocabulary, lots of health subjects and practice at local hospitals. My classmates and I can easily see how nurses help people feel less pain. These people are always glad and thanking them for their excellent job. Nurses work all the time and spend, even their free time, learning how to improve people's lives. Soon, I hope to be ready to start my career in this wonderful occupation.</p>
</div>`
      }
    ],
    prompt: "109. Alexa thinks that soon she will be",
    options: [
      { letter: "A", text: "working at a hospital." },
      { letter: "B", text: "going to the airport." },
      { letter: "C", text: "feeling better." }
    ],
    correctAnswer: "A",
    explanation: "Alexa espera iniciar pronto su carrera como enfermera, es decir, comenzar a trabajar en el campo hospitalario. La opción correcta es A."
  },
  {
    uid: "s2-ing-110",
    session: 2,
    block: 5,
    number: 110,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación de información explícita e inferencias básicas en texto narrativo/descriptivo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "reading-comprehension",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 110",
    stem: "Part 5. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
  <h4 style="margin:0 0 10px">Part 5 · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">I’ll Be a Nurse</h3>
  <p style="line-height:1.65">I'm Alexa Smith and I've done lots of things, but I always dreamed of being a nurse. Nurses should be quite kind, brave, and really nice with people. They must be careful with everything around them. I’m like this, so I will be able to be the best nurse when I finish my studies and in a short time I will earn money by doing something I like!</p>
  <p style="line-height:1.65">My wish to become a nurse comes from an experience as a teenager. When I was going to visit a friend, who I met through Facebook, I got sick at the airport. Thank God, they found an ambulance and took me to the hospital. A group of fantastic nurses looked after me and I soon got better. Then, I only had to go to the drugstore for a few days. This awesome time at the hospital encouraged me to become a nurse.</p>
  <p style="line-height:1.65">At university, we study hospital vocabulary, lots of health subjects and practice at local hospitals. My classmates and I can easily see how nurses help people feel less pain. These people are always glad and thanking them for their excellent job. Nurses work all the time and spend, even their free time, learning how to improve people's lives. Soon, I hope to be ready to start my career in this wonderful occupation.</p>
</div>`
      }
    ],
    prompt: "110. At the airport, Alexa",
    options: [
      { letter: "A", text: "suddenly felt ill." },
      { letter: "B", text: "had a terrible accident." },
      { letter: "C", text: "took the wrong medicine." }
    ],
    correctAnswer: "A",
    explanation: "El texto indica que Alexa se enfermó en el aeropuerto. Por eso, la respuesta correcta es A."
  },
  {
    uid: "s2-ing-111",
    session: 2,
    block: 5,
    number: 111,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación de información explícita e inferencias básicas en texto narrativo/descriptivo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "reading-comprehension",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 111",
    stem: "Part 5. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
  <h4 style="margin:0 0 10px">Part 5 · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">I’ll Be a Nurse</h3>
  <p style="line-height:1.65">I'm Alexa Smith and I've done lots of things, but I always dreamed of being a nurse. Nurses should be quite kind, brave, and really nice with people. They must be careful with everything around them. I’m like this, so I will be able to be the best nurse when I finish my studies and in a short time I will earn money by doing something I like!</p>
  <p style="line-height:1.65">My wish to become a nurse comes from an experience as a teenager. When I was going to visit a friend, who I met through Facebook, I got sick at the airport. Thank God, they found an ambulance and took me to the hospital. A group of fantastic nurses looked after me and I soon got better. Then, I only had to go to the drugstore for a few days. This awesome time at the hospital encouraged me to become a nurse.</p>
  <p style="line-height:1.65">At university, we study hospital vocabulary, lots of health subjects and practice at local hospitals. My classmates and I can easily see how nurses help people feel less pain. These people are always glad and thanking them for their excellent job. Nurses work all the time and spend, even their free time, learning how to improve people's lives. Soon, I hope to be ready to start my career in this wonderful occupation.</p>
</div>`
      }
    ],
    prompt: "111. In Alexa’s opinion, the nurses who helped her were",
    options: [
      { letter: "A", text: "interesting." },
      { letter: "B", text: "amazing." },
      { letter: "C", text: "lucky." }
    ],
    correctAnswer: "B",
    explanation: "Alexa describe a las enfermeras como fantásticas y relaciona esa experiencia con su deseo de ser enfermera. La opción correcta es B."
  },
  {
    uid: "s2-ing-112",
    session: 2,
    block: 5,
    number: 112,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación de información explícita e inferencias básicas en texto narrativo/descriptivo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "reading-comprehension",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 112",
    stem: "Part 5. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
  <h4 style="margin:0 0 10px">Part 5 · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">I’ll Be a Nurse</h3>
  <p style="line-height:1.65">I'm Alexa Smith and I've done lots of things, but I always dreamed of being a nurse. Nurses should be quite kind, brave, and really nice with people. They must be careful with everything around them. I’m like this, so I will be able to be the best nurse when I finish my studies and in a short time I will earn money by doing something I like!</p>
  <p style="line-height:1.65">My wish to become a nurse comes from an experience as a teenager. When I was going to visit a friend, who I met through Facebook, I got sick at the airport. Thank God, they found an ambulance and took me to the hospital. A group of fantastic nurses looked after me and I soon got better. Then, I only had to go to the drugstore for a few days. This awesome time at the hospital encouraged me to become a nurse.</p>
  <p style="line-height:1.65">At university, we study hospital vocabulary, lots of health subjects and practice at local hospitals. My classmates and I can easily see how nurses help people feel less pain. These people are always glad and thanking them for their excellent job. Nurses work all the time and spend, even their free time, learning how to improve people's lives. Soon, I hope to be ready to start my career in this wonderful occupation.</p>
</div>`
      }
    ],
    prompt: "112. Once Alexa felt healthy again, she",
    options: [
      { letter: "A", text: "posted it online." },
      { letter: "B", text: "flew back home." },
      { letter: "C", text: "decided her future." }
    ],
    correctAnswer: "B",
    explanation: "Después de mejorar, la alternativa que mejor completa la situación de regreso posterior al viaje es B."
  },
  {
    uid: "s2-ing-113",
    session: 2,
    block: 5,
    number: 113,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación de información explícita e inferencias básicas en texto narrativo/descriptivo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "reading-comprehension",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 113",
    stem: "Part 5. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
  <h4 style="margin:0 0 10px">Part 5 · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">I’ll Be a Nurse</h3>
  <p style="line-height:1.65">I'm Alexa Smith and I've done lots of things, but I always dreamed of being a nurse. Nurses should be quite kind, brave, and really nice with people. They must be careful with everything around them. I’m like this, so I will be able to be the best nurse when I finish my studies and in a short time I will earn money by doing something I like!</p>
  <p style="line-height:1.65">My wish to become a nurse comes from an experience as a teenager. When I was going to visit a friend, who I met through Facebook, I got sick at the airport. Thank God, they found an ambulance and took me to the hospital. A group of fantastic nurses looked after me and I soon got better. Then, I only had to go to the drugstore for a few days. This awesome time at the hospital encouraged me to become a nurse.</p>
  <p style="line-height:1.65">At university, we study hospital vocabulary, lots of health subjects and practice at local hospitals. My classmates and I can easily see how nurses help people feel less pain. These people are always glad and thanking them for their excellent job. Nurses work all the time and spend, even their free time, learning how to improve people's lives. Soon, I hope to be ready to start my career in this wonderful occupation.</p>
</div>`
      }
    ],
    prompt: "113. While studying, Alexa and her friends from university have",
    options: [
      { letter: "A", text: "seen how patients like nurses." },
      { letter: "B", text: "lived at a hospital." },
      { letter: "C", text: "shared their spare time." }
    ],
    correctAnswer: "A",
    explanation: "El texto dice que Alexa y sus compañeros ven cómo las enfermeras ayudan a los pacientes, quienes se muestran agradecidos. La opción correcta es A."
  },
  {
    uid: "s2-ing-114",
    session: 2,
    block: 5,
    number: 114,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación de información explícita e inferencias básicas en texto narrativo/descriptivo",
    dificultad: "Básica",
    type: "single-choice",
    interaction: "reading-comprehension",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 114",
    stem: "Part 5. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:850px;margin:auto">
  <h4 style="margin:0 0 10px">Part 5 · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">I’ll Be a Nurse</h3>
  <p style="line-height:1.65">I'm Alexa Smith and I've done lots of things, but I always dreamed of being a nurse. Nurses should be quite kind, brave, and really nice with people. They must be careful with everything around them. I’m like this, so I will be able to be the best nurse when I finish my studies and in a short time I will earn money by doing something I like!</p>
  <p style="line-height:1.65">My wish to become a nurse comes from an experience as a teenager. When I was going to visit a friend, who I met through Facebook, I got sick at the airport. Thank God, they found an ambulance and took me to the hospital. A group of fantastic nurses looked after me and I soon got better. Then, I only had to go to the drugstore for a few days. This awesome time at the hospital encouraged me to become a nurse.</p>
  <p style="line-height:1.65">At university, we study hospital vocabulary, lots of health subjects and practice at local hospitals. My classmates and I can easily see how nurses help people feel less pain. These people are always glad and thanking them for their excellent job. Nurses work all the time and spend, even their free time, learning how to improve people's lives. Soon, I hope to be ready to start my career in this wonderful occupation.</p>
</div>`
      }
    ],
    prompt: "114. Alexa can’t wait for the moment to",
    options: [
      { letter: "A", text: "become an assistant." },
      { letter: "B", text: "begin working." },
      { letter: "C", text: "have some rest." }
    ],
    correctAnswer: "B",
    explanation: "Alexa afirma que espera estar lista pronto para iniciar su carrera. Por eso, la opción correcta es B."
  }
,
  {
    uid: "s2-ing-115",
    session: 2,
    block: 6,
    number: 115,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación de propósito comunicativo en texto argumentativo/reflexivo",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-lazy-periods-115-119",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 115",
    stem: "Part 6.A. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.A · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">The Value of Doing Nothing</h3>
  <p style="line-height:1.65">I know people who will do anything to avoid looking after their children at a playground. They will ask their friends to go with them so they don’t have to do it alone, so they can listen to music and remain mentally absent.</p>
  <p style="line-height:1.65">I should say that, in general, I am very good at “doing nothing”. I could sit looking at the wood on a table for a long time and be pleased. These days, there is a lot of literature on the necessity for children to “do nothing”, which is mentioned in the context of warnings about giving children too much to do and the use of screens. However, there is less talk about the value of “doing nothing” for adults although this habit often helps to develop thinking abilities to be active and efficient.</p>
  <p style="line-height:1.65">Lazy periods may seem useless; however, they can be valuable. Once, I had to wait in a row for an hour. This was actually a relaxing moment that made me think what life is all about. It will be a moment that I’ll remember with the deepest nostalgia. On another occasion, I forgot my phone at home when I went out, and it was amazing! I learnt a lot from that “accident”. I was able to take a breath and enjoy the simple things when I sat in the sunshine while my children rode their bikes up and down and then left them to play in the sand.</p>
  <p style="line-height:1.65">The funny thing about the two experiences of “doing nothing”, passively waiting for something to end and going out without my phone, were the greatest moments of active and efficient activities which I’ve done with my time.</p>
</div>`
      }
    ],
    prompt: "115. What is the writer trying to do in the text?",
    options: [
      { letter: "A", text: "explore new activities to have fun and attract your children" },
      { letter: "B", text: "convince people to leave their electronic objects at work" },
      { letter: "C", text: "recommend doing relaxing outdoor activities and living in nature" },
      { letter: "D", text: "encourage people to value lazy periods" }
    ],
    correctAnswer: "D",
    explanation: "The writer explains that lazy periods or moments of doing nothing can be valuable because they help people think, relax and become more active and efficient. Therefore, the correct answer is D."
  },
  {
    uid: "s2-ing-116",
    session: 2,
    block: 6,
    number: 116,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Reconocimiento de información global e inferencias en texto argumentativo/reflexivo",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-lazy-periods-115-119",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 116",
    stem: "Part 6.A. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.A · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">The Value of Doing Nothing</h3>
  <p style="line-height:1.65">I know people who will do anything to avoid looking after their children at a playground. They will ask their friends to go with them so they don’t have to do it alone, so they can listen to music and remain mentally absent.</p>
  <p style="line-height:1.65">I should say that, in general, I am very good at “doing nothing”. I could sit looking at the wood on a table for a long time and be pleased. These days, there is a lot of literature on the necessity for children to “do nothing”, which is mentioned in the context of warnings about giving children too much to do and the use of screens. However, there is less talk about the value of “doing nothing” for adults although this habit often helps to develop thinking abilities to be active and efficient.</p>
  <p style="line-height:1.65">Lazy periods may seem useless; however, they can be valuable. Once, I had to wait in a row for an hour. This was actually a relaxing moment that made me think what life is all about. It will be a moment that I’ll remember with the deepest nostalgia. On another occasion, I forgot my phone at home when I went out, and it was amazing! I learnt a lot from that “accident”. I was able to take a breath and enjoy the simple things when I sat in the sunshine while my children rode their bikes up and down and then left them to play in the sand.</p>
  <p style="line-height:1.65">The funny thing about the two experiences of “doing nothing”, passively waiting for something to end and going out without my phone, were the greatest moments of active and efficient activities which I’ve done with my time.</p>
</div>`
      }
    ],
    prompt: "116. What can the reader find out from this article?",
    options: [
      { letter: "A", text: "difficulties that you could avoid when you decide to give up technology" },
      { letter: "B", text: "chances to develop your ideas, dreams and abilities when you are outdoors" },
      { letter: "C", text: "regrets about the writer’s active life without his electronic objects" },
      { letter: "D", text: "benefits that you could receive from doing routine activities" }
    ],
    correctAnswer: "B",
    explanation: "The article shows that being without distractions, especially in simple outdoor moments, can help people think, develop ideas and enjoy life. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-117",
    session: 2,
    block: 6,
    number: 117,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Interpretación de expresiones y sentido global en texto argumentativo/reflexivo",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-lazy-periods-115-119",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 117",
    stem: "Part 6.A. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.A · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">The Value of Doing Nothing</h3>
  <p style="line-height:1.65">I know people who will do anything to avoid looking after their children at a playground. They will ask their friends to go with them so they don’t have to do it alone, so they can listen to music and remain mentally absent.</p>
  <p style="line-height:1.65">I should say that, in general, I am very good at “doing nothing”. I could sit looking at the wood on a table for a long time and be pleased. These days, there is a lot of literature on the necessity for children to “do nothing”, which is mentioned in the context of warnings about giving children too much to do and the use of screens. However, there is less talk about the value of “doing nothing” for adults although this habit often helps to develop thinking abilities to be active and efficient.</p>
  <p style="line-height:1.65">Lazy periods may seem useless; however, they can be valuable. Once, I had to wait in a row for an hour. This was actually a relaxing moment that made me think what life is all about. It will be a moment that I’ll remember with the deepest nostalgia. On another occasion, I forgot my phone at home when I went out, and it was amazing! I learnt a lot from that “accident”. I was able to take a breath and enjoy the simple things when I sat in the sunshine while my children rode their bikes up and down and then left them to play in the sand.</p>
  <p style="line-height:1.65">The funny thing about the two experiences of “doing nothing”, passively waiting for something to end and going out without my phone, were the greatest moments of active and efficient activities which I’ve done with my time.</p>
</div>`
      }
    ],
    prompt: "117. According to the author, “lazy periods” are",
    options: [
      { letter: "A", text: "moments that make people avoid using their time, money and skills in the best way." },
      { letter: "B", text: "unimportant daily decisions that people forget very quickly." },
      { letter: "C", text: "ordinary activities that can provide amazing and relaxing feelings." },
      { letter: "D", text: "silent moments that can make your life stressful." }
    ],
    correctAnswer: "C",
    explanation: "The author describes lazy periods as valuable moments that can be relaxing, amazing and useful for thinking. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-118",
    session: 2,
    block: 6,
    number: 118,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Selección de título según la idea principal del texto",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-lazy-periods-115-119",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 118",
    stem: "Part 6.A. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.A · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">The Value of Doing Nothing</h3>
  <p style="line-height:1.65">I know people who will do anything to avoid looking after their children at a playground. They will ask their friends to go with them so they don’t have to do it alone, so they can listen to music and remain mentally absent.</p>
  <p style="line-height:1.65">I should say that, in general, I am very good at “doing nothing”. I could sit looking at the wood on a table for a long time and be pleased. These days, there is a lot of literature on the necessity for children to “do nothing”, which is mentioned in the context of warnings about giving children too much to do and the use of screens. However, there is less talk about the value of “doing nothing” for adults although this habit often helps to develop thinking abilities to be active and efficient.</p>
  <p style="line-height:1.65">Lazy periods may seem useless; however, they can be valuable. Once, I had to wait in a row for an hour. This was actually a relaxing moment that made me think what life is all about. It will be a moment that I’ll remember with the deepest nostalgia. On another occasion, I forgot my phone at home when I went out, and it was amazing! I learnt a lot from that “accident”. I was able to take a breath and enjoy the simple things when I sat in the sunshine while my children rode their bikes up and down and then left them to play in the sand.</p>
  <p style="line-height:1.65">The funny thing about the two experiences of “doing nothing”, passively waiting for something to end and going out without my phone, were the greatest moments of active and efficient activities which I’ve done with my time.</p>
</div>`
      }
    ],
    prompt: "118. The most suitable title for the reading could be “One day I",
    options: [
      { letter: "A", text: "decided to pay attention to normal events, it was a surprising experience”." },
      { letter: "B", text: "admitted that I was absent when I played with my children”." },
      { letter: "C", text: "forgot my cellphone, and it was an awful and stressful experience”." },
      { letter: "D", text: "decided to give up my phone to avoid unimportant and unusual calls”." }
    ],
    correctAnswer: "A",
    explanation: "The text focuses on how simple and ordinary moments became surprising and meaningful experiences for the writer. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-119",
    session: 2,
    block: 6,
    number: 119,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Inferencia de consejo o postura del autor a partir del texto",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-lazy-periods-115-119",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 119",
    stem: "Part 6.A. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.A · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">The Value of Doing Nothing</h3>
  <p style="line-height:1.65">I know people who will do anything to avoid looking after their children at a playground. They will ask their friends to go with them so they don’t have to do it alone, so they can listen to music and remain mentally absent.</p>
  <p style="line-height:1.65">I should say that, in general, I am very good at “doing nothing”. I could sit looking at the wood on a table for a long time and be pleased. These days, there is a lot of literature on the necessity for children to “do nothing”, which is mentioned in the context of warnings about giving children too much to do and the use of screens. However, there is less talk about the value of “doing nothing” for adults although this habit often helps to develop thinking abilities to be active and efficient.</p>
  <p style="line-height:1.65">Lazy periods may seem useless; however, they can be valuable. Once, I had to wait in a row for an hour. This was actually a relaxing moment that made me think what life is all about. It will be a moment that I’ll remember with the deepest nostalgia. On another occasion, I forgot my phone at home when I went out, and it was amazing! I learnt a lot from that “accident”. I was able to take a breath and enjoy the simple things when I sat in the sunshine while my children rode their bikes up and down and then left them to play in the sand.</p>
  <p style="line-height:1.65">The funny thing about the two experiences of “doing nothing”, passively waiting for something to end and going out without my phone, were the greatest moments of active and efficient activities which I’ve done with my time.</p>
</div>`
      }
    ],
    prompt: "119. What advice would the writer give his readers?",
    options: [
      { letter: "A", text: "Leave always your electronic objects at home. It’ll let you breathe and relax." },
      { letter: "B", text: "Cancel your stressful work activities. They might seriously damage your health." },
      { letter: "C", text: "Consider simple daily routines. They could develop your thinking abilities." },
      { letter: "D", text: "Carry on with your routine. It may prevent accidents in your life." }
    ],
    correctAnswer: "A",
    explanation: "The writer presents the experience of going out without his phone as a positive accident that helped him breathe and relax. The answer marked in the source image is A."
  },
  {
    uid: "s2-ing-120",
    session: 2,
    block: 6,
    number: 120,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Identificación del propósito comunicativo en texto expositivo/reflexivo",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-gymnastics-120-124",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 120",
    stem: "Part 6.B. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.B · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">Gymnastics and Personal Development</h3>
  <p style="line-height:1.65">I cannot remember a time when I was not involved in the sport of gymnastics. My mom used to exercise a lot when she was pregnant with me, so you could say that it is in my blood! I love the challenge that gymnastics offer. My coaches taught me the value of setting goals by writing them down and focusing on bringing them to life. In my personal life, gymnastics has given me the essential support to practice other sports, a love for fitness and physical activity, and a skill set that has allowed me to perform well in school and in my professional life.</p>
  <p style="line-height:1.65">Nowadays, as a gym owner, I am inspired when I see that same feeling in someone else’s eyes and smiles that I once had when I practiced gymnastics. Besides keeping you active, gymnastics also makes your body feel strong and enables you to do different things, such as keeping up with the everyday challenges of living a fast life.</p>
  <p style="line-height:1.65">As it happens with other sports, gymnastics is a sport where you fall again and again and have to stand up and continue. This sport teaches you the power of “I can do it”. This means you need to work hard to get what you want, but quitting is not an option. To do this, you need to be responsible, confident and spend time doing something that is worth it. In general, gymnastics can bring different benefits for your life, not only for your body but also for your personal development.</p>
</div>`
      }
    ],
    prompt: "120. The purpose of the text is to",
    options: [
      { letter: "A", text: "advise students on the best techniques to learn gymnastics." },
      { letter: "B", text: "complain about the issues students have while doing gymnastics." },
      { letter: "C", text: "encourage students to try gymnastics as an exciting sport." },
      { letter: "D", text: "convince students why gymnastics is better than other sports." }
    ],
    correctAnswer: "C",
    explanation: "The writer presents gymnastics as a positive and exciting sport that offers physical and personal benefits. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-121",
    session: 2,
    block: 6,
    number: 121,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Reconocimiento de información explícita sobre aprendizajes del autor",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-gymnastics-120-124",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 121",
    stem: "Part 6.B. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.B · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">Gymnastics and Personal Development</h3>
  <p style="line-height:1.65">I cannot remember a time when I was not involved in the sport of gymnastics. My mom used to exercise a lot when she was pregnant with me, so you could say that it is in my blood! I love the challenge that gymnastics offer. My coaches taught me the value of setting goals by writing them down and focusing on bringing them to life. In my personal life, gymnastics has given me the essential support to practice other sports, a love for fitness and physical activity, and a skill set that has allowed me to perform well in school and in my professional life.</p>
  <p style="line-height:1.65">Nowadays, as a gym owner, I am inspired when I see that same feeling in someone else’s eyes and smiles that I once had when I practiced gymnastics. Besides keeping you active, gymnastics also makes your body feel strong and enables you to do different things, such as keeping up with the everyday challenges of living a fast life.</p>
  <p style="line-height:1.65">As it happens with other sports, gymnastics is a sport where you fall again and again and have to stand up and continue. This sport teaches you the power of “I can do it”. This means you need to work hard to get what you want, but quitting is not an option. To do this, you need to be responsible, confident and spend time doing something that is worth it. In general, gymnastics can bring different benefits for your life, not only for your body but also for your personal development.</p>
</div>`
      }
    ],
    prompt: "121. What did the writer learn from practicing gymnastics?",
    options: [
      { letter: "A", text: "Long workouts are necessary to keep fit." },
      { letter: "B", text: "Goals in life need to be clearly established." },
      { letter: "C", text: "Training should be carried out regularly." },
      { letter: "D", text: "Performance in other sports might be limited." }
    ],
    correctAnswer: "B",
    explanation: "The text says that the writer’s coaches taught the value of setting goals by writing them down and focusing on bringing them to life. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-122",
    session: 2,
    block: 6,
    number: 122,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Inferencia de beneficios personales a partir de información explícita",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-gymnastics-120-124",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 122",
    stem: "Part 6.B. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.B · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">Gymnastics and Personal Development</h3>
  <p style="line-height:1.65">I cannot remember a time when I was not involved in the sport of gymnastics. My mom used to exercise a lot when she was pregnant with me, so you could say that it is in my blood! I love the challenge that gymnastics offer. My coaches taught me the value of setting goals by writing them down and focusing on bringing them to life. In my personal life, gymnastics has given me the essential support to practice other sports, a love for fitness and physical activity, and a skill set that has allowed me to perform well in school and in my professional life.</p>
  <p style="line-height:1.65">Nowadays, as a gym owner, I am inspired when I see that same feeling in someone else’s eyes and smiles that I once had when I practiced gymnastics. Besides keeping you active, gymnastics also makes your body feel strong and enables you to do different things, such as keeping up with the everyday challenges of living a fast life.</p>
  <p style="line-height:1.65">As it happens with other sports, gymnastics is a sport where you fall again and again and have to stand up and continue. This sport teaches you the power of “I can do it”. This means you need to work hard to get what you want, but quitting is not an option. To do this, you need to be responsible, confident and spend time doing something that is worth it. In general, gymnastics can bring different benefits for your life, not only for your body but also for your personal development.</p>
</div>`
      }
    ],
    prompt: "122. Besides making your body stronger, gymnastics can make you feel more",
    options: [
      { letter: "A", text: "efficient to deal with daily activities." },
      { letter: "B", text: "careless about your body." },
      { letter: "C", text: "creative about your love life." },
      { letter: "D", text: "engaged with other sports at school." }
    ],
    correctAnswer: "A",
    explanation: "The text explains that gymnastics helps people keep up with everyday challenges, so it can make them feel more efficient in daily life. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-123",
    session: 2,
    block: 6,
    number: 123,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Interpretación de expresión dentro del contexto del párrafo",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-gymnastics-120-124",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 123",
    stem: "Part 6.B. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.B · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">Gymnastics and Personal Development</h3>
  <p style="line-height:1.65">I cannot remember a time when I was not involved in the sport of gymnastics. My mom used to exercise a lot when she was pregnant with me, so you could say that it is in my blood! I love the challenge that gymnastics offer. My coaches taught me the value of setting goals by writing them down and focusing on bringing them to life. In my personal life, gymnastics has given me the essential support to practice other sports, a love for fitness and physical activity, and a skill set that has allowed me to perform well in school and in my professional life.</p>
  <p style="line-height:1.65">Nowadays, as a gym owner, I am inspired when I see that same feeling in someone else’s eyes and smiles that I once had when I practiced gymnastics. Besides keeping you active, gymnastics also makes your body feel strong and enables you to do different things, such as keeping up with the everyday challenges of living a fast life.</p>
  <p style="line-height:1.65">As it happens with other sports, gymnastics is a sport where you fall again and again and have to stand up and continue. This sport teaches you the power of “I can do it”. This means you need to work hard to get what you want, but quitting is not an option. To do this, you need to be responsible, confident and spend time doing something that is worth it. In general, gymnastics can bring different benefits for your life, not only for your body but also for your personal development.</p>
</div>`
      }
    ],
    prompt: "123. In paragraph 3, what does the power of “I can do it” mean?",
    options: [
      { letter: "A", text: "achieve the aims you are certain about" },
      { letter: "B", text: "carry on with your professional goals" },
      { letter: "C", text: "create other ways to manage hard work" },
      { letter: "D", text: "spending your time on something useful" }
    ],
    correctAnswer: "C",
    explanation: "In the paragraph, the expression is connected with working hard, standing up again and not quitting. The answer marked in the source image is C."
  },
  {
    uid: "s2-ing-124",
    session: 2,
    block: 6,
    number: 124,
    area: "Inglés",
    competencia: "Comprensión de lectura",
    componente: "Inferencia de sugerencias coherentes con el contenido del texto",
    dificultad: "Media",
    type: "single-choice",
    interaction: "reading-comprehension",
    readingGroup: "s2-ing-gymnastics-120-124",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 124",
    stem: "Part 6.B. Read the text and answer the question.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 6.B · Reading comprehension</h4>
  <h3 style="margin:0 0 14px;text-align:center">Gymnastics and Personal Development</h3>
  <p style="line-height:1.65">I cannot remember a time when I was not involved in the sport of gymnastics. My mom used to exercise a lot when she was pregnant with me, so you could say that it is in my blood! I love the challenge that gymnastics offer. My coaches taught me the value of setting goals by writing them down and focusing on bringing them to life. In my personal life, gymnastics has given me the essential support to practice other sports, a love for fitness and physical activity, and a skill set that has allowed me to perform well in school and in my professional life.</p>
  <p style="line-height:1.65">Nowadays, as a gym owner, I am inspired when I see that same feeling in someone else’s eyes and smiles that I once had when I practiced gymnastics. Besides keeping you active, gymnastics also makes your body feel strong and enables you to do different things, such as keeping up with the everyday challenges of living a fast life.</p>
  <p style="line-height:1.65">As it happens with other sports, gymnastics is a sport where you fall again and again and have to stand up and continue. This sport teaches you the power of “I can do it”. This means you need to work hard to get what you want, but quitting is not an option. To do this, you need to be responsible, confident and spend time doing something that is worth it. In general, gymnastics can bring different benefits for your life, not only for your body but also for your personal development.</p>
</div>`
      }
    ],
    prompt: "124. What might be some suggestions to people who want to practice gymnastics?",
    options: [
      { letter: "A", text: "You definitely need to choose a good gym. You also need to organize the schedule of training and set basic goals." },
      { letter: "B", text: "A good thing would be to approach others who are interested in gymnastics, and hire a personal trainer with monthly practices." },
      { letter: "C", text: "It’s important to keep daily trainings going, and check the progress of your goals as well as a record of your achievements." },
      { letter: "D", text: "You might gain some experience by practicing some basic movements, and then joining a group that has some experience." }
    ],
    correctAnswer: "C",
    explanation: "The text emphasizes goals, effort, responsibility, confidence and continuous practice. The answer marked in the source image is C."
  },
  {
    uid: "s2-ing-125",
    session: 2,
    block: 7,
    number: 125,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Uso lexical en contexto: phrasal verb y estructura “bring up”",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 125",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was <strong>(125) ____</strong> up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any (129) ____ to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "125. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "split" },
      { letter: "B", text: "brought" },
      { letter: "C", text: "kept" },
      { letter: "D", text: "filled" }
    ],
    correctAnswer: "B",
    explanation: "The expression is 'was brought up', which means she was raised in a poor background. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-126",
    session: 2,
    block: 7,
    number: 126,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Uso lexical en contexto: phrasal verb “go on to”",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 126",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went <strong>(126) ____</strong> to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any (129) ____ to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "126. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "for" },
      { letter: "B", text: "on" },
      { letter: "C", text: "together" },
      { letter: "D", text: "with" }
    ],
    correctAnswer: "B",
    explanation: "The expression 'went on to become' means that later she became a well-known writer. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-127",
    session: 2,
    block: 7,
    number: 127,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Uso de adverbios de grado en contexto",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 127",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was <strong>(127) ____</strong> depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any (129) ____ to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "127. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "slightly" },
      { letter: "B", text: "shortly" },
      { letter: "C", text: "partly" },
      { letter: "D", text: "approximately" }
    ],
    correctAnswer: "A",
    explanation: "'Slightly depressed' is the natural collocation to express a small degree of sadness or depression. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-128",
    session: 2,
    block: 7,
    number: 128,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Uso de pasado perfecto en contexto narrativo",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 128",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she <strong>(128) ____</strong> begun writing to save herself. She added that she didn’t have any (129) ____ to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "128. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "having" },
      { letter: "B", text: "has" },
      { letter: "C", text: "have" },
      { letter: "D", text: "had" }
    ],
    correctAnswer: "D",
    explanation: "The sentence needs the past perfect form: 'she had begun writing'. Therefore, the correct answer is D."
  },
  {
    uid: "s2-ing-129",
    session: 2,
    block: 7,
    number: 129,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Selección léxica según sentido del texto",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 129",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any <strong>(129) ____</strong> to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "129. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "reward" },
      { letter: "B", text: "ambition" },
      { letter: "C", text: "achievement" },
      { letter: "D", text: "improvement" }
    ],
    correctAnswer: "B",
    explanation: "The sentence means she did not intend or aspire to be published. 'Ambition' fits that meaning. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-130",
    session: 2,
    block: 7,
    number: 130,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Uso de conectores de contraste",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 130",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any (129) ____ to be published. <strong>(130) ____</strong> it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "130. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "Unless" },
      { letter: "B", text: "Since" },
      { letter: "C", text: "Although" },
      { letter: "D", text: "Whenever" }
    ],
    correctAnswer: "C",
    explanation: "The sentence contrasts the fact that being recognized was not her goal with the fact that it became her reality. 'Although' expresses contrast. Therefore, the correct answer is C."
  },
  {
    uid: "s2-ing-131",
    session: 2,
    block: 7,
    number: 131,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Selección léxica sobre rasgos de escritura",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 131",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any (129) ____ to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest <strong>(131) ____</strong> of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "131. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "pattern" },
      { letter: "B", text: "fashion" },
      { letter: "C", text: "design" },
      { letter: "D", text: "style" }
    ],
    correctAnswer: "D",
    explanation: "The natural expression is 'the honest style of her writing', referring to the way she writes. Therefore, the correct answer is D."
  },
  {
    uid: "s2-ing-132",
    session: 2,
    block: 7,
    number: 132,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Uso de participios en voz pasiva y relaciones temáticas",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 132",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any (129) ____ to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are <strong>(132) ____</strong> between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "132. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "developed" },
      { letter: "B", text: "appeared" },
      { letter: "C", text: "produced" },
      { letter: "D", text: "encouraged" }
    ],
    correctAnswer: "A",
    explanation: "The relationships between mothers and daughters can be 'developed' in her texts. This option best fits the meaning. Therefore, the correct answer is A."
  },
  {
    uid: "s2-ing-133",
    session: 2,
    block: 7,
    number: 133,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Uso de sustantivos colectivos en contexto literario",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 133",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any (129) ____ to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent <strong>(133) ____</strong> of essays “My Garden” is also powerful, yet less bitter than her (134) ____ works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "133. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "bunch" },
      { letter: "B", text: "collection" },
      { letter: "C", text: "account" },
      { letter: "D", text: "arrangement" }
    ],
    correctAnswer: "B",
    explanation: "A group of essays published together is a 'collection of essays'. Therefore, the correct answer is B."
  },
  {
    uid: "s2-ing-134",
    session: 2,
    block: 7,
    number: 134,
    area: "Inglés",
    competencia: "Uso del lenguaje en contexto",
    componente: "Uso de adjetivos temporales en contexto comparativo",
    dificultad: "Media",
    type: "single-choice",
    interaction: "cloze-text",
    readingGroup: "s2-ing-jamaica-kincaid-125-134",
    scored: true,
    sourceLabel: "Sección 2 - Inglés - Pregunta 134",
    stem: "Part 7. Read the text and choose the correct word for each space.",
    resources: [
      {
        type: "html",
        html: `<div class="concept-card" style="max-width:900px;margin:auto">
  <h4 style="margin:0 0 10px">Part 7 · Cloze text</h4>
  <h3 style="margin:0 0 14px;text-align:center">Jamaica Kincaid</h3>
  <p style="line-height:1.65">Jamaica Kincaid is <em>(0) considered</em> one of the most talented Caribbean novelists of all time. Born in Antigua in 1949, she was (125) ____ up in a poor background. When she was 17, she moved to New York. There she worked in different jobs; however, she soon went (126) ____ to become a well-known writer.</p>
  <p style="line-height:1.65">Kincaid declared that she was (127) ____ depressed upon her arrival in the US, and that, by then, she (128) ____ begun writing to save herself. She added that she didn’t have any (129) ____ to be published. (130) ____ it wasn’t her goal to be a recognized author, this quickly became her reality.</p>
  <p style="line-height:1.65">Kincaid built her reputation with the honest (131) ____ of her writing. Her texts often deal with the relationships that are (132) ____ between mothers and daughters, like in her first poem, “Girl”. Her recent (133) ____ of essays “My Garden” is also powerful, yet less bitter than her <strong>(134) ____</strong> works.</p>
  <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(30,60,90,.06)">
    <strong>Example 0:</strong> considered
  </div>
</div>`
      }
    ],
    prompt: "134. Choose the correct word to complete the space.",
    options: [
      { letter: "A", text: "ancient" },
      { letter: "B", text: "aged" },
      { letter: "C", text: "elderly" },
      { letter: "D", text: "previous" }
    ],
    correctAnswer: "D",
    explanation: "The text compares her recent collection with her earlier works. 'Previous works' is the appropriate expression. Therefore, the correct answer is D."
  }


];