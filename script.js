function copiarCodi(boto) {
  // Busquem el bloc 'pre' que hi ha just a sota de la capçalera del botó
  const editor = boto.parentElement.nextElementSibling;
  const text = editor.innerText;

  navigator.clipboard.writeText(text).then(() => {
    const textOriginal = boto.innerText;
    boto.innerText = "Copiat!";
    boto.style.background = "#27ae60";

    setTimeout(() => {
      boto.innerText = textOriginal;
      boto.style.background = "#3498db";
    }, 2000);
  });
}
