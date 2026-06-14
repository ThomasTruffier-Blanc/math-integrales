const raw = String.raw;

const STORE_KEY = "giga-maths-s2-progress-v1";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const levels = {
  1: "Niveau 1 - primitives directes",
  2: "Niveau 2 - fonctions composées",
  3: "Niveau 3 - logarithmes / exponentielles",
  4: "Niveau 4 - trigonométrie / linéarisation",
  5: "Niveau 5 - fractions rationnelles",
  6: "Niveau 6 - intégrales définies",
  7: "Niveau 7 - IPP et changements de variables"
};

const formulas = [
  {
    category: "Bases",
    label: "Constante",
    latex: raw`\[\int k\,dx=kx+C\]`,
    note: "Une constante s'intègre comme une droite de pente k."
  },
  {
    category: "Bases",
    label: "Somme et facteur",
    latex: raw`\[\int (\lambda f(x)+g(x))\,dx=\lambda F(x)+G(x)+C\]`,
    note: "On peut séparer une somme et sortir un facteur constant."
  },
  {
    category: "Puissances",
    label: "Puissance de x",
    latex: raw`\[\int x^n\,dx=\frac{x^{n+1}}{n+1}+C,\quad n\neq -1\]`,
    note: "Cas le plus courant. Attention au cas n = -1."
  },
  {
    category: "Puissances",
    label: "Racine carrée",
    latex: raw`\[\int \sqrt{x}\,dx=\frac{2}{3}x^{3/2}+C\]`,
    note: "Réécrire \(\sqrt{x}\) sous la forme \(x^{1/2}\)."
  },
  {
    category: "Logarithmes",
    label: "Inverse",
    latex: raw`\[\int \frac{1}{x}\,dx=\ln|x|+C\]`,
    note: "La valeur absolue est nécessaire dès que le signe de x n'est pas fixé."
  },
  {
    category: "Exponentielles",
    label: "Exponentielle simple",
    latex: raw`\[\int e^x\,dx=e^x+C\]`,
    note: "L'exponentielle est sa propre dérivée."
  },
  {
    category: "Exponentielles",
    label: "Exponentielle affine",
    latex: raw`\[\int e^{ax+b}\,dx=\frac{1}{a}e^{ax+b}+C,\quad a\neq 0\]`,
    note: "Ne pas oublier le facteur \(\frac{1}{a}\)."
  },
  {
    category: "Trigonométrie",
    label: "Cosinus",
    latex: raw`\[\int \cos(x)\,dx=\sin(x)+C\]`,
    note: "La dérivée de \(\sin(x)\) est \(\cos(x)\)."
  },
  {
    category: "Trigonométrie",
    label: "Sinus",
    latex: raw`\[\int \sin(x)\,dx=-\cos(x)+C\]`,
    note: "Le signe moins est l'erreur classique."
  },
  {
    category: "Trigonométrie",
    label: "Arctangente",
    latex: raw`\[\int \frac{1}{1+x^2}\,dx=\arctan(x)+C\]`,
    note: "Utile aussi avec une fonction composée."
  },
  {
    category: "Trigonométrie",
    label: "Cosinus affine",
    latex: raw`\[\int \cos(ax+b)\,dx=\frac{1}{a}\sin(ax+b)+C\]`,
    note: "Même logique : on compense la dérivée de \(ax+b\)."
  },
  {
    category: "Trigonométrie",
    label: "Sinus affine",
    latex: raw`\[\int \sin(ax+b)\,dx=-\frac{1}{a}\cos(ax+b)+C\]`,
    note: "Penser au signe moins."
  },
  {
    category: "Fonctions composées",
    label: "Logarithme composé",
    latex: raw`\[\int \frac{u'(x)}{u(x)}\,dx=\ln|u(x)|+C\]`,
    note: "C'est la forme la plus importante pour les fractions."
  },
  {
    category: "Fonctions composées",
    label: "Puissance composée",
    latex: raw`\[\int u'(x)u(x)^n\,dx=\frac{u(x)^{n+1}}{n+1}+C,\quad n\neq -1\]`,
    note: "On remplace mentalement \(u(x)\) par une variable simple."
  },
  {
    category: "Fonctions composées",
    label: "Exponentielle composée",
    latex: raw`\[\int u'(x)e^{u(x)}\,dx=e^{u(x)}+C\]`,
    note: "Exemple type : \(\int 2xe^{x^2}\,dx\)."
  },
  {
    category: "Fonctions composées",
    label: "Cosinus composé",
    latex: raw`\[\int u'(x)\cos(u(x))\,dx=\sin(u(x))+C\]`,
    note: "La primitive reste \(\sin(u)\)."
  },
  {
    category: "Fonctions composées",
    label: "Sinus composé",
    latex: raw`\[\int u'(x)\sin(u(x))\,dx=-\cos(u(x))+C\]`,
    note: "On garde le signe moins."
  },
  {
    category: "Fonctions composées",
    label: "Arctangente composée",
    latex: raw`\[\int \frac{u'(x)}{1+u(x)^2}\,dx=\arctan(u(x))+C\]`,
    note: "Très utile avec \(u=x^2\), \(u=e^x\), etc."
  },
  {
    category: "Fractions rationnelles",
    label: "Inverse affine",
    latex: raw`\[\int \frac{1}{ax+b}\,dx=\frac{1}{a}\ln|ax+b|+C\]`,
    note: "Cas particulier de \(u'/u\)."
  },
  {
    category: "Fractions rationnelles",
    label: "Puissance au dénominateur",
    latex: raw`\[\int \frac{u'(x)}{u(x)^n}\,dx=\frac{u(x)^{1-n}}{1-n}+C,\quad n\neq 1\]`,
    note: "Réécrire en puissance négative."
  },
  {
    category: "Fractions rationnelles",
    label: "Éléments simples",
    latex: raw`\[\frac{1}{(x+1)(x+2)}=\frac{1}{x+1}-\frac{1}{x+2}\]`,
    note: "On intègre ensuite chaque inverse affine avec un logarithme."
  },
  {
    category: "Formules utiles examen",
    label: "Intégrale définie",
    latex: raw`\[\int_a^b f(x)\,dx=F(b)-F(a)\]`,
    note: "F est une primitive de f. Le résultat est un nombre."
  },
  {
    category: "Formules utiles examen",
    label: "Intégration par parties",
    latex: raw`\[\int u\,v'\,dx=uv-\int u'v\,dx\]`,
    note: "Choisir \(u\) pour qu'il se simplifie en le dérivant."
  },
  {
    category: "Formules utiles examen",
    label: "IPP avec bornes",
    latex: raw`\[\int_a^b u\,v'\,dx=[uv]_a^b-\int_a^b u'v\,dx\]`,
    note: "Ne pas oublier le crochet évalué en a et b."
  },
  {
    category: "Formules utiles examen",
    label: "Changement de variable",
    latex: raw`\[\int_a^b f(x)\,dx=\int_\alpha^\beta f(u(t))u'(t)\,dt\]`,
    note: "Avec une intégrale définie, les bornes changent aussi."
  },
  {
    category: "Formules utiles examen",
    label: "Moyenne d'un signal",
    latex: raw`\[\overline{s}=\frac{1}{T}\int_0^T s(t)\,dt\]`,
    note: "Lien direct avec l'analyse de signal en R&T."
  },
  {
    category: "Formules utiles examen",
    label: "Énergie d'un signal",
    latex: raw`\[E=\int_a^b |s(t)|^2\,dt\]`,
    note: "Une intégrale peut mesurer une quantité d'énergie."
  },
  {
    category: "Trigonométrie",
    label: "Linéarisation de sin²",
    latex: raw`\[\sin^2(x)=\frac{1-\cos(2x)}{2}\]`,
    note: "Permet de transformer une puissance en somme intégrable."
  },
  {
    category: "Trigonométrie",
    label: "Linéarisation de cos²",
    latex: raw`\[\cos^2(x)=\frac{1+\cos(2x)}{2}\]`,
    note: "À apprendre pour les exercices de linéarisation."
  },
  {
    category: "Trigonométrie",
    label: "Produit de cosinus",
    latex: raw`\[\cos(a)\cos(b)=\frac{1}{2}\left[\cos(a+b)+\cos(a-b)\right]\]`,
    note: "Transforme un produit en somme."
  }
];

let exerciseSequence = 0;
const exercises = [];

function addExercise(level, title, statement, hint, steps, weakPoint) {
  exerciseSequence += 1;
  exercises.push({
    id: `ex-${exerciseSequence}`,
    level,
    title,
    statement,
    hint,
    steps,
    weakPoint
  });
}

