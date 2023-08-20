import { arrays } from './data.js';     //импорт данных из отдельного JS-модуля

const dataContainer = document.getElementById("dataContainer");   //блок для отображения таблиц
const dataSelector = document.getElementById("dataSelector");   //выпадающий список

//выделение табличного представления в отдельный класс
class TableRenderer {
    //конструктор, принимающий идентификатор элемента dataContainer
    constructor(dataContainerId) {
        this.dataContainer = document.getElementById(dataContainerId);
    }
    // метод для отображения таблицы
    renderTable(array) {
        this.dataContainer.innerHTML = "";  // очистка существующий контент

        if (array) {
            const table = this.createTable(array);  // создание элемента таблицы
            this.dataContainer.appendChild(table);  // добавление таблицы в dataContainer
        }
    }

    // метод для создания элементов таблицы
    createTable(array) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        //создание строк заголовка
        const headerRow = document.createElement("tr");
        array.header.forEach(column => {
            const th = document.createElement("th");
            th.textContent = column.caption;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        
        //создание строк данных
        array.data.forEach(rowData => {
            const tr = document.createElement("tr");
            rowData.forEach((cellData, index) => {
                const td = document.createElement("td");
                const column = array.header[index];

                if (column.id === "project_type") {
                    td.style.textAlign = 'center';
                } else {
                    if (typeof cellData === 'number') {
                        td.style.textAlign = 'right';
                    } else if (typeof cellData === 'boolean') {
                        td.style.textAlign = 'center';
                    } else {
                        td.style.textAlign = 'left';
                    }
                }

                //обработка отображения ячеек таблицы в зависимости от типа данных
                if (typeof cellData === 'object') {
                    if (cellData.d && cellData.color) {
                        td.textContent = cellData.d;
                        td.style.textAlign = 'right';
                    } else {
                        // для обработки других структур объектов
                    }
                } else {
                    td.textContent = cellData;
                }

                // применение доп. стилей для выбранных элементов
                if (typeof cellData === 'object' && cellData.color === 'selected') {
                    td.style.fontWeight = 'bold'; 
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);

        return table;
    }
}

const tableRenderer = new TableRenderer("dataContainer");

//функция для отображения графика для 3го массива (дополнительно)
function renderChart(array) {
    const canvas = document.getElementById("chartCanvas");
    const ctx = canvas.getContext("2d");    //контекст, позволяющий взаимод-ть с canvas
  
    const labels = array.data.map(row => row[0]); // массив меток для оси х
    const data = array.data.map(row => row[1]);    // массив меток для оси у
  
    new Chart(ctx, {
      type: "bar", // Тип графика - столбчатая диаграмма
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total by project",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  
// вынесение отображения таблицы в отдельную функцию
function showTable(array) {
    tableRenderer.renderTable(array);
    const chartCanvas = document.getElementById("chartCanvas");
    const dataContainer = document.getElementById("dataContainer");
    chartCanvas.style.display = "none"; // скрываем контейнер с графиком
    dataContainer.style.display = "block"; // показываем контейнер с таблицей
  }
 
//слушатель события выбора данных
dataSelector.addEventListener("change", function () {
    const selectedArray = arrays[dataSelector.value];
    const chartCanvas = document.getElementById("chartCanvas");
    const dataContainer = document.getElementById("dataContainer");
  
    if (selectedArray) {
      if (dataSelector.value === "array3") {
        dataContainer.style.display = "none";
        chartCanvas.style.display = "block";
        renderChart(selectedArray);
      } else {
        showTable(selectedArray); // отображением таблицу
        chartCanvas.style.display = "none";
      }
    }
});
  
// вызов функции отображения таблицы для первого массива при загрузке страницы
showTable(arrays.array1);
  
