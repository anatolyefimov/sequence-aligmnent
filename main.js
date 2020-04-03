const $input = document.querySelector('.input');
const [$firstSequence, $secondSequence] = document.querySelectorAll('.input__sequence');

function setValidityMessage(input) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity('Последовательность должна сотоять из заглавных символов аглийского алфавита, за исключением B, J, O, U, X, и Z');
    } else if (input.validity.tooLong) {
        input.setCustomValidity('Длина последовательности не более 1000 символов');
    } else {
        input.setCustomValidity('');
    }
}

$firstSequence.addEventListener('input', function() {
    setValidityMessage($firstSequence);
});

$secondSequence.addEventListener('input', function() {
    setValidityMessage($secondSequence);
});

$input.addEventListener('submit', function(event){
    event.preventDefault();

    let s = $firstSequence.value;
    let t = $secondSequence.value;
    let n = s.length;
    let m = t.length;

    let editDistance = new Array(n + 1);
    for (let i = 0; i <= n; ++i) {
        editDistance[i] = new Array(m + 1);
    }

    for (let i = 0; i <= n; ++i) {
        editDistance[i][0] = i;
    }

    for (let j = 0; j <= m; ++j) {

        editDistance[0][j] = j;
    }

    const difference = (a, b) => a === b ? 0 : 1;

    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= m; ++j) {
            if (s[i - 1] === t[j - 1]) {
                editDistance[i][j] = editDistance[i - 1][j - 1];
            } else {
                editDistance[i][j] = Math.min(
                    editDistance[i - 1][j],
                    editDistance[i][j - 1],
                    editDistance[i - 1][j - 1],
                ) + 1;
            }
        }
    }

    let a = '', b = '';
    let i = n, j = m;
    while (i > 0 || j > 0 ) {
        if (i > 0 && j > 0 && editDistance[i][j] === editDistance[i - 1][j - 1] + difference(s[i - 1], t[j - 1])) {
            a = s[i - 1] + a;
            b = t[j - 1] + b;
            --i;
            --j;
        } else if (i > 0 && editDistance[i][j] === editDistance[i - 1][j] + 1) {
            a = s[i - 1] + a;
            b = '-' + b;
            --i;
        } else if (j > 0 && editDistance[i][j] === editDistance[i][j - 1] + 1) {
            a = '-' + a;
            b = t[j - 1] + b;
            --j;
        }
    }
    let $output = document.querySelector('.output');
    let [$editDistance, $firstSequnce, $seconSequence] = $output.children;
    $editDistance.textContent = editDistance[n][m];
    $firstSequnce.textContent = a;
    $seconSequence.textContent = b;
});