// Niveau 1 : primitives directes
addExercise(1, "Constante", raw`\[\int 6\,dx\]`, "Une constante k donne kx.", [
  raw`On utilise \(\int k\,dx=kx+C\).`,
  raw`Ici \(k=6\).`,
  raw`Résultat : \(6x+C\).`
], "Formules de base");
addExercise(1, "Puissance simple", raw`\[\int x^5\,dx\]`, "Augmente l'exposant de 1 puis divise.", [
  raw`On applique \(\int x^n dx=\frac{x^{n+1}}{n+1}+C\).`,
  raw`Avec \(n=5\), on obtient \(\frac{x^6}{6}\).`,
  raw`Résultat : \(\frac{x^6}{6}+C\).`
], "Puissances");
addExercise(1, "Coefficient et puissance", raw`\[\int 4x^3\,dx\]`, "Le coefficient 4 peut rester devant.", [
  raw`\(\int 4x^3dx=4\int x^3dx\).`,
  raw`\(\int x^3dx=\frac{x^4}{4}\).`,
  raw`Résultat : \(x^4+C\).`
], "Puissances");
addExercise(1, "Polynôme", raw`\[\int (3x^2-2x+5)\,dx\]`, "Intègre terme par terme.", [
  raw`\(\int 3x^2dx=x^3\).`,
  raw`\(\int -2x dx=-x^2\) et \(\int 5dx=5x\).`,
  raw`Résultat : \(x^3-x^2+5x+C\).`
], "Sommes");
addExercise(1, "Inverse", raw`\[\int \frac{1}{x}\,dx\]`, "Le cas \(n=-1\) donne un logarithme.", [
  raw`La formule des puissances ne s'applique pas pour \(n=-1\).`,
  raw`On utilise \(\int \frac{1}{x}dx=\ln|x|+C\).`,
  raw`Résultat : \(\ln|x|+C\).`
], "Logarithmes");
addExercise(1, "Inverse avec coefficient", raw`\[\int \frac{7}{x}\,dx\]`, "Sors le 7 devant l'intégrale.", [
  raw`\(\int \frac{7}{x}dx=7\int \frac{1}{x}dx\).`,
  raw`La primitive de \(\frac{1}{x}\) est \(\ln|x|\).`,
  raw`Résultat : \(7\ln|x|+C\).`
], "Logarithmes");
addExercise(1, "Exponentielle", raw`\[\int e^x\,dx\]`, "L'exponentielle est sa propre primitive.", [
  raw`On sait que \((e^x)'=e^x\).`,
  raw`Résultat : \(e^x+C\).`
], "Exponentielles");
addExercise(1, "Exponentielle avec facteur", raw`\[\int 5e^x\,dx\]`, "Le facteur 5 reste devant.", [
  raw`\(\int 5e^xdx=5\int e^xdx\).`,
  raw`Résultat : \(5e^x+C\).`
], "Exponentielles");
addExercise(1, "Cosinus", raw`\[\int \cos(x)\,dx\]`, "Quelle fonction a pour dérivée cos ?", [
  raw`La dérivée de \(\sin(x)\) est \(\cos(x)\).`,
  raw`Résultat : \(\sin(x)+C\).`
], "Trigonométrie");
addExercise(1, "Sinus", raw`\[\int \sin(x)\,dx\]`, "Attention au signe.", [
  raw`La dérivée de \(-\cos(x)\) est \(\sin(x)\).`,
  raw`Résultat : \(-\cos(x)+C\).`
], "Trigonométrie");
addExercise(1, "Arctangente", raw`\[\int \frac{1}{1+x^2}\,dx\]`, "C'est la dérivée de arctan.", [
  raw`On reconnaît la formule de \(\arctan(x)\).`,
  raw`Résultat : \(\arctan(x)+C\).`
], "Arctangente");
addExercise(1, "Puissance négative", raw`\[\int x^{-3}\,dx\]`, "Utilise la règle des puissances avec \(n=-3\).", [
  raw`\(\int x^{-3}dx=\frac{x^{-2}}{-2}+C\).`,
  raw`Résultat : \(-\frac{1}{2x^2}+C\).`
], "Puissances négatives");
addExercise(1, "Racine", raw`\[\int \sqrt{x}\,dx\]`, "Transforme \(\sqrt{x}\) en \(x^{1/2}\).", [
  raw`\(\sqrt{x}=x^{1/2}\).`,
  raw`\(\int x^{1/2}dx=\frac{x^{3/2}}{3/2}\).`,
  raw`Résultat : \(\frac{2}{3}x^{3/2}+C\).`
], "Racines");
addExercise(1, "Somme log-exp", raw`\[\int \left(\frac{2}{x}+e^x\right)\,dx\]`, "Sépare la somme.", [
  raw`\(\int \frac{2}{x}dx=2\ln|x|\).`,
  raw`\(\int e^xdx=e^x\).`,
  raw`Résultat : \(2\ln|x|+e^x+C\).`
], "Sommes");
addExercise(1, "Somme trigonométrique", raw`\[\int (\cos x-\sin x)\,dx\]`, "Intègre cos puis -sin.", [
  raw`\(\int \cos xdx=\sin x\).`,
  raw`\(\int -\sin xdx=\cos x\).`,
  raw`Résultat : \(\sin x+\cos x+C\).`
], "Trigonométrie");
addExercise(1, "Puissance et arctan", raw`\[\int \left(x^2+\frac{1}{1+x^2}\right)\,dx\]`, "Deux formules différentes sont présentes.", [
  raw`\(\int x^2dx=\frac{x^3}{3}\).`,
  raw`\(\int \frac{1}{1+x^2}dx=\arctan x\).`,
  raw`Résultat : \(\frac{x^3}{3}+\arctan x+C\).`
], "Sommes");
addExercise(1, "Inverse de racine", raw`\[\int \frac{1}{\sqrt{x}}\,dx\]`, "Réécris en \(x^{-1/2}\).", [
  raw`\(\frac{1}{\sqrt{x}}=x^{-1/2}\).`,
  raw`\(\int x^{-1/2}dx=\frac{x^{1/2}}{1/2}\).`,
  raw`Résultat : \(2\sqrt{x}+C\).`
], "Racines");
addExercise(1, "Fonction affine", raw`\[\int (4x-9)\,dx\]`, "Intègre chaque terme.", [
  raw`\(\int 4x dx=2x^2\).`,
  raw`\(\int -9 dx=-9x\).`,
  raw`Résultat : \(2x^2-9x+C\).`
], "Polynômes");
addExercise(1, "Exp et cos", raw`\[\int (e^x+3\cos x)\,dx\]`, "Deux primitives usuelles.", [
  raw`\(\int e^xdx=e^x\).`,
  raw`\(\int 3\cos xdx=3\sin x\).`,
  raw`Résultat : \(e^x+3\sin x+C\).`
], "Sommes");
addExercise(1, "Puissance et logarithme", raw`\[\int \left(2x^3-\frac{5}{x}\right)\,dx\]`, "Le premier terme est une puissance, le second un log.", [
  raw`\(\int 2x^3dx=\frac{x^4}{2}\).`,
  raw`\(\int -\frac{5}{x}dx=-5\ln|x|\).`,
  raw`Résultat : \(\frac{x^4}{2}-5\ln|x|+C\).`
], "Sommes");

