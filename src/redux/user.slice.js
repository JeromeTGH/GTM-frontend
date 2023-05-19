import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: [{
        id: '',
        pseudo: ''
    }],
    reducers: {
        enregistrerInfosUtilisateur: (state, action) => {
            const utilisateur = state[0];
            utilisateur.id = action.payload.id;
            utilisateur.pseudo = action.payload.pseudo;
        },
        effacerInfosUtilisateur: (state, action) => {
            const utilisateur = state[0];
            utilisateur.id = '';
            utilisateur.pseudo = '';
        }
        // ajouterUtilisateur: (state, action) => {
        //     const nouvelUtilisateur = {
        //         id: action.payload.id,
        //         pseudo: action.payload.pseudo
        //     }
        //     state.push(nouvelUtilisateur);
        // },
        // modifierUtilisateur: (state, action) => {
        //     const utilisateur = state.find(util => util.id === action.payload.id);
        //     utilisateur.nom = action.payload.nom;
        // },
        // supprimerUtilisateur: (state, action) => {
        //     state = state.filter(utilisateur => utilisateur.id !== action.payload);
        // }
    }
});

export const {enregistrerInfosUtilisateur, effacerInfosUtilisateur} = userSlice.actions