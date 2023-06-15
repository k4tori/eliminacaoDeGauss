// Função para criar a matriz de entrada
function createMatrix() {
  var rows = parseInt(document.getElementById('rows').value);
  var columns = parseInt(document.getElementById('columns').value);

  var inputContainer = document.getElementById('inputContainer');
  inputContainer.innerHTML = '';

  for (var i = 0; i < rows; i++) {
    var rowDiv = document.createElement('div');
    rowDiv.className = 'matrix-input';

    for (var j = 0; j < columns + 1; j++) {
      var input = document.createElement('input');
      input.type = 'number';
      input.id = 'a' + (i + 1) + (j + 1);
      rowDiv.appendChild(input);
    }

    inputContainer.appendChild(rowDiv);
  }

  inputContainer.style.display = 'block';
}

// Função para calcular a Eliminação de Gauss
function calculateGauss() {
  var rows = parseInt(document.getElementById('rows').value);
  var columns = parseInt(document.getElementById('columns').value);

  var matrix = [];

  for (var i = 0; i < rows; i++) {
    var row = [];
    for (var j = 0; j < columns + 1; j++) {
      var input = document.getElementById('a' + (i + 1) + (j + 1));
      row.push(parseFloat(input.value));
    }
    matrix.push(row);
  }

  var outputContainer = document.getElementById('outputContainer');
  outputContainer.innerHTML = '';

  var steps = gaussElimination(matrix);

  for (var i = 0; i < steps.length; i++) {
    var stepDiv = document.createElement('div');
    stepDiv.className = 'step';

    var title = document.createElement('h3');
    title.textContent = 'Passo ' + (i + 1);
    stepDiv.appendChild(title);

    var table = document.createElement('table');
    var tbody = document.createElement('tbody');

    for (var j = 0; j < steps[i].length; j++) {
      var row = document.createElement('tr');
      for (var k = 0; k < steps[i][j].length; k++) {
        var cell = document.createElement('td');
        cell.textContent = steps[i][j][k].toFixed(2);
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    stepDiv.appendChild(table);
    outputContainer.appendChild(stepDiv);
  }
}

function gaussSeidel(matrix, maxIterations, tolerance) {
  var n = matrix.length;

  var x = new Array(n).fill(0); 

  for (var iter = 0; iter < maxIterations; iter++) {
    var prevX = [...x]; 
    for (var i = 0; i < n; i++) {
      var sum = matrix[i][n]; 

      for (var j = 0; j < n; j++) {
        if (j !== i) {
          sum -= matrix[i][j] * x[j];
        }
      }

      x[i] = sum / matrix[i][i];
    }

    var error = calculateError(x, prevX); 

    if (error < tolerance) {
      break; 
    }
  }

  return x;
}

function calculateError(x, prevX) {
  var maxDiff = 0;

  for (var i = 0; i < x.length; i++) {
    var diff = Math.abs(x[i] - prevX[i]);
    if (diff > maxDiff) {
      maxDiff = diff;
    }
  }

  return maxDiff;
}
/*
// Função para calcular a Decomposição de LU
function calculateLU() {
  var rows = parseInt(document.getElementById('rows').value);
  var columns = parseInt(document.getElementById('columns').value);

  var matrix = [];

  for (var i = 0; i < rows; i++) {
    var row = [];
    for (var j = 0; j < columns + 1; j++) {
      var input = document.getElementById('a' + (i + 1) + (j + 1));
      row.push(parseFloat(input.value));
    }
    matrix.push(row);
  }

  var outputContainer = document.getElementById('outputContainer');
  outputContainer.innerHTML = '';

  var steps = luDecomposition(matrix);

  for (var i = 0; i < steps.length; i++) {
    var stepDiv = document.createElement('div');
    stepDiv.className = 'step';

    var title = document.createElement('h3');
    title.textContent = 'Passo ' + (i + 1);
    stepDiv.appendChild(title);

    var table = document.createElement('table');
    var tbody = document.createElement('tbody');

    for (var j = 0; j < steps[i].length; j++) {
      var row = document.createElement('tr');
      for (var k = 0; k < steps[i][j].length; k++) {
        var cell = document.createElement('td');
        cell.textContent = steps[i][j][k].toFixed(2);
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    stepDiv.appendChild(table);
    outputContainer.appendChild(stepDiv);
  }
}
*/
// Função para realizar a Eliminação de Gauss
function gaussElimination(matrix) {
  var n = matrix.length;

  var steps = [];
  steps.push(matrix); 

  for (var k = 0; k < n - 1; k++) {
    var pivot = matrix[k][k];

    if (pivot === 0) {
      for (var i = k + 1; i < n; i++) {
        if (matrix[i][k] !== 0) {
          var temp = matrix[k];
          matrix[k] = matrix[i];
          matrix[i] = temp;
          break;
        }
      }

      pivot = matrix[k][k];
    }
    for (var i = k + 1; i < n; i++) {
      var factor = matrix[i][k] / pivot;

      for (var j = k; j < n + 1; j++) {
        matrix[i][j] -= factor * matrix[k][j];
      }
    }

    // Salva a matriz após cada passo
    steps.push(matrix);
  }

  return steps;
}

// Função para realizar o método de Gauss-Seidel
function gaussSeidel(matrix) {
  var n = matrix.length;

  var steps = [];
  steps.push(matrix); 

  var x = new Array(n).fill(0); 

  var maxIterations = 100;
  var tolerance = 0.0001;

  for (var iter = 0; iter < maxIterations; iter++) {
    var prevX = [...x]; 

    for (var i = 0; i < n; i++) {
      var sum = matrix[i][n]; 

      for (var j = 0; j < n; j++) {
        if (j !== i) {
          sum -= matrix[i][j] * x[j];
        }
      }

      x[i] = sum / matrix[i][i];
    }

    steps.push([...x]); 

    var error = 0;

    for (var i = 0; i < n; i++) {
      error += Math.abs((x[i] - prevX[i]) / x[i]);
    }

    if (error < tolerance) {
      break; 
    }
  }

  return steps;
}

  

