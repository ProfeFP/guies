---
name: rubrica-docent
description: >
  Genera rúbriques d'avaluació personalitzades per a exercicis i activitats de programació (Python, JavaScript, etc.).
  Usa aquest skill sempre que un docent vulgui avaluar codi d'alumnes, necessiti una rúbrica, vulgui saber com puntuar
  una activitat de programació, o demani criteris d'avaluació per a qualsevol exercici de codi.
  El docent envia l'enunciat de l'activitat (o el codi) i el skill genera automàticament una rúbrica
  amb taula de nivells (Excel·lent / Bé / Regular / Insuficient) adaptada als objectius específics de l'activitat.
  Activa't també quan el docent digui: "avalua aquest exercici", "fes una rúbrica", "com puntuaria això",
  "criteris per a aquesta pràctica", o qualsevol variant similar.
---

# Skill: Generador de Rúbriques per a Docents de Programació

## Propòsit

Analitza l'enunciat o el codi d'una activitat de programació i genera una rúbrica d'avaluació
professional, adaptada exactament als objectius d'aprenentatge i al contingut de l'activitat.

---

## Modes de funcionament

El skill detecta automàticament en quin mode operar segons el que envia el docent:

### 🅐 MODE GENERACIÓ (només enunciat)
El docent envia l'enunciat → el skill genera la rúbrica → **espera** que el docent la revisi i la modifiqui si cal → un cop aprovada, el docent pot enviar el codi d'un alumne per aplicar-la.

Quan acabi de generar la rúbrica, afegeix sempre aquest missatge al final:
> "✅ Rúbrica generada. Revisa-la i diga'm si vols modificar algun criteri o descriptor. Quan estiguis llest/a, envia'm el codi de l'alumne i l'aplico!"

### 🅑 MODE AVALUACIÓ (enunciat + codi d'alumne, o rúbrica ja aprovada + codi)
El docent envia el codi d'un alumne (en el mateix missatge o en el missatge següent):
- Si hi ha una rúbrica activa a la conversa → **usa aquella rúbrica** (la que el docent ja ha revisat)
- Si no hi ha rúbrica prèvia → genera-la primer i demana confirmació abans d'avaluar

### 🅒 MODE MODIFICACIÓ (el docent vol canviar la rúbrica)
Si el docent diu "canvia el criteri X", "afegeix un criteri de Y", "treu el criteri de comentaris", etc.:
- Mostra la rúbrica actualitzada sencera (no només el canvi)
- Torna a demanar confirmació per avaluar

---

## Procés d'execució

### Pas 1: Analitza l'activitat

Quan el docent enviï una activitat (enunciat, codi de referència, o descripció), identifica:

- **Objectius tècnics**: Quines construccions del llenguatge s'avaluen (funcions, bucles, classes, etc.)
- **Objectius de qualitat**: Llegibilitat, comentaris, estructura, bones pràctiques
- **Objectius funcionals**: Que el codi funcioni correctament, que gestioni errors, etc.
- **Nivell del curs**: Infereix si és nivell inicial, intermedi o avançat pel vocabulari i la complexitat

### Pas 2: Defineix els criteris

Genera entre **4 i 6 criteris** d'avaluació específics per a l'activitat. Cada criteri ha de:
- Ser observable i mesurable (no vague)
- Correspondre directament a l'enunciat
- Tenir sentit per a un alumne que el llegeixi

