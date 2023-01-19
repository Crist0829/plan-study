let root = document.getElementById("root");

async function getMaterias() {
  const data = await fetch("./aprendizaje.json").then((response) =>
    response.json()
  );

  return data;
}

async function asignMaterias() {
  const data = await getMaterias();
  root.innerHTML = createCards(data);
}

root.innerHTML = "Esperando...";

asignMaterias();

function createCards(data) {
  let cards = "";
  data.Materias.forEach((materia) => {
    let temas = "";
    let nombreMaterias = Object.keys(materia).toString();
    switch (nombreMaterias) {
      case "Desarrollo_software":
        let acordion = "";
        let acordionBody = "";
        materia[nombreMaterias].forEach((subtema, index) => {
          /* console.log(Object.keys(subtema).toString()); */
          /* console.log(subtema['WEB']) */

          /* console.log(subtema[Object.keys(subtema)]) */

          subtema[Object.keys(subtema)].forEach((t) => {
            if (typeof t === "object") {
              let dropdown = "";
              let items = "";
             /*  console.log(Object.keys(t)); */
              t[Object.keys(t)].forEach((a) => {
                items +=
                  typeof a === "object"
                    ? `<li><p class="dropdown-item" href="#">${a[Object.keys(a)]}</p></li>`
                    : `<li><p class="dropdown-item" href="#">${a}</p></li>`;
              });
              dropdown = `
                <div class="dropdown-center m-2 mx-0">
                  <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${Object.keys(t).toString()}
                  </button>
                  <ul class="dropdown-menu">
                   ${items}
                  </ul>
                </div>
              
              `;
              items = "";
              acordionBody += dropdown;
            } else {
              acordionBody += `<p>${t}</p>`;
            }
          });

          acordion += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"           aria-expanded="false" aria-controls="collapse${index}">
              ${Object.keys(subtema).toString()}
            </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
              <div class="accordion-body">${acordionBody}</div>
            </div>
        </div>
          `;
          acordionBody = "";
        });

        cards += `
          <div class="col-md-6">
            <div class="card m-2 shadow">
                <div class="card-header"> 
                  <h3 class="text-center ">Desarrollo</h3>
                </div> 
                <div class="accordion accordion-flush m-3" id="accordionFlushExample">
                  ${acordion}
                </div>
              </div>
          </div>
            `;
        break;

      case 'Humanidades y Comunicación':
        let subtema = ''
        materia[nombreMaterias].forEach((t) => {
          t[Object.keys(t)].forEach((st) => {
            subtema += `<p class='fs-6 m-0 ms-4'>${st}</p>`
          })
          temas += `
            <div>
              <p class='m-0 fs-5 mt-1'><strong>${Object.keys(t)} </strong></p>
              ${subtema}
            </div>
        `
        subtema = ''
        })
        
        cards += `
          <div class="col-md-6">
            <div class="card m-2 shadow">
              <div class="card-header"> 
                <h3 class="text-center">${nombreMaterias}</h3>
              </div> 
              <div class="d-flex flex-column align-items-center p-4">
                  <div>
                    ${temas}
                  </div>
              </div>
          </div>
        </div>
        
        `
        break
      default:
        materia[nombreMaterias].forEach((tema) => {
          temas += `<p class="m-1 fs-5"> ${tema} </p>`;
        });
        cards += `
          <div class="col-md-6">
            <div class="card m-2 shadow">
              <div class="card-header"> 
                <h3 class="text-center">${nombreMaterias}</h3>
               </div> 
               <div class="d-flex flex-column align-items-center p-3">
                  <div>
                    ${temas}
                  </div>
               </div>
            </div>
          </div>
            `;
    }
  });
  return cards;
}