// Niveau 2 : fonctions composées
addExercise(2, "Exponentielle composée", raw`\[\int 2x e^{x^2}\,dx\]`, "Pose \(u=x^2\).", [
  raw`On pose \(u=x^2\), donc \(u'=2x\).`,
  raw`L'intégrale est de la forme \(u'e^u\).`,
  raw`Résultat : \(e^{x^2}+C\).`
], "Fonctions composées");
addExercise(2, "Cosinus composé", raw`\[\int 3x^2\cos(x^3)\,dx\]`, "Pose \(u=x^3\).", [
  raw`On pose \(u=x^3\), donc \(u'=3x^2\).`,
  raw`\(\int u'\cos(u)dx=\sin(u)+C\).`,
  raw`Résultat : \(\sin(x^3)+C\).`
], "Fonctions composées");
addExercise(2, "Sinus composé", raw`\[\int 4x\sin(2x^2+1)\,dx\]`, "La dérivée de \(2x^2+1\) est \(4x\).", [
  raw`On pose \(u=2x^2+1\), donc \(u'=4x\).`,
  raw`\(\int u'\sin(u)dx=-\cos(u)+C\).`,
  raw`Résultat : \(-\cos(2x^2+1)+C\).`
], "Fonctions composées");
addExercise(2, "Logarithme composé", raw`\[\int \frac{2x+1}{x^2+x+4}\,dx\]`, "Le numérateur est la dérivée du dénominateur.", [
  raw`On pose \(u=x^2+x+4\), donc \(u'=2x+1\).`,
  raw`On reconnaît \(\int \frac{u'}{u}dx\).`,
  raw`Résultat : \(\ln|x^2+x+4|+C\).`
], "Logarithmes composés");
addExercise(2, "Puissance composée", raw`\[\int 6x(x^2+1)^5\,dx\]`, "Pose \(u=x^2+1\), puis ajuste le coefficient.", [
  raw`On pose \(u=x^2+1\), donc \(du=2x\,dx\).`,
  raw`Ainsi \(6x\,dx=3\,du\).`,
  raw`\(\int 6x(x^2+1)^5dx=3\int u^5du=\frac{u^6}{2}\).`,
  raw`Résultat : \(\frac{(x^2+1)^6}{2}+C\).`
], "Puissances composées");
addExercise(2, "Cosinus affine", raw`\[\int \cos(5x)\,dx\]`, "Il faut compenser la dérivée de \(5x\).", [
  raw`La dérivée de \(5x\) est 5.`,
  raw`On divise donc par 5.`,
  raw`Résultat : \(\frac{1}{5}\sin(5x)+C\).`
], "Trigonométrie composée");
addExercise(2, "Sinus affine", raw`\[\int \sin(3x-2)\,dx\]`, "Primitive de sin : \(-\cos\), puis facteur \(1/3\).", [
  raw`On pose \(u=3x-2\), donc \(u'=3\).`,
  raw`\(\int \sin(u)dx=-\frac{1}{3}\cos(u)+C\).`,
  raw`Résultat : \(-\frac{1}{3}\cos(3x-2)+C\).`
], "Trigonométrie composée");
addExercise(2, "Exponentielle affine", raw`\[\int e^{4x+1}\,dx\]`, "Divise par la dérivée de \(4x+1\).", [
  raw`La dérivée de \(4x+1\) est 4.`,
  raw`On applique \(\int e^{ax+b}dx=\frac{1}{a}e^{ax+b}+C\).`,
  raw`Résultat : \(\frac{1}{4}e^{4x+1}+C\).`
], "Exponentielles composées");
addExercise(2, "Exponentielle exacte", raw`\[\int (6x-2)e^{3x^2-2x}\,dx\]`, "Le facteur devant est exactement la dérivée de l'exposant.", [
  raw`On pose \(u=3x^2-2x\), donc \(u'=6x-2\).`,
  raw`L'intégrale est \(\int u'e^u dx\).`,
  raw`Résultat : \(e^{3x^2-2x}+C\).`
], "Exponentielles composées");
addExercise(2, "Racine et cosinus", raw`\[\int \frac{1}{2\sqrt{x}}\cos(\sqrt{x})\,dx\]`, "Pose \(u=\sqrt{x}\).", [
  raw`On pose \(u=\sqrt{x}\), donc \(u'=\frac{1}{2\sqrt{x}}\).`,
  raw`On reconnaît \(u'\cos(u)\).`,
  raw`Résultat : \(\sin(\sqrt{x})+C\).`
], "Fonctions composées");
addExercise(2, "Inverse affine exact", raw`\[\int \frac{2}{2x+3}\,dx\]`, "Le numérateur est la dérivée de \(2x+3\).", [
  raw`On pose \(u=2x+3\), donc \(u'=2\).`,
  raw`On obtient \(\ln|u|+C\).`,
  raw`Résultat : \(\ln|2x+3|+C\).`
], "Logarithmes composés");
addExercise(2, "Logarithme quadratique", raw`\[\int \frac{10x}{5x^2+1}\,dx\]`, "Regarde la dérivée du dénominateur.", [
  raw`On pose \(u=5x^2+1\), donc \(u'=10x\).`,
  raw`On applique \(\int \frac{u'}{u}dx=\ln|u|+C\).`,
  raw`Résultat : \(\ln(5x^2+1)+C\).`
], "Logarithmes composés");
addExercise(2, "Racine composée", raw`\[\int \frac{x}{\sqrt{x^2+4}}\,dx\]`, "Pose \(u=x^2+4\).", [
  raw`On pose \(u=x^2+4\), donc \(du=2x\,dx\).`,
  raw`\(\int \frac{x}{\sqrt{x^2+4}}dx=\frac12\int u^{-1/2}du\).`,
  raw`Résultat : \(\sqrt{x^2+4}+C\).`
], "Puissances composées");
addExercise(2, "Arctangente composée", raw`\[\int \frac{2x}{1+x^4}\,dx\]`, "Écris \(x^4=(x^2)^2\).", [
  raw`On pose \(u=x^2\), donc \(u'=2x\).`,
  raw`L'intégrale devient \(\int \frac{u'}{1+u^2}dx\).`,
  raw`Résultat : \(\arctan(x^2)+C\).`
], "Arctangente composée");
addExercise(2, "Puissance négative composée", raw`\[\int \frac{e^x}{(1+e^x)^2}\,dx\]`, "Pose \(u=1+e^x\).", [
  raw`On pose \(u=1+e^x\), donc \(u'=e^x\).`,
  raw`On intègre \(\int u^{-2}du=-u^{-1}\).`,
  raw`Résultat : \(-\frac{1}{1+e^x}+C\).`
], "Puissances composées");
addExercise(2, "Puissance affine", raw`\[\int 5(5x-1)^3\,dx\]`, "La dérivée de \(5x-1\) est déjà 5.", [
  raw`On pose \(u=5x-1\), donc \(u'=5\).`,
  raw`\(\int 5(5x-1)^3dx=\int u^3du\).`,
  raw`Résultat : \(\frac{(5x-1)^4}{4}+C\).`
], "Puissances composées");
addExercise(2, "Arctangente avec polynôme", raw`\[\int \frac{2x+2}{1+(x^2+2x)^2}\,dx\]`, "Pose \(u=x^2+2x\).", [
  raw`On pose \(u=x^2+2x\), donc \(u'=2x+2\).`,
  raw`On utilise la primitive de \(\frac{1}{1+u^2}\).`,
  raw`Résultat : \(\arctan(x^2+2x)+C\).`
], "Arctangente composée");
addExercise(2, "Sinus avec signe", raw`\[\int -2x\sin(1-x^2)\,dx\]`, "La dérivée de \(1-x^2\) vaut \(-2x\).", [
  raw`On pose \(u=1-x^2\), donc \(u'=-2x\).`,
  raw`\(\int u'\sin(u)dx=-\cos(u)+C\).`,
  raw`Résultat : \(-\cos(1-x^2)+C\).`
], "Trigonométrie composée");
addExercise(2, "Grande puissance composée", raw`\[\int (3x^2+1)(x^3+x)^4\,dx\]`, "La dérivée de \(x^3+x\) est présente.", [
  raw`On pose \(u=x^3+x\), donc \(u'=3x^2+1\).`,
  raw`\(\int u'u^4dx=\frac{u^5}{5}+C\).`,
  raw`Résultat : \(\frac{(x^3+x)^5}{5}+C\).`
], "Puissances composées");
addExercise(2, "Logarithme dans un cosinus", raw`\[\int \frac{1}{x}\cos(\ln x)\,dx,\quad x>0\]`, "Pose \(u=\ln x\).", [
  raw`On pose \(u=\ln x\), donc \(u'=\frac{1}{x}\).`,
  raw`L'intégrale est \(\int u'\cos(u)dx\).`,
  raw`Résultat : \(\sin(\ln x)+C\).`
], "Fonctions composées");

// Niveau 3 : logarithmes / exponentielles
addExercise(3, "Exponentielle \(2x\)", raw`\[\int e^{2x}\,dx\]`, "Facteur \(\frac{1}{2}\).", [
  raw`La dérivée de \(2x\) est 2.`,
  raw`On compense avec \(\frac12\).`,
  raw`Résultat : \(\frac{1}{2}e^{2x}+C\).`
], "Exponentielles");
addExercise(3, "Exponentielle décroissante", raw`\[\int e^{-3x+1}\,dx\]`, "Le coefficient de x est négatif.", [
  raw`Ici \(a=-3\).`,
  raw`\(\int e^{ax+b}dx=\frac1a e^{ax+b}+C\).`,
  raw`Résultat : \(-\frac{1}{3}e^{-3x+1}+C\).`
], "Exponentielles");
addExercise(3, "Logarithme décalé", raw`\[\int \frac{1}{x+4}\,dx\]`, "Inverse affine avec coefficient 1.", [
  raw`On pose \(u=x+4\), donc \(u'=1\).`,
  raw`Résultat : \(\ln|x+4|+C\).`
], "Logarithmes");
addExercise(3, "Inverse affine exact", raw`\[\int \frac{2}{2x-5}\,dx\]`, "Le numérateur est exactement la dérivée.", [
  raw`On pose \(u=2x-5\), donc \(u'=2\).`,
  raw`Résultat : \(\ln|2x-5|+C\).`
], "Logarithmes");
addExercise(3, "Logarithme cubique", raw`\[\int \frac{3x^2}{x^3+2}\,dx\]`, "Dérivée du dénominateur : \(3x^2\).", [
  raw`On pose \(u=x^3+2\), donc \(u'=3x^2\).`,
  raw`On obtient \(\ln|u|+C\).`,
  raw`Résultat : \(\ln|x^3+2|+C\).`
], "Logarithmes composés");
addExercise(3, "Exponentielle et facteur x", raw`\[\int x e^{x^2/2}\,dx\]`, "La dérivée de \(x^2/2\) est x.", [
  raw`On pose \(u=\frac{x^2}{2}\), donc \(u'=x\).`,
  raw`On applique \(\int u'e^u dx=e^u+C\).`,
  raw`Résultat : \(e^{x^2/2}+C\).`
], "Exponentielles composées");
addExercise(3, "Log de l'exponentielle", raw`\[\int \frac{e^x}{e^x+7}\,dx\]`, "Le numérateur est la dérivée du dénominateur.", [
  raw`On pose \(u=e^x+7\), donc \(u'=e^x\).`,
  raw`Résultat : \(\ln(e^x+7)+C\).`
], "Logarithmes composés");
addExercise(3, "Exponentielle quadratique", raw`\[\int (2x+3)e^{x^2+3x}\,dx\]`, "La dérivée de l'exposant est \(2x+3\).", [
  raw`On pose \(u=x^2+3x\), donc \(u'=2x+3\).`,
  raw`Résultat : \(e^{x^2+3x}+C\).`
], "Exponentielles composées");
addExercise(3, "Exponentielle de log", raw`\[\int \frac{1}{x}e^{\ln x}\,dx,\quad x>0\]`, "Pose \(u=\ln x\).", [
  raw`On pose \(u=\ln x\), donc \(u'=\frac1x\).`,
  raw`On obtient \(e^{\ln x}+C\).`,
  raw`Comme \(x>0\), \(e^{\ln x}=x\). Résultat : \(x+C\).`
], "Exponentielles et logarithmes");
addExercise(3, "Log d'une exponentielle", raw`\[\int \frac{4e^{4x}}{1+e^{4x}}\,dx\]`, "La dérivée de \(1+e^{4x}\) est \(4e^{4x}\).", [
  raw`On pose \(u=1+e^{4x}\), donc \(u'=4e^{4x}\).`,
  raw`Résultat : \(\ln(1+e^{4x})+C\).`
], "Logarithmes composés");
addExercise(3, "Primitive de ln", raw`\[\int \ln(x)\,dx,\quad x>0\]`, "Utilise une IPP avec \(u=\ln x\) et \(v'=1\).", [
  raw`On prend \(u=\ln x\), \(u'=\frac1x\), \(v'=1\), \(v=x\).`,
  raw`\(\int \ln xdx=x\ln x-\int 1dx\).`,
  raw`Résultat : \(x\ln x-x+C\).`
], "IPP et logarithmes");
addExercise(3, "IPP exponentielle", raw`\[\int x e^{2x}\,dx\]`, "Prends \(u=x\) et \(v'=e^{2x}\).", [
  raw`On prend \(u=x\), \(u'=1\), \(v=\frac12e^{2x}\).`,
  raw`\(\int xe^{2x}dx=\frac{x}{2}e^{2x}-\frac12\int e^{2x}dx\).`,
  raw`Résultat : \(\left(\frac{x}{2}-\frac14\right)e^{2x}+C\).`
], "IPP exponentielle");
addExercise(3, "Inverse affine non exact", raw`\[\int \frac{1}{3x+2}\,dx\]`, "Il manque le facteur 3.", [
  raw`On pose \(u=3x+2\), donc \(u'=3\).`,
  raw`Il faut diviser par 3.`,
  raw`Résultat : \(\frac13\ln|3x+2|+C\).`
], "Logarithmes");
addExercise(3, "Dénominateur au carré", raw`\[\int \frac{6x}{(x^2+5)^2}\,dx\]`, "Pose \(u=x^2+5\).", [
  raw`On pose \(u=x^2+5\), donc \(du=2x\,dx\).`,
  raw`Alors \(6x\,dx=3du\), donc \(3\int u^{-2}du\).`,
  raw`Résultat : \(-\frac{3}{x^2+5}+C\).`
], "Puissances composées");
addExercise(3, "Exponentielle composée simple", raw`\[\int 2x e^{x^2+1}\,dx\]`, "La dérivée de \(x^2+1\) est \(2x\).", [
  raw`On pose \(u=x^2+1\), donc \(u'=2x\).`,
  raw`Résultat : \(e^{x^2+1}+C\).`
], "Exponentielles composées");

