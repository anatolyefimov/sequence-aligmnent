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

    let f = new Array(n + 1);
    for (let i = 0; i <= n; ++i) {
        f[i] = new Array(m + 1);
    }

    for (let i = 0; i <= n; ++i) {
        f[i][0] = -2*i;
    }

    for (let j = 0; j <= m; ++j) {
        f[0][j] = -2*j;
    }

    const similarity = (a, b) => a === b ? 2 : -1;

    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= m; ++j) {
            f[i][j] = Math.max(
                f[i- 1][j - 1] + similarity(s[i - 1], t[j - 1]),
                f[i - 1][j] - 2,
                f[i][j - 1] - 2,
            );
        }
    }

    let i = n, j = m;
    let editDistance = 0;
    let a = '', b = '';
    while (i > 0 || j > 0 ) {
        if (i > 0 && j > 0 && f[i][j] === f[i - 1][j - 1] + similarity(s[i - 1], t[j - 1])) {
            a = s[i - 1] + a;
            b = t[j - 1] + b;
            --i;
            --j;
        } else if (i > 0 && f[i][j] === f[i - 1][j] - 2) {
            a = s[i - 1] + a;
            b = '-' + b;
            --i;
        } else if (j > 0 && f[i][j] === f[i][j - 1] - 2) {
            a = '-' + a;
            b = t[j - 1] + b;
            --j;
        }
    }

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            ++editDistance;
        }
    }
    let $output = document.querySelector('.output');
    let [$editDistance, $firstSequnce, $seconSequence] = $output.children;
    $editDistance.textContent = editDistance;
    $firstSequnce.textContent = a;
    $seconSequence.textContent = b;
});
