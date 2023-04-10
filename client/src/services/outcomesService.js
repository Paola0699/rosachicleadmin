import firebase from '../firebaseElements/firebase'
import Swal from 'sweetalert2'
const db = firebase.firestore();

export const postNewOutcome = async (outcomeData, outcomeIMG) => {
    const { KIND, OUTCOME_KIND, CONCEPT, QUANTITY, DATE, DESCRIPTION, PAYMENT_METHOD} = outcomeData;
    let storageRef = firebase.storage().ref();
    const ticketImg = storageRef.child(`outcomes/${Date.now()}.webp`);

    await ticketImg.put(outcomeIMG.current.files[0]);
    const downloadURL = await ticketImg.getDownloadURL();
    const newOutcome = {
      kind: KIND,
      concept: CONCEPT,
      quantity: Number(QUANTITY),
      date: toDate(DATE, 12, 0, 0),
      description: DESCRIPTION,
      paymethod: PAYMENT_METHOD,
      ticketImg: downloadURL,
      status: "Pendiente",
    };
    if (KIND ==='Gasto') newOutcome.outcomeKind = OUTCOME_KIND;
    db.collection("outcomes")
      .add(newOutcome)
      .then(() => {
        Swal.fire(
          "Registrado!",
          "El movimiento se registro con exito",
          "success"
        );
      })
      .catch((error) =>
        Swal.fire("Error!", `Ocurrio un error: ${error}`, "warning")
      );
    };

  const toDate = (text, h, m, s) => {
    const dataAux = text.split("-");
    const temDate = new Date(
      Number(dataAux[0]),
      Number(dataAux[1]) - 1,
      Number(dataAux[2]),
      h,
      m,
      s
    );
    return firebase.firestore.Timestamp.fromDate(temDate);
  };