

function remplirDashboardAdmin(transactions) {

  document.getElementById("corpsTableauAdmin").innerHTML = "";

  let totalQte     = 0;
  let totalMontant = 0;

  for (let i = 0; i < transactions.length; i++) {

    const t       = transactions[i];
    const montant = t.quantite * t.prix;

    totalQte     += t.quantite;
    totalMontant += montant;

    const ligne = `<tr>
      <td>${t.client}</td>
      <td>${t.date}</td>
      <td>${t.produit}</td>
      <td>${t.quantite} kg</td>
      <td>${t.prix.toLocaleString()} FCFA</td>
      <td>${montant.toLocaleString()} FCFA</td>
    </tr>`;

    document.getElementById("corpsTableauAdmin").innerHTML += ligne;
  }

  document.getElementById("nbLignesAdmin").textContent     = transactions.length;
  document.getElementById("totalQteAdmin").textContent     = totalQte;
  document.getElementById("totalMontantAdmin").textContent = totalMontant.toLocaleString();
  document.getElementById("topProduitAdmin").textContent   = trouverTopProduit(transactions);

  document.getElementById("totalTransactionsAdmin").textContent = transactions.length;
  document.getElementById("totalGeneralAdmin").textContent      = totalMontant.toLocaleString();
}


function trouverTopProduit(transactions) {

  const totaux = {};

  for (let i = 0; i < transactions.length; i++) {
    const nom = transactions[i].produit;
    if (totaux[nom] === undefined) {
      totaux[nom] = 0;
    }
    totaux[nom] += transactions[i].quantite;
  }

  let meilleurNom = "";
  let meilleureQte = 0;
  const noms = Object.keys(totaux);

  for (let i = 0; i < noms.length; i++) {
    if (totaux[noms[i]] > meilleureQte) {
      meilleureQte = totaux[noms[i]];
      meilleurNom  = noms[i];
    }
  }

  return meilleurNom;
}
// Afficher la page de connexion
document.getElementById("app").innerHTML = getConnexionPage();

// Afficher le dashboard admin
document.getElementById("app").innerHTML = getAdminPage();

// Afficher le dashboard client
document.getElementById("app").innerHTML = getClientPage();