// utilisation de mongoose 
const mongoose = require('mongoose')

// ajout du chemin de l'uri atlas
const uri = require('./MONGO_URI')

// connexion a la base de donnee
mongoose.connect(uri)
.then(()=>{
    console.log('connexion a la bade de donnee');
})
.catch(err => {
    console.log('erreur lors de la connexion a la database:', err);
    
})

// definition du modele de schema
let personSchema = new mongoose.Schema (
    {
        name: {type: String, required: true,},
        age: Number,
        favoriteFoods: [String]
    }
)

// // creation du modele

// let person = mongoose.model('person', personSchema)


// // creation de l'instance du model
// let personModel = new person  (
//     {
//         name: 'John Bissau',
//         age: 30,
//         favoriteFoods: ['Banane', 'Pizza'],
//     }
// )


// // sauvegarde du l'instance du model
// async function saveperson() {
//     try {
//     const data = await personModel.save();
//     console.log('Sauvegarde réussie:', data);
//     } catch (err) {
//         console.log('Erreur lors de la sauvegarde:', err);
//     }
// }

// saveperson();


// Création de nombreux enregistrements 

// creation du model
let Person = mongoose.model('Person', personSchema)

// enregistrement des donnees
let manyPersonData = [
    {
        name: 'Mana Beach',
        age: 20,
        favoriteFoods: ['Pizza'],
    },

    {
        name: 'Kone Kita',
        age: 10,
        favoriteFoods: ['Patate'],
    },

    {
        name: 'Traore Vamouss',
        age: 32,
        favoriteFoods: ['Spaghetti'],
    },

    {
        name: 'Konan',
        age: 9,
        favoriteFoods: ['Igname'],
    },
]

// sauvegarde des donnees
async function saveManyPerson() {
        try {
        const data = await Person.insertMany(manyPersonData);
        console.log('Sauvegarde réussie:', data);
        } catch (err) {
            console.log('Erreur lors de la sauvegarde:', err);
        }
    }
    
saveManyPerson();

// operation sur les donnees: la methode find() pour trouver les personnes par nom

// async function findPersonByName(personName) {
//     try{
//         const people = await Person.find({name: personName})
//         console.log(people);
        
//     } catch(error){
//         console.error('error lors de la recherche', error); 
//     } finally{
//         mongoose.connection.close();
//     }
// }

// findPersonByName('Konan')

// operation sur les donnees: findOne() 

// async function findPersonByFood(food) {
//     try{
//         const people = await Person.findOne({favoriteFoods: food})
//         console.log(people);
        
//     } catch(error){
//         console.error('error lors de la recherche', error); 
//     } finally{
//         mongoose.connection.close();
//     }
// }

// findPersonByFood('Pizza');

// operation sur les donnees : findById()

// async function findPersonById(personId) {
//         try{
//             const people = await Person.findById(personId)
//             console.log(people);
            
//         } catch(error){
//             console.error('error lors de la recherche', error); 
//         } finally{
//             mongoose.connection.close();
//         }
//     }
    
// findPersonById('66f2fab47e7c90f4d5954d48');



// operation sur les donnees : Effectuez des mises à jour classiques en exécutant Rechercher, Modifier, puis Enregistre


// async function updatePerson(personId) {
//     try {
//         const person = await Person.findById(personId);
//         // Ajoutez "hamburger" à la liste des aliments préférés
//         person.favoriteFoods.push("hamburger");

//         // Marquez le champ comme modifié si nécessaire
//         person.markModified('favoriteFoods');

//         // Sauvegardez la personne mise à jour
//         const updatedPerson = await person.save();
//         console.log('Personne mise à jour avec succès:', updatedPerson);

//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// }

// updatePerson('66f2fab47e7c90f4d5954d48');


// Effectuer de nouvelles mises à jour sur un document à l’aide de model.findOneAndUpdate()

// async function updatePerson(personName) {
//     try {
//         const person = await Person.findOneAndUpdate(

//             { name: personName }, // Clé de recherche

//             { age: 20 }, // Mise à jour

//             { new: true }, // Retourner le document mis à jour
//         )
    
//         const updatedPerson = await person.save()
//         console.log('Personne mise à jour avec succès:', updatedPerson);

//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//             mongoose.connection.close();
//         }
// }

// updatePerson('Kone Kita');


// Supprimer un document à l’aide de model.findByIdAndRemove


// async function removePerson(personId) {
//     try {
//         const person = await Person.findByIdAndDelete(personId);
//         console.log(person);

//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//             mongoose.connection.close();
//         }
// }

// removePerson('66f2fab47e7c90f4d5954d48');


// MongoDB et Mongoose - Supprimer de nombreux documents avec model.remove()


// async function removePer(personId) {
//         try {
//             const person = await Person.deleteMany({_id: personId});
//             console.log(person);
    
//             } catch (error) {
//                 console.error('Error:', error);
//             } finally {
//                 mongoose.connection.close();
//             }
//     }

//     removePer('66f2fab47e7c90f4d5954d48')


// Assistants de requête de recherche en chaîne pour affiner les résultats de recherche


async function removePer(personId) {
            try {

                const person = await Person.find({ favoriteFood: 'Patate' }) // Trouver les gens qui aiment les Patates
                .sort('name') // Trier par nom
                .limit(2) // Limiter les résultats à deux documents
                .select('-age') // Masquer leur âge

                console.log(person);
                

            } catch (error) {
                    console.error('Error:', error);
                } finally {
                    mongoose.connection.close();
                }
        }
    
        removePer();