import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        ajouterUtilisateur: (state, action) => {
            // { type: user/ajouterUtilisateur, payload: id, pseudo }
            //      ==> en fait, le nom du type sera égal au nom du slice, slash, le nom de la fonction à exécuter
            const nouvelUtilisateur = {
                id: action.payload.id,
                pseudo: action.payload.pseudo
            }
            state.push(nouvelUtilisateur);
        },
        // modifierUtilisateur: (state, action) => {
        //     const utilisateur = state.find(util => util.id === action.payload.id);
        //     utilisateur.nom = action.payload.nom;
        // },
        // supprimerUtilisateur: (state, action) => {
        //     state = state.filter(utilisateur => utilisateur.id !== action.payload);
        // }
    }
});

export const {ajouterUtilisateur} = userSlice.actions

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
})