// Niveau 4 : trigonométrie / linéarisation
addExercise(4, "Cosinus \(2x\)", raw`\[\int \cos(2x)\,dx\]`, "Compense la dérivée de \(2x\).", [
  raw`La dérivée de \(2x\) vaut 2.`,
  raw`Résultat : \(\frac12\sin(2x)+C\).`
], "Trigonométrie");
addExercise(4, "Sinus \(4x\)", raw`\[\int \sin(4x)\,dx\]`, "Primitive de sin : \(-\cos\).", [
  raw`La dérivée de \(4x\) vaut 4.`,
  raw`Résultat : \(-\frac14\cos(4x)+C\).`
], "Trigonométrie");
addExercise(4, "Linéarisation de sin²", raw`\[\int \sin^2(x)\,dx\]`, "Utilise \(\sin^2x=\frac{1-\cos2x}{2}\).", [
  raw`\(\sin^2x=\frac{1-\cos(2x)}{2}\).`,
  raw`\(\int \sin^2x dx=\frac{x}{2}-\frac12\int \cos(2x)dx\).`,
  raw`Résultat : \(\frac{x}{2}-\frac{\sin(2x)}{4}+C\).`
], "Linéarisation");
addExercise(4, "Linéarisation de cos²", raw`\[\int \cos^2(x)\,dx\]`, "Utilise \(\cos^2x=\frac{1+\cos2x}{2}\).", [
  raw`\(\cos^2x=\frac{1+\cos(2x)}{2}\).`,
  raw`\(\int \cos^2x dx=\frac{x}{2}+\frac12\int \cos(2x)dx\).`,
  raw`Résultat : \(\frac{x}{2}+\frac{\sin(2x)}{4}+C\).`
], "Linéarisation");
addExercise(4, "Produit \(2\sin x\cos x\)", raw`\[\int 2\sin(x)\cos(x)\,dx\]`, "Pose \(u=\sin x\).", [
  raw`On pose \(u=\sin x\), donc \(u'=\cos x\).`,
  raw`L'intégrale vaut \(2\int u\,du\).`,
  raw`Résultat : \(\sin^2(x)+C\).`
], "Fonctions composées trigonométriques");
addExercise(4, "Produit de cosinus", raw`\[\int \cos(x)\cos(2x)\,dx\]`, "Produit en somme.", [
  raw`\(\cos a\cos b=\frac12[\cos(a+b)+\cos(a-b)]\).`,
  raw`\(\cos x\cos2x=\frac12[\cos3x+\cos x]\).`,
  raw`Résultat : \(\frac{\sin(3x)}{6}+\frac{\sin x}{2}+C\).`
], "Linéarisation");
addExercise(4, "Produit sin cos", raw`\[\int \sin(x)\cos(x)\,dx\]`, "Pose \(u=\sin x\).", [
  raw`Avec \(u=\sin x\), \(u'=\cos x\).`,
  raw`\(\int \sin x\cos xdx=\int udu\).`,
  raw`Résultat : \(\frac12\sin^2x+C\).`
], "Fonctions composées trigonométriques");
addExercise(4, "Sinus affine", raw`\[\int \sin(3x+1)\,dx\]`, "Divise par 3 et garde le signe moins.", [
  raw`On pose \(u=3x+1\), \(u'=3\).`,
  raw`Résultat : \(-\frac13\cos(3x+1)+C\).`
], "Trigonométrie");
addExercise(4, "Cosinus affine", raw`\[\int \cos(5x-2)\,dx\]`, "Divise par 5.", [
  raw`On pose \(u=5x-2\), \(u'=5\).`,
  raw`Résultat : \(\frac15\sin(5x-2)+C\).`
], "Trigonométrie");
addExercise(4, "Sin² de \(2x\)", raw`\[\int \sin^2(2x)\,dx\]`, "Linéarise avec l'angle \(2x\).", [
  raw`\(\sin^2(2x)=\frac{1-\cos(4x)}{2}\).`,
  raw`On intègre terme par terme.`,
  raw`Résultat : \(\frac{x}{2}-\frac{\sin(4x)}{8}+C\).`
], "Linéarisation");
addExercise(4, "Cos² de \(3x\)", raw`\[\int \cos^2(3x)\,dx\]`, "Linéarise avec l'angle \(3x\).", [
  raw`\(\cos^2(3x)=\frac{1+\cos(6x)}{2}\).`,
  raw`On intègre \(\cos(6x)\) avec le facteur \(\frac16\).`,
  raw`Résultat : \(\frac{x}{2}+\frac{\sin(6x)}{12}+C\).`
], "Linéarisation");
addExercise(4, "Produit de sinus", raw`\[\int \sin(x)\sin(2x)\,dx\]`, "Utilise \(\sin a\sin b=\frac12[\cos(a-b)-\cos(a+b)]\).", [
  raw`\(\sin x\sin2x=\frac12[\cos x-\cos3x]\).`,
  raw`On intègre chaque cosinus.`,
  raw`Résultat : \(\frac12\sin x-\frac16\sin(3x)+C\).`
], "Linéarisation");
addExercise(4, "Cosinus puissance 3", raw`\[\int \cos^3(x)\,dx\]`, "Écris \(\cos^3x=\cos x(1-\sin^2x)\).", [
  raw`\(\cos^3x=\cos x(1-\sin^2x)\).`,
  raw`On pose \(u=\sin x\), donc \(du=\cos xdx\).`,
  raw`\(\int (1-u^2)du=u-\frac{u^3}{3}\).`,
  raw`Résultat : \(\sin x-\frac{\sin^3x}{3}+C\).`
], "Trigonométrie composée");
addExercise(4, "Sinus et arctangente", raw`\[\int \frac{\sin x}{1+\cos^2x}\,dx\]`, "Pose \(u=\cos x\), attention au signe.", [
  raw`On pose \(u=\cos x\), donc \(du=-\sin xdx\).`,
  raw`L'intégrale vaut \(-\int \frac{1}{1+u^2}du\).`,
  raw`Résultat : \(-\arctan(\cos x)+C\).`
], "Changement de variable simple");
addExercise(4, "Tangente", raw`\[\int \tan(x)\,dx\]`, "Écris \(\tan x=\frac{\sin x}{\cos x}\).", [
  raw`\(\tan x=\frac{\sin x}{\cos x}\).`,
  raw`On pose \(u=\cos x\), donc \(du=-\sin xdx\).`,
  raw`Résultat : \(-\ln|\cos x|+C\).`
], "Logarithmes trigonométriques");

