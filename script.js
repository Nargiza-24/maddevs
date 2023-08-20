import { arrays } from './data.js';

const dataContainer = document.getElementById("dataContainer");
const dataSelector = document.getElementById("dataSelector");

class TableRenderer {
    constructor(dataContainerId) {
        this.dataContainer = document.getElementById(dataContainerId);
    }

    renderTable(array) {
        this.dataContainer.innerHTML = "";

        if (array) {
            const table = this.createTable(array);
            this.dataContainer.appendChild(table);
        }
    }

    createTable(array) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");
        array.header.forEach(column => {
            const th = document.createElement("th");
            th.textContent = column.caption;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

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

                if (typeof cellData === 'object') {
                    if (cellData.d && cellData.color) {
                        td.textContent = cellData.d;
                        td.style.textAlign = 'right';
                    } else {
                        // 
                    }
                } else {
                    td.textContent = cellData;
                }

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

dataSelector.addEventListener("change", function () {
    const selectedArray = arrays[dataSelector.value];

    if (selectedArray) {
        tableRenderer.renderTable(selectedArray);
    }
});