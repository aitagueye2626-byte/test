

let utilisateurConnecte = null;

function seConnecter() {

  const emailSaisi      = document.getElementById("email").value.trim().toLowerCase();
  const motdepasseSaisi = document.getElementById("motdepasse").value.trim();

  const zoneErreur = document.getElementById("messageErreur");

  zoneErreur.style.display = "none";
  zoneErreur.textContent   = "";

  if (emailSaisi === "" || motdepasseSaisi === "") {
    zoneErreur.style.display = "block";
    zoneErreur.textContent   = "❌ Veuillez remplir tous les champs.";
    return;
  }

  const utilisateurs = donneesJSON.utilisateurs;
  
  let utilisateurAvecEmail = null;
  for (let i = 0; i < utilisateurs.length; i++) {
    if (utilisateurs[i].email.toLowerCase() === emailSaisi) {
      utilisateurAvecEmail = utilisateurs[i];
      break;
    }
  }

  if (utilisateurAvecEmail === null) {
    zoneErreur.style.display = "block";
    zoneErreur.textContent   = "❌ Aucun compte trouvé avec cette adresse e-mail. Voulez-vous vous inscrire ?";
    return;
  }

  if (utilisateurAvecEmail.motdepasse.trim() !== motdepasseSaisi) {
    zoneErreur.style.display = "block";
    zoneErreur.textContent   = "❌ Mot de passe incorrect.";
    return;
  }

  // Connexion réussie
  utilisateurConnecte = utilisateurAvecEmail;

  document.getElementById("pageConnexion").classList.add("cache");

  if (utilisateurAvecEmail.role === "admin") {
    document.getElementById("dashboardAdmin").classList.remove("cache");
    document.getElementById("nomUtilisateurAdmin").textContent = utilisateurAvecEmail.nom;
    remplirDashboardAdmin(donneesJSON.transactions);
  } else if (utilisateurAvecEmail.role === "client") {
    document.getElementById("dashboardClient").classList.remove("cache");
    remplirDashboardClient(utilisateurAvecEmail.nom);
  } else if (utilisateurAvecEmail.role === "mareyeur") {
    document.getElementById("dashboardClient").classList.remove("cache");
    remplirDashboardClient(utilisateurAvecEmail.nom);
  }
}


function seDeconnecter() {
  document.getElementById("email").value      = "";
  document.getElementById("motdepasse").value = "";
  document.getElementById("dashboardAdmin").classList.add("cache");
  document.getElementById("dashboardClient").classList.add("cache");
  document.getElementById("pageConnexion").classList.remove("cache");
  utilisateurConnecte = null;
}


function afficherInscription() {
  document.getElementById("formuConnexion").classList.add("cache");
  document.getElementById("formuInscription").classList.remove("cache");
}


function afficherConnexion() {
  document.getElementById("formuInscription").classList.add("cache");
  document.getElementById("formuConnexion").classList.remove("cache");
  document.getElementById("messageErreur").style.display = "none";
  document.getElementById("messageErreurInscription").style.display = "none";
}


function sInscrire() {
  const nom            = document.getElementById("nomInscription").value.trim();
  const email          = document.getElementById("emailInscription").value.trim().toLowerCase();
  const motdepasse     = document.getElementById("motdepasseInscription").value.trim();
  const confirmerMdp   = document.getElementById("confirmerMotdepasse").value.trim();
  const role           = document.getElementById("roleInscription").value;

  const zoneErreur = document.getElementById("messageErreurInscription");
  zoneErreur.style.display = "none";
  zoneErreur.textContent   = "";

  if (nom === "" || email === "" || motdepasse === "" || confirmerMdp === "") {
    zoneErreur.style.display = "block";
    zoneErreur.textContent   = "❌ Veuillez remplir tous les champs.";
    return;
  }

  if (motdepasse !== confirmerMdp) {
    zoneErreur.style.display = "block";
    zoneErreur.textContent   = "❌ Les mots de passe ne correspondent pas.";
    return;
  }

  if (motdepasse.length < 4) {
    zoneErreur.style.display = "block";
    zoneErreur.textContent   = "❌ Le mot de passe doit faire au moins 4 caractères.";
    return;
  }

  const emailExiste = donneesJSON.utilisateurs.some(u => u.email.toLowerCase() === email);
  if (emailExiste) {
    zoneErreur.style.display = "block";
    zoneErreur.textContent   = "❌ Cet email est déjà utilisé.";
    return;
  }

  donneesJSON.utilisateurs.push({
    email: email,
    motdepasse: motdepasse,
    nom: nom,
    role: role
  });

  console.log("✅ Compte créé:", { email, nom, role });
  console.log("Tous les utilisateurs:", donneesJSON.utilisateurs);

  alert(`✅ Compte créé avec succès en tant que ${role === "client" ? "Client" : "Mareyeur"} ! Vous pouvez maintenant vous connecter.`);
  
  document.getElementById("nomInscription").value = "";
  document.getElementById("emailInscription").value = "";
  document.getElementById("motdepasseInscription").value = "";
  document.getElementById("confirmerMotdepasse").value = "";
  document.getElementById("roleInscription").value = "client";
  afficherConnexion();
}