// Niveau 5 : fractions rationnelles
addExercise(5, "Éléments simples classique", raw`\[\int \frac{1}{(x+1)(x+2)}\,dx\]`, "Décompose en deux inverses affines.", [
  raw`\(\frac{1}{(x+1)(x+2)}=\frac{1}{x+1}-\frac{1}{x+2}\).`,
  raw`On intègre chaque terme en logarithme.`,
  raw`Résultat : \(\ln|x+1|-\ln|x+2|+C\).`
], "Éléments simples");
addExercise(5, "Dérivée sur fonction", raw`\[\int \frac{2x+1}{x^2+x+3}\,dx\]`, "Le numérateur est la dérivée du dénominateur.", [
  raw`On pose \(u=x^2+x+3\), donc \(u'=2x+1\).`,
  raw`Résultat : \(\ln|x^2+x+3|+C\).`
], "Forme u'/u");
addExercise(5, "Décomposition avec x", raw`\[\int \frac{1}{x(x+1)}\,dx\]`, "Cherche \(\frac{A}{x}+\frac{B}{x+1}\).", [
  raw`\(\frac{1}{x(x+1)}=\frac{1}{x}-\frac{1}{x+1}\).`,
  raw`On intègre les deux inverses.`,
  raw`Résultat : \(\ln|x|-\ln|x+1|+C\).`
], "Éléments simples");
addExercise(5, "Décomposition guidée", raw`\[\int \frac{3x+5}{x^2+5x+6}\,dx\]`, "Factorise \(x^2+5x+6\).", [
  raw`On factorise \(x^2+5x+6=(x+2)(x+3)\).`,
  raw`\(\frac{3x+5}{(x+2)(x+3)}=-\frac{1}{x+2}+\frac{4}{x+3}\).`,
  raw`Résultat : \(-\ln|x+2|+4\ln|x+3|+C\).`
], "Éléments simples");
addExercise(5, "Différence de carrés", raw`\[\int \frac{1}{x^2-1}\,dx\]`, "Factorise en \((x-1)(x+1)\).", [
  raw`\(\frac{1}{x^2-1}=\frac12\left(\frac{1}{x-1}-\frac{1}{x+1}\right)\).`,
  raw`On intègre avec des logarithmes.`,
  raw`Résultat : \(\frac12\ln|x-1|-\frac12\ln|x+1|+C\).`
], "Éléments simples");
addExercise(5, "Quadratique simple", raw`\[\int \frac{x}{x^2+1}\,dx\]`, "La dérivée de \(x^2+1\) est presque présente.", [
  raw`On pose \(u=x^2+1\), donc \(du=2x\,dx\).`,
  raw`L'intégrale vaut \(\frac12\int \frac{du}{u}\).`,
  raw`Résultat : \(\frac12\ln(x^2+1)+C\).`
], "Forme u'/u");
addExercise(5, "Coefficient ajusté", raw`\[\int \frac{4x}{2x^2+7}\,dx\]`, "Le numérateur est la dérivée du dénominateur.", [
  raw`On pose \(u=2x^2+7\), donc \(u'=4x\).`,
  raw`Résultat : \(\ln(2x^2+7)+C\).`
], "Forme u'/u");
addExercise(5, "Inverse affine", raw`\[\int \frac{1}{2x+1}\,dx\]`, "Il manque un facteur 2.", [
  raw`On pose \(u=2x+1\), donc \(du=2dx\).`,
  raw`Il faut multiplier par \(\frac12\).`,
  raw`Résultat : \(\frac12\ln|2x+1|+C\).`
], "Inverse affine");
addExercise(5, "Dénominateur carré", raw`\[\int \frac{1}{(x+1)^2}\,dx\]`, "Réécris en \((x+1)^{-2}\).", [
  raw`\(\frac{1}{(x+1)^2}=(x+1)^{-2}\).`,
  raw`La primitive est \(-(x+1)^{-1}\).`,
  raw`Résultat : \(-\frac{1}{x+1}+C\).`
], "Puissance au dénominateur");
addExercise(5, "Division avant intégration", raw`\[\int \frac{x}{x+1}\,dx\]`, "Écris \(x=(x+1)-1\).", [
  raw`\(\frac{x}{x+1}=1-\frac{1}{x+1}\).`,
  raw`On intègre les deux termes.`,
  raw`Résultat : \(x-\ln|x+1|+C\).`
], "Réécriture rationnelle");
addExercise(5, "Quadratique centrée", raw`\[\int \frac{x+3}{x^2+6x+10}\,dx\]`, "Le numérateur est la moitié de la dérivée.", [
  raw`La dérivée de \(x^2+6x+10\) est \(2x+6=2(x+3)\).`,
  raw`L'intégrale vaut \(\frac12\ln|x^2+6x+10|\).`,
  raw`Résultat : \(\frac12\ln(x^2+6x+10)+C\).`
], "Forme u'/u");
addExercise(5, "Logarithme exact", raw`\[\int \frac{2x-1}{x^2-x}\,dx\]`, "Le numérateur est la dérivée du dénominateur.", [
  raw`On pose \(u=x^2-x\), donc \(u'=2x-1\).`,
  raw`Résultat : \(\ln|x^2-x|+C\).`
], "Forme u'/u");
addExercise(5, "Arctangente adaptée", raw`\[\int \frac{1}{x^2+4}\,dx\]`, "Fais apparaître \(1+(x/2)^2\).", [
  raw`\(x^2+4=4\left(1+\left(\frac{x}{2}\right)^2\right)\).`,
  raw`On obtient une forme arctangente avec \(u=\frac{x}{2}\).`,
  raw`Résultat : \(\frac12\arctan\left(\frac{x}{2}\right)+C\).`
], "Arctangente");
addExercise(5, "Pôles symétriques", raw`\[\int \frac{5}{x^2-4}\,dx\]`, "Factorise \(x^2-4\).", [
  raw`On factorise \(x^2-4=(x-2)(x+2)\).`,
  raw`\(\frac{5}{x^2-4}=\frac{5}{4}\frac{1}{x-2}-\frac{5}{4}\frac{1}{x+2}\).`,
  raw`Résultat : \(\frac54\ln|x-2|-\frac54\ln|x+2|+C\).`
], "Éléments simples");
addExercise(5, "Quadratique et translation", raw`\[\int \frac{x+1}{(x+1)^2+9}\,dx\]`, "Dérivée du dénominateur : \(2(x+1)\).", [
  raw`On pose \(u=(x+1)^2+9\), donc \(u'=2(x+1)\).`,
  raw`Il faut donc un facteur \(\frac12\).`,
  raw`Résultat : \(\frac12\ln((x+1)^2+9)+C\).`
], "Forme u'/u");

// Niveau 6 : intégrales définies
addExercise(6, "Aire d'une droite", raw`\[\int_0^1 2x\,dx\]`, "Primitive : \(x^2\).", [
  raw`Une primitive de \(2x\) est \(x^2\).`,
  raw`\([x^2]_0^1=1^2-0^2\).`,
  raw`Résultat : \(1\).`
], "Intégrales définies");
addExercise(6, "Puissance avec bornes", raw`\[\int_0^2 3x^2\,dx\]`, "Primitive : \(x^3\).", [
  raw`Une primitive de \(3x^2\) est \(x^3\).`,
  raw`\([x^3]_0^2=8-0\).`,
  raw`Résultat : \(8\).`
], "Intégrales définies");
addExercise(6, "Cosinus sur une période", raw`\[\int_0^\pi \cos x\,dx\]`, "Primitive : \(\sin x\).", [
  raw`\(\int_0^\pi \cos xdx=[\sin x]_0^\pi\).`,
  raw`\(\sin\pi-\sin0=0-0\).`,
  raw`Résultat : \(0\).`
], "Intégrales trigonométriques");
addExercise(6, "Sinus positif", raw`\[\int_0^\pi \sin x\,dx\]`, "Primitive : \(-\cos x\).", [
  raw`\(\int_0^\pi \sin xdx=[-\cos x]_0^\pi\).`,
  raw`Cela donne \(-\cos\pi+\cos0=1+1\).`,
  raw`Résultat : \(2\).`
], "Intégrales trigonométriques");
addExercise(6, "Log entre 1 et e", raw`\[\int_1^e \frac{1}{x}\,dx\]`, "Primitive : \(\ln x\) sur \(x>0\).", [
  raw`\(\int_1^e \frac1x dx=[\ln x]_1^e\).`,
  raw`\(\ln e-\ln1=1-0\).`,
  raw`Résultat : \(1\).`
], "Logarithmes");
addExercise(6, "Exponentielle définie", raw`\[\int_0^1 e^x\,dx\]`, "Primitive : \(e^x\).", [
  raw`\([e^x]_0^1=e^1-e^0\).`,
  raw`Résultat : \(e-1\).`
], "Exponentielles");
addExercise(6, "Polynôme défini", raw`\[\int_0^1 (x^2+1)\,dx\]`, "Primitive : \(x^3/3+x\).", [
  raw`Une primitive est \(\frac{x^3}{3}+x\).`,
  raw`On évalue entre 0 et 1 : \(\frac13+1\).`,
  raw`Résultat : \(\frac43\).`
], "Intégrales définies");
addExercise(6, "Cosinus doublé", raw`\[\int_0^{\pi/2} \cos(2x)\,dx\]`, "Primitive : \(\frac12\sin(2x)\).", [
  raw`\(\left[\frac12\sin(2x)\right]_0^{\pi/2}\).`,
  raw`\(\frac12\sin\pi-\frac12\sin0=0\).`,
  raw`Résultat : \(0\).`
], "Trigonométrie");
addExercise(6, "Composée définie", raw`\[\int_0^1 2x e^{x^2}\,dx\]`, "Primitive : \(e^{x^2}\).", [
  raw`Une primitive de \(2xe^{x^2}\) est \(e^{x^2}\).`,
  raw`\([e^{x^2}]_0^1=e^1-e^0\).`,
  raw`Résultat : \(e-1\).`
], "Fonctions composées");
addExercise(6, "Arctangente définie", raw`\[\int_0^1 \frac{1}{1+x^2}\,dx\]`, "Primitive : \(\arctan x\).", [
  raw`\([\arctan x]_0^1=\arctan(1)-\arctan(0)\).`,
  raw`\(\arctan(1)=\frac{\pi}{4}\) et \(\arctan(0)=0\).`,
  raw`Résultat : \(\frac{\pi}{4}\).`
], "Arctangente");
addExercise(6, "Log décalé défini", raw`\[\int_1^2 \frac{1}{x+1}\,dx\]`, "Primitive : \(\ln|x+1|\).", [
  raw`\([\ln|x+1|]_1^2=\ln3-\ln2\).`,
  raw`Résultat : \(\ln\left(\frac32\right)\).`
], "Logarithmes");
addExercise(6, "Fonction affine définie", raw`\[\int_0^2 (3x-1)\,dx\]`, "Primitive : \(\frac32x^2-x\).", [
  raw`Une primitive est \(\frac32x^2-x\).`,
  raw`En 2 : \(6-2=4\), en 0 : \(0\).`,
  raw`Résultat : \(4\).`
], "Intégrales définies");
addExercise(6, "Polynôme défini 2", raw`\[\int_0^1 (4x^3+2x)\,dx\]`, "Primitive : \(x^4+x^2\).", [
  raw`Une primitive est \(x^4+x^2\).`,
  raw`\([x^4+x^2]_0^1=1+1\).`,
  raw`Résultat : \(2\).`
], "Intégrales définies");
addExercise(6, "Moyenne d'un signal", raw`\[\frac{1}{2}\int_0^2 (t+1)\,dt\]`, "Calcule l'intégrale puis divise par la durée.", [
  raw`\(\int_0^2(t+1)dt=\left[\frac{t^2}{2}+t\right]_0^2=4\).`,
  raw`La moyenne vaut \(\frac12\times4\).`,
  raw`Résultat : \(2\).`
], "Analyse de signal");
addExercise(6, "Énergie simple", raw`\[\int_0^1 t^2\,dt\]`, "Primitive : \(t^3/3\).", [
  raw`Une primitive de \(t^2\) est \(\frac{t^3}{3}\).`,
  raw`\(\left[\frac{t^3}{3}\right]_0^1=\frac13\).`,
  raw`Résultat : \(\frac13\).`
], "Analyse de signal");