**Criteris habituals a considerar** (tria els rellevants per a l'activitat):
- Correctesa funcional (el codi fa el que demana l'enunciat)
- Ús correcte de les estructures sol·licitades (funcions, llistes, bucles, etc.)
- Gestió d'errors i casos especials
- Llegibilitat i estil (noms de variables, indentació, estructura)
- Comentaris i documentació
- Eficiència o optimització (només si és rellevant per al nivell)

### Pas 3: Genera la taula de rúbrica

Crea una taula Markdown amb aquest format:

```
| Criteri | Excel·lent (4) | Bé (3) | Regular (2) | Insuficient (1) |
|---------|---------------|--------|-------------|-----------------|
| ...     | ...           | ...    | ...         | ...             |
```

**Descripció dels nivells** — cada cel·la ha de ser concreta i específica:
- **Excel·lent (4)**: Compleix tots els requisits + alguna cosa destacable (eficiència, elegància, bon ús d'idiomes del llenguatge)
- **Bé (3)**: Compleix tots els requisits essencials amb petites mancances
- **Regular (2)**: Compleix parcialment els requisits; hi ha errors o omissions importants
- **Insuficient (1)**: No compleix el requisit o l'intent és massa parcial per ser avaluat

### Pas 4: Afegeix la informació complementària

Després de la taula, inclou:

#### Puntuació total
Indica el màxim de punts possibles (4 × nombre de criteris) i proposa una equivalència en notes:
- Ex: per 5 criteris → màxim 20 punts → proposa escala 0-10

#### Notes per al docent
2-3 observacions pràctiques específiques per a aquesta activitat:
- Errors típics que solen cometre els alumnes en aquest tipus d'exercici
- Aspectes on cal ser més flexible (per al nivell del curs)
- Aspectes on cal ser estricte

---

## Aplicació de la rúbrica al codi d'un alumne (Mode Avaluació)

Quan el docent enviï el codi d'un alumne per ser avaluat:

### Pas A: Analitza el codi
Llegeix el codi i identifica quins aspectes cobreix (o no cobreix) per a cada criteri de la rúbrica.

### Pas B: Puntua cada criteri
Per a cada criteri, assigna el nivell corresponent (4/3/2/1) i escriu una justificació breu i concreta:
- Cita el codi específic que justifica la puntuació (nom de funció, línia concreta, etc.)
- Evita justificacions vagues com "el codi és correcte"

### Pas C: Format de l'informe d'avaluació

```
## Avaluació: [Nom activitat]

| Criteri | Nivell | Punts | Justificació |
|---------|--------|-------|--------------|
| [criteri 1] | Excel·lent | 4 | [justificació concreta] |
| [criteri 2] | Bé | 3 | [justificació concreta] |
| ... | ... | ... | ... |

**Puntuació total: X / Y punts → Nota: Z/10**

### 💬 Comentari general per a l'alumne
[2-3 frases constructives: un punt fort, un aspecte a millorar, un suggeriment concret]

### 🔍 Aspectes a destacar per al docent
[Qualsevol cosa inusual, sospita de còpia, codi especialment bo o especialment problemàtic]
```

---

## Regles de qualitat

- **Mai** generis criteris genèrics com "El codi funciona" sense especificar QUÈ ha de fer
- Cada descriptor de nivell ha de tenir informació diferent i útil (no repetir amb diferent intensitat)
- Adapta el vocabulari al nivell: no uses "patrons de disseny" en un curs d'iniciació
- Si l'enunciat és ambigu, pregunta UNA sola cosa al docent abans de generar
- Si el docent envia codi d'alumne (no enunciat), infereix l'activitat del codi i genera la rúbrica igualment, indicant l'assumpció feta

---

## Format de sortida

```
## Rúbrica: [Títol de l'activitat inferit]

**Curs/Nivell:** [Inferit de l'activitat]
**Puntuació màxima:** [N] punts

[TAULA DE RÚBRICA]

---

### 📊 Escala de notes
[Taula de conversió punts → nota]

### 💡 Notes per al docent
[2-3 observacions pràctiques]
```

---

## Exemple d'activitat i rúbrica esperada

**Input del docent:**
> "Exercici Python bàsic: l'alumne ha de crear una funció que rebi una llista de números i retorni la mitjana. Ha de gestionar el cas de llista buida."

**Output esperat:**

## Rúbrica: Funció per calcular la mitjana d'una llista

**Curs/Nivell:** Python bàsic  
**Puntuació màxima:** 20 punts

| Criteri | Excel·lent (4) | Bé (3) | Regular (2) | Insuficient (1) |
|---------|---------------|--------|-------------|-----------------|
| Definició de la funció | Funció ben definida amb nom descriptiu, paràmetre ben nomenat i `return` explícit | Funció definida correctament però amb nom poc descriptiu | Funció definida amb errors menors (ex: retorna directament sense variable) | No usa `def` o no és una funció real |
| Càlcul de la mitjana | Usa `sum()` i `len()` o equivalent Pythònic de forma clara | Calcula correctament amb bucle explícit | Intenta calcular però hi ha error lògic en algun cas | No calcula la mitjana o el resultat és incorrecte |
| Gestió de llista buida | Comprova llista buida i retorna `None` o `0` amb comentari explicatiu | Comprova llista buida però sense gestió clara del retorn | Fa alguna comprovació però no funciona per a tots els casos | No gestiona el cas de llista buida |
| Llegibilitat i estil | Noms de variables clars, indentació correcta, codi net i llegible | Codi llegible amb algun nom de variable poc clar | Indentació irregular o noms de variables poc descriptius (ex: `x`, `y`) | Codi difícil de seguir, sense estructura clara |
| Comentaris | Té docstring a la funció i comentari en la gestió d'errors | Té algun comentari útil | Comentaris superficials o innecessaris | Sense cap comentari |