// Niveau 7 : IPP et changements de variables
addExercise(7, "IPP \(xe^x\)", raw`\[\int x e^x\,dx\]`, "Prends \(u=x\), \(v'=e^x\).", [
  raw`On prend \(u=x\), \(u'=1\), \(v'=e^x\), \(v=e^x\).`,
  raw`\(\int xe^xdx=xe^x-\int e^xdx\).`,
  raw`Résultat : \(e^x(x-1)+C\).`
], "IPP");
addExercise(7, "IPP \(x\cos x\)", raw`\[\int x\cos x\,dx\]`, "Prends \(u=x\), \(v'=\cos x\).", [
  raw`On prend \(u=x\), \(u'=1\), \(v=\sin x\).`,
  raw`\(\int x\cos xdx=x\sin x-\int \sin xdx\).`,
  raw`Résultat : \(x\sin x+\cos x+C\).`
], "IPP");
addExercise(7, "IPP \(x\sin x\)", raw`\[\int x\sin x\,dx\]`, "Prends \(u=x\), \(v'=\sin x\).", [
  raw`On prend \(u=x\), \(u'=1\), \(v=-\cos x\).`,
  raw`\(\int x\sin xdx=-x\cos x+\int \cos xdx\).`,
  raw`Résultat : \(-x\cos x+\sin x+C\).`
], "IPP");
addExercise(7, "IPP logarithme", raw`\[\int \ln x\,dx,\quad x>0\]`, "Le facteur caché est \(1dx\).", [
  raw`On prend \(u=\ln x\), \(u'=\frac1x\), \(v'=1\), \(v=x\).`,
  raw`\(\int \ln xdx=x\ln x-\int 1dx\).`,
  raw`Résultat : \(x\ln x-x+C\).`
], "IPP");
addExercise(7, "IPP \(x\ln x\)", raw`\[\int x\ln x\,dx,\quad x>0\]`, "Prends \(u=\ln x\) et \(v'=x\).", [
  raw`On prend \(u=\ln x\), \(u'=\frac1x\), \(v=\frac{x^2}{2}\).`,
  raw`\(\int x\ln xdx=\frac{x^2}{2}\ln x-\int \frac{x}{2}dx\).`,
  raw`Résultat : \(\frac{x^2}{2}\ln x-\frac{x^2}{4}+C\).`
], "IPP");
addExercise(7, "Double IPP exponentielle", raw`\[\int x^2 e^x\,dx\]`, "Il faut dériver \(x^2\) deux fois.", [
  raw`Première IPP : \(x^2e^x-\int 2xe^xdx\).`,
  raw`Deuxième IPP : \(\int 2xe^xdx=2xe^x-2e^x\).`,
  raw`Résultat : \(e^x(x^2-2x+2)+C\).`
], "Double IPP");
addExercise(7, "Double IPP trigonométrique", raw`\[\int x^2\cos x\,dx\]`, "Dérive \(x^2\) jusqu'à simplifier.", [
  raw`Première IPP : \(x^2\sin x-\int 2x\sin xdx\).`,
  raw`Or \(\int 2x\sin xdx=-2x\cos x+2\sin x\).`,
  raw`Résultat : \(x^2\sin x+2x\cos x-2\sin x+C\).`
], "Double IPP");
addExercise(7, "IPP définie", raw`\[\int_0^1 x e^x\,dx\]`, "Utilise la primitive trouvée pour \(xe^x\).", [
  raw`Une primitive est \(e^x(x-1)\).`,
  raw`On évalue : \([e^x(x-1)]_0^1\).`,
  raw`En 1 : 0, en 0 : \(-1\).`,
  raw`Résultat : \(1\).`
], "IPP définie");
addExercise(7, "Changement de variable racine", raw`\[\int_0^4 e^{\sqrt{x}}\,dx\]`, "Pose \(x=t^2\).", [
  raw`On pose \(x=t^2\), donc \(dx=2t\,dt\).`,
  raw`Les bornes deviennent \(x=0\Rightarrow t=0\), \(x=4\Rightarrow t=2\).`,
  raw`L'intégrale devient \(\int_0^2 2t e^t dt\).`,
  raw`Avec une IPP : résultat \(2(e^2+1)\).`
], "Changement de variable");
addExercise(7, "CV logarithme défini", raw`\[\int_0^1 \frac{2x}{1+x^2}\,dx\]`, "Pose \(u=1+x^2\).", [
  raw`On pose \(u=1+x^2\), donc \(du=2x\,dx\).`,
  raw`Les bornes deviennent \(u(0)=1\), \(u(1)=2\).`,
  raw`L'intégrale vaut \(\int_1^2 \frac{du}{u}\).`,
  raw`Résultat : \(\ln2\).`
], "Changement de variable");
addExercise(7, "CV trigonométrique", raw`\[\int_0^{\pi/2} \sin x\cos x\,dx\]`, "Pose \(u=\sin x\).", [
  raw`On pose \(u=\sin x\), donc \(du=\cos xdx\).`,
  raw`Les bornes deviennent \(0\) et \(1\).`,
  raw`\(\int_0^1 udu=\frac12\).`,
  raw`Résultat : \(\frac12\).`
], "Changement de variable");
addExercise(7, "CV exponentiel défini", raw`\[\int_0^1 3x^2e^{x^3}\,dx\]`, "Pose \(u=x^3\).", [
  raw`On pose \(u=x^3\), donc \(du=3x^2dx\).`,
  raw`Les bornes deviennent \(0\) et \(1\).`,
  raw`\(\int_0^1 e^udu=e-1\).`,
  raw`Résultat : \(e-1\).`
], "Changement de variable");
addExercise(7, "CV racine simple", raw`\[\int_1^4 \frac{1}{\sqrt{x}}\,dx\]`, "Tu peux utiliser directement la primitive ou poser \(x=t^2\).", [
  raw`Méthode directe : \(\int x^{-1/2}dx=2\sqrt{x}\).`,
  raw`\([2\sqrt{x}]_1^4=4-2\).`,
  raw`Résultat : \(2\).`
], "Changement de variable");
addExercise(7, "CV avec puissance au dénominateur", raw`\[\int_0^1 \frac{x}{(1+x^2)^2}\,dx\]`, "Pose \(u=1+x^2\).", [
  raw`On pose \(u=1+x^2\), donc \(du=2x\,dx\).`,
  raw`Les bornes deviennent \(1\) et \(2\).`,
  raw`L'intégrale vaut \(\frac12\int_1^2 u^{-2}du\).`,
  raw`Résultat : \(\frac14\).`
], "Changement de variable");
addExercise(7, "IPP définie trigonométrique", raw`\[\int_0^{\pi/2} x\sin x\,dx\]`, "Prends \(u=x\), \(v'=\sin x\).", [
  raw`On prend \(u=x\), \(u'=1\), \(v=-\cos x\).`,
  raw`\(\int_0^{\pi/2}x\sin xdx=[-x\cos x]_0^{\pi/2}+\int_0^{\pi/2}\cos xdx\).`,
  raw`Le crochet vaut 0 et \([\sin x]_0^{\pi/2}=1\).`,
  raw`Résultat : \(1\).`
], "IPP définie");

const quizQuestions = [
  {
    category: "primitives",
    question: raw`Quelle est une primitive de \(\cos(x)\) ?`,
    answers: [raw`\(\sin(x)+C\)`, raw`\(-\sin(x)+C\)`, raw`\(\cos(x)+C\)`, raw`\(-\cos(x)+C\)`],
    correct: 0,
    explanation: "La dérivée de sin(x) est cos(x)."
  },
  {
    category: "primitives",
    question: raw`Quelle formule utiliser pour \(\int x^n\,dx\), avec \(n\ne -1\) ?`,
    answers: [raw`\(\frac{x^{n+1}}{n+1}+C\)`, raw`\(\ln|x|+C\)`, raw`\(\frac{x^n}{n}+C\)`, raw`\(nx^{n-1}+C\)`],
    correct: 0,
    explanation: "On augmente l'exposant de 1, puis on divise par ce nouvel exposant."
  },
  {
    category: "integrales",
    question: raw`Que vaut \(\int_a^b f(x)\,dx\) si \(F\) est une primitive de \(f\) ?`,
    answers: [raw`\(F(b)-F(a)\)`, raw`\(F(a)-F(b)\)`, raw`\(f(b)-f(a)\)`, raw`\(F(a)+F(b)\)`],
    correct: 0,
    explanation: "C'est le théorème fondamental utilisé dans le cours."
  },
  {
    category: "primitives",
    question: raw`Pourquoi ajoute-t-on \(+C\) dans une primitive ?`,
    answers: [
      "Parce que plusieurs primitives diffèrent d'une constante.",
      "Parce qu'une intégrale définie doit toujours avoir une constante.",
      "Parce que C représente une borne.",
      "Parce que la dérivée de C vaut 1."
    ],
    correct: 0,
    explanation: "La dérivée d'une constante est nulle."
  },
  {
    category: "ipp",
    question: raw`Quelle méthode utiliser pour \(\int x e^x\,dx\) ?`,
    answers: ["Intégration par parties", "Linéarisation", "Décomposition en éléments simples", "Aucune méthode, primitive directe"],
    correct: 0,
    explanation: "Le produit d'un polynôme par une exponentielle se traite souvent par IPP."
  },
  {
    category: "trigonometrie",
    question: raw`Quelle identité utiliser pour intégrer \(\sin^2(x)\) ?`,
    answers: [
      raw`\(\sin^2(x)=\frac{1-\cos(2x)}{2}\)`,
      raw`\(\sin^2(x)=\frac{1+\cos(2x)}{2}\)`,
      raw`\(\sin^2(x)=1+\cos^2(x)\)`,
      raw`\(\sin^2(x)=\cos(2x)\)`
    ],
    correct: 0,
    explanation: "Cette linéarisation transforme la puissance en somme."
  },
  {
    category: "fractions",
    question: raw`Quelle est la forme à reconnaître dans \(\int \frac{u'}{u}\,dx\) ?`,
    answers: [raw`\(\ln|u|+C\)`, raw`\(e^u+C\)`, raw`\(\arctan(u)+C\)`, raw`\(\frac{u^2}{2}+C\)`],
    correct: 0,
    explanation: "C'est la formule clé des logarithmes composés."
  },
  {
    category: "cv",
    question: raw`Dans une intégrale définie avec changement de variable, que faut-il modifier ?`,
    answers: ["Les bornes et le différentiel", "Uniquement le nom de la variable", "Uniquement le résultat final", "Rien si la fonction est continue"],
    correct: 0,
    explanation: "Les nouvelles bornes doivent correspondre à la nouvelle variable."
  },
  {
    category: "integrales",
    question: raw`Si \(f(x)\ge 0\) sur \([a,b]\), que représente \(\int_a^b f(x)\,dx\) graphiquement ?`,
    answers: ["L'aire sous la courbe", "La pente de la courbe", "La dérivée moyenne", "Le maximum de f"],
    correct: 0,
    explanation: "C'est l'interprétation géométrique de l'intégrale positive."
  },
  {
    category: "fractions",
    question: raw`Pourquoi décomposer \(\frac{1}{(x+1)(x+2)}\) en éléments simples ?`,
    answers: ["Pour obtenir des logarithmes faciles à intégrer", "Pour supprimer le \(+C\)", "Pour éviter les bornes", "Pour transformer en sinus"],
    correct: 0,
    explanation: "Chaque terme en \(1/(x+a)\) s'intègre avec un logarithme."
  },
  {
    category: "ipp",
    question: raw`Dans une IPP pour \(\int \ln(x)\,dx\), quel choix est naturel ?`,
    answers: [raw`\(u=\ln x,\ v'=1\)`, raw`\(u=e^x,\ v'=\ln x\)`, raw`\(u=1/x,\ v'=x\)`, raw`\(u=\cos x,\ v'=\ln x\)`],
    correct: 0,
    explanation: "On fait apparaître le facteur 1, puis on dérive ln(x)."
  },
  {
    category: "primitives",
    question: raw`Quelle est la primitive de \(\frac{1}{1+x^2}\) ?`,
    answers: [raw`\(\arctan(x)+C\)`, raw`\(\ln|x|+C\)`, raw`\(\frac{x^3}{3}+C\)`, raw`\(\tan(x)+C\)`],
    correct: 0,
    explanation: "C'est une formule usuelle à connaître."
  }
];

let progress = loadProgress();
let formulaFilter = "Toutes";
let quizState = { score: 0, total: 0, current: null, locked: false, timer: null, remaining: 20 };
let flashMode = "formula";
let flashCards = [];
let flashIndex = 0;
let flashBack = false;
let examState = { items: [], timer: null, remaining: 30 * 60 };

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(STORE_KEY, JSON.stringify(progress));
}

function typeset() {
  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetPromise().catch(() => {});
  }
}

function normalizeText(value) {
  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function initMenu() {
  const menuButton = $(".menu-btn");
  const nav = $(".nav");
  menuButton?.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  nav?.addEventListener("click", (event) => {
    if (event.target.matches("a")) document.body.classList.remove("menu-open");
  });

  const sections = $$("main section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$(".nav a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-34% 0px -58% 0px", threshold: 0.01 });
  sections.forEach((section) => observer.observe(section));
}

function initFormulas() {
  const categories = ["Toutes", ...new Set(formulas.map((item) => item.category))];
  const filterBox = $("#formulaFilters");
  filterBox.innerHTML = categories.map((category) => `
    <button class="filter-chip ${category === formulaFilter ? "active" : ""}" type="button" data-formula-filter="${category}">
      ${category}
    </button>
  `).join("");

  filterBox.addEventListener("click", (event) => {
    const button = event.target.closest("[data-formula-filter]");
    if (!button) return;
    formulaFilter = button.dataset.formulaFilter;
    $$(".filter-chip", filterBox).forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.formulaFilter === formulaFilter);
    });
    renderFormulas();
  });

  $("#formulaSearch").addEventListener("input", renderFormulas);
  renderFormulas();
}

function renderFormulas() {
  const query = normalizeText($("#formulaSearch").value || "");
  const filtered = formulas.filter((item) => {
    const matchesCategory = formulaFilter === "Toutes" || item.category === formulaFilter;
    const haystack = normalizeText(`${item.category} ${item.label} ${item.latex} ${item.note}`);
    return matchesCategory && haystack.includes(query);
  });

  $("#formulaTable").innerHTML = filtered.length ? filtered.map((item) => `
    <article class="formula-row">
      <span class="category">${item.category}</span>
      <h3>${item.label}</h3>
      <div class="latex">${item.latex}</div>
      <p>${item.note}</p>
    </article>
  `).join("") : `<p class="empty">Aucune formule ne correspond à ta recherche.</p>`;
  typeset();
}

function initExercises() {
  const levelSelect = $("#exerciseLevel");
  const counts = Object.fromEntries(Object.keys(levels).map((level) => [
    level,
    exercises.filter((exercise) => exercise.level === Number(level)).length
  ]));

  levelSelect.innerHTML = `<option value="all">Tous les niveaux (${exercises.length})</option>` +
    Object.entries(levels).map(([level, label]) => `<option value="${level}">${label} (${counts[level]})</option>`).join("");

  levelSelect.addEventListener("change", renderExercises);
  $("#exerciseSearch").addEventListener("input", renderExercises);
  $("#resetProgress").addEventListener("click", () => {
    progress = {};
    saveProgress();
    renderExercises();
    updateProgressUi();
  });

  $("#exerciseList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const id = button.dataset.id;
    const action = button.dataset.action;
    if (action === "hint" || action === "correction") {
      $(`#${id}-${action}`).classList.toggle("show");
      return;
    }
    if (action === "done" || action === "redo") {
      progress[id] = action;
      saveProgress();
      renderExercises();
      updateProgressUi();
    }
  });

  renderExercises();
  updateProgressUi();
}

function renderExercises() {
  const selectedLevel = $("#exerciseLevel").value;
  const query = normalizeText($("#exerciseSearch").value || "");
  const filtered = exercises.filter((exercise) => {
    const matchesLevel = selectedLevel === "all" || exercise.level === Number(selectedLevel);
    const haystack = normalizeText(`${exercise.title} ${exercise.statement} ${exercise.hint} ${exercise.weakPoint}`);
    return matchesLevel && haystack.includes(query);
  });

  $("#exerciseList").innerHTML = filtered.map((exercise) => renderExerciseCard(exercise)).join("");
  updateProgressUi();
  typeset();
}

function renderExerciseCard(exercise) {
  const status = progress[exercise.id] || "";
  const statusClass = status ? `status-${status}` : "";
  const statusLabel = status === "done" ? "Réussi" : status === "redo" ? "À refaire" : "Non traité";
  return `
    <article class="exercise-card ${statusClass}">
      <header>
        <div>
          <span class="card-tag">${levels[exercise.level]}</span>
          <h3>${exercise.title}</h3>
          <div class="statement">${exercise.statement}</div>
        </div>
        <span class="difficulty">${statusLabel}</span>
      </header>
      <div class="exercise-actions">
        <button class="btn" type="button" data-action="hint" data-id="${exercise.id}">Afficher un indice</button>
        <button class="btn" type="button" data-action="correction" data-id="${exercise.id}">Afficher la correction</button>
        <button class="btn success" type="button" data-action="done" data-id="${exercise.id}">J'ai réussi</button>
        <button class="btn danger" type="button" data-action="redo" data-id="${exercise.id}">Je dois refaire</button>
      </div>
      <div id="${exercise.id}-hint" class="hint"><strong>Indice :</strong> ${exercise.hint}</div>
      <div id="${exercise.id}-correction" class="correction">
        <strong>Correction détaillée :</strong>
        <ol>${exercise.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      </div>
    </article>
  `;
}

function updateProgressUi() {
  const done = exercises.filter((exercise) => progress[exercise.id] === "done").length;
  const redo = exercises.filter((exercise) => progress[exercise.id] === "redo").length;
  const percent = Math.round((done / exercises.length) * 100);
  $("#exerciseDone").textContent = done;
  $("#exerciseRedo").textContent = redo;
  $("#exerciseTotal").textContent = exercises.length;
  $("#globalProgressLabel").textContent = `${percent}%`;
  $("#globalProgressBar").style.width = `${percent}%`;
}

function initQuiz() {
  const categories = ["toutes", ...new Set(quizQuestions.map((question) => question.category))];
  $("#quizCategory").innerHTML = categories.map((category) => `
    <option value="${category}">${category === "toutes" ? "Toutes les catégories" : category}</option>
  `).join("");
  $("#startQuiz").addEventListener("click", nextQuizQuestion);
  $("#timerToggle").addEventListener("change", () => {
    stopQuizTimer();
    $("#quizTimer").textContent = "";
  });
  $("#quizAnswers").addEventListener("click", (event) => {
    const button = event.target.closest("[data-answer]");
    if (!button || quizState.locked) return;
    validateQuizAnswer(Number(button.dataset.answer));
  });
  updateQuizScore();
}

function nextQuizQuestion() {
  stopQuizTimer();
  const selected = $("#quizCategory").value;
  const pool = quizQuestions.filter((question) => selected === "toutes" || question.category === selected);
  quizState.current = pool[Math.floor(Math.random() * pool.length)];
  quizState.locked = false;
  $("#quizQuestion").innerHTML = quizState.current.question;
  $("#quizFeedback").textContent = "";
  $("#quizFeedback").className = "feedback";
  const shuffledAnswers = shuffle(quizState.current.answers.map((answer, index) => ({ answer, index })));
  $("#quizAnswers").innerHTML = shuffledAnswers.map(({ answer, index }) => `
    <button class="answer-btn" type="button" data-answer="${index}">${answer}</button>
  `).join("");
  if ($("#timerToggle").checked) startQuizTimer();
  typeset();
}

function validateQuizAnswer(answerIndex) {
  quizState.locked = true;
  quizState.total += 1;
  const correct = answerIndex === quizState.current.correct;
  if (correct) quizState.score += 1;
  $$(".answer-btn").forEach((button) => {
    const index = Number(button.dataset.answer);
    button.classList.toggle("correct", index === quizState.current.correct);
    button.classList.toggle("wrong", index === answerIndex && !correct);
  });
  $("#quizFeedback").textContent = `${correct ? "Bonne réponse." : "À revoir."} ${quizState.current.explanation}`;
  $("#quizFeedback").classList.toggle("ok", correct);
  updateQuizScore();
  stopQuizTimer();
}

function updateQuizScore() {
  $("#quizScore").textContent = `Score : ${quizState.score}/${quizState.total}`;
}

function startQuizTimer() {
  quizState.remaining = 20;
  $("#quizTimer").textContent = "20s";
  quizState.timer = window.setInterval(() => {
    quizState.remaining -= 1;
    $("#quizTimer").textContent = `${quizState.remaining}s`;
    if (quizState.remaining <= 0) {
      stopQuizTimer();
      if (!quizState.locked) validateQuizAnswer(-1);
    }
  }, 1000);
}

function stopQuizTimer() {
  if (quizState.timer) window.clearInterval(quizState.timer);
  quizState.timer = null;
}

function initFlashcards() {
  $("#flashcard").addEventListener("click", () => {
    flashBack = !flashBack;
    renderFlashcard();
  });
  $("#nextCard").addEventListener("click", () => moveFlashcard(1));
  $("#prevCard").addEventListener("click", () => moveFlashcard(-1));
  $("#shuffleCards").addEventListener("click", () => {
    flashCards = shuffle(flashCards);
    flashIndex = 0;
    flashBack = false;
    renderFlashcard();
  });
  $("#formulaMode").addEventListener("click", () => setFlashMode("formula"));
  $("#quickMode").addEventListener("click", () => setFlashMode("quick"));
  buildFlashcards();
}

function setFlashMode(mode) {
  flashMode = mode;
  $("#formulaMode").classList.toggle("active", mode === "formula");
  $("#quickMode").classList.toggle("active", mode === "quick");
  buildFlashcards();
}

function buildFlashcards() {
  if (flashMode === "formula") {
    flashCards = formulas.map((item) => ({
      front: `<span class="card-tag">${item.category}</span><br>${item.label}`,
      back: `${item.latex}<p>${item.note}</p>`
    }));
  } else {
    flashCards = shuffle(exercises).slice(0, 40).map((exercise) => ({
      front: `<span class="card-tag">${levels[exercise.level]}</span><br>${exercise.statement}`,
      back: `<strong>${exercise.title}</strong><ol>${exercise.steps.map((step) => `<li>${step}</li>`).join("")}</ol>`
    }));
  }
  flashIndex = 0;
  flashBack = false;
  renderFlashcard();
}

function moveFlashcard(direction) {
  if (!flashCards.length) return;
  flashIndex = (flashIndex + direction + flashCards.length) % flashCards.length;
  flashBack = false;
  renderFlashcard();
}

function renderFlashcard() {
  const card = flashCards[flashIndex];
  $("#flashcard").classList.toggle("back", flashBack);
  $("#flashFace").innerHTML = card ? (flashBack ? card.back : card.front) : "Aucune carte disponible.";
  $("#cardCounter").textContent = card ? `${flashIndex + 1}/${flashCards.length}` : "0/0";
  typeset();
}

function initExamMode() {
  $("#startExam").addEventListener("click", startExam);
  $("#submitExam").addEventListener("click", submitExam);
  renderExamClock();
}

function startExam() {
  examState.items = shuffle(exercises).slice(0, 10);
  examState.remaining = 30 * 60;
  $("#examResult").classList.remove("show");
  $("#examResult").innerHTML = "";
  $("#examList").innerHTML = examState.items.map((exercise, index) => `
    <article class="exam-item">
      <label>
        <input type="checkbox" data-exam-check="${exercise.id}">
        <span><strong>Exercice ${index + 1}.</strong> ${exercise.statement}</span>
      </label>
    </article>
  `).join("");
  startExamTimer();
  typeset();
}

function startExamTimer() {
  if (examState.timer) window.clearInterval(examState.timer);
  renderExamClock();
  examState.timer = window.setInterval(() => {
    examState.remaining -= 1;
    renderExamClock();
    if (examState.remaining <= 0) {
      window.clearInterval(examState.timer);
      examState.timer = null;
      submitExam();
    }
  }, 1000);
}

function renderExamClock() {
  const minutes = Math.max(0, Math.floor(examState.remaining / 60)).toString().padStart(2, "0");
  const seconds = Math.max(0, examState.remaining % 60).toString().padStart(2, "0");
  $("#examClock").textContent = `${minutes}:${seconds}`;
}

function submitExam() {
  if (!examState.items.length) {
    $("#examResult").classList.add("show");
    $("#examResult").innerHTML = "Génère d'abord une série de 10 exercices.";
    return;
  }
  if (examState.timer) window.clearInterval(examState.timer);
  examState.timer = null;
  const checkedIds = new Set($$("[data-exam-check]:checked").map((input) => input.dataset.examCheck));
  const score = checkedIds.size;
  const weakPoints = examState.items
    .filter((exercise) => !checkedIds.has(exercise.id))
    .map((exercise) => exercise.weakPoint);
  const uniqueWeakPoints = [...new Set(weakPoints)];
  $("#examResult").classList.add("show");
  $("#examResult").innerHTML = `
    <h3>Score estimé : ${score}/10</h3>
    <p>Le score est basé sur les exercices que tu as cochés comme réussis. Utilise la correction pour vérifier honnêtement.</p>
    <h4>Points faibles à retravailler</h4>
    <p>${uniqueWeakPoints.length ? uniqueWeakPoints.join(", ") : "Aucun point faible identifié sur cette série."}</p>
    <h4>Correction de la série</h4>
    ${examState.items.map((exercise, index) => `
      <div class="exam-correction">
        <strong>${index + 1}. ${exercise.title}</strong>
        <ol>${exercise.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      </div>
    `).join("")}
  `;
  typeset();
}

function verifyExerciseCounts() {
  const expected = { 1: 20, 2: 20, 3: 15, 4: 15, 5: 15, 6: 15, 7: 15 };
  Object.entries(expected).forEach(([level, count]) => {
    const actual = exercises.filter((exercise) => exercise.level === Number(level)).length;
    if (actual !== count) {
      console.warn(`Niveau ${level}: attendu ${count}, obtenu ${actual}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  verifyExerciseCounts();
  initMenu();
  initFormulas();
  initExercises();
  initQuiz();
  initFlashcards();
  initExamMode();
  setTimeout(typeset, 250);
});
