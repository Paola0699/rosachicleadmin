import Navbar from "./common/navbar"
import Breadcrum from "./common/breadcrum"
import CurrencyFormat from 'react-currency-format';
import { useEffect, useState } from "react";
import firebase from '../firebaseElements/firebase'

const db = firebase.firestore();

function Balance() {
    const [startDate, setStartDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [generalOutcom, setGeneralOutcome] = useState(0);
    const [operativeOutcome, setOperativeOutcome] = useState(0);
    const [administrativeOutcome, setAdministrativeOutcome] = useState(0);
    const [totalOutcome, setTotalOutcome] = useState(0);
    const [otherIncomes, setOtherIncomes] = useState(0);
    const [salesByCategory, setSalesByCategory] = useState([])
    const [generalSales, setGeneralSales] = useState(0)
    const [sumOfIncomes, setSumOfIncomes] = useState(0)
    const [defaultDate, setDefaultDate] =useState();

    useEffect(()=>{
        const today = new Date()
        let month = today.getMonth()+1 <= 9 ?  `0${today.getMonth()+1}` :today.getMonth()+1
        let day = today.getDate() <= 9 ?  `0${today.getDate()}` : today.getDate()
        let customDate = `${today.getFullYear()}-${month}-${day}`


        console.log(customDate)
        setDefaultDate(customDate)
        setStartDate(customDate)
        setFinalDate(customDate)
        
    },[])

    useEffect(() => {
        getAllData()
        console.log('effect')
    }, [startDate, finalDate])

    const getAllData = async () => {
        if (startDate && finalDate) {
            const querySnapshot = await db.collection("outcomes")
                .where('date', '>', toDate(startDate, 0, 0, 0))
                .where('date', '<=', toDate(finalDate, 23, 59, 59))
                .get()

            const allOutcomes = querySnapshot.docs.map(sale => {
                return {
                    id: sale.id,
                    ...sale.data()
                }
            })
            setGeneralOutcome(getTotal(allOutcomes.filter(outcome => {return outcome.outcomeKind === 'Gasto General' && outcome.status==='Autorizado'})))
            setOperativeOutcome(getTotal(allOutcomes.filter(outcome => {return outcome.outcomeKind === 'Gasto Operativo' && outcome.status==='Autorizado'})))
            setAdministrativeOutcome(getTotal(allOutcomes.filter(outcome => {return outcome.outcomeKind === 'Gasto Administrativo' && outcome.status==='Autorizado'})))
            const tempOtherIncomes = getTotal(allOutcomes.filter(outcome => outcome.kind === 'Ingreso'))
            setOtherIncomes(tempOtherIncomes)
            setTotalOutcome(getTotal(allOutcomes.filter(o=>o.kind==='Gasto')))

            const querySnapshot2 = await db.collection("orders")
                .where('date', '>', toDate(startDate, 0, 0, 0))
                .where('date', '<=', toDate(finalDate, 23, 59, 59))
                .get()

            const allIncomes = querySnapshot2.docs.map(sale => {
                return {
                    id: sale.id,
                    ...sale.data()
                }
            })

            const categoriesData = await db.collection("categories").get()
            const allCategories = categoriesData.docs.map(cat => {
                return {
                    id: cat.id,
                    ...cat.data()
                }
            })
            const externCategories = allCategories.filter(c => c.extern === true)

            const [totalGeneralSales, externTotals, totalIncomes] = totalGeneralSalesAndTotalSalesByCategory(allIncomes, externCategories)
            setGeneralSales(totalGeneralSales)
            setSalesByCategory(externTotals)
            setSumOfIncomes(totalIncomes+tempOtherIncomes)
        }
    }
    const getTotal = filteredOutcome => {
        const reducer = (accumulator, outcome) => accumulator + (outcome.quantity);
        return filteredOutcome.reduce(reducer, 0)
    }
    const totalGeneralSalesAndTotalSalesByCategory = (allIncomes, externCategories) => {

        let allProducts = []
        allIncomes.forEach(order => {
            order.products.forEach(product => {
                if (!externCategories.some(cat => cat.name === product.category))
                    allProducts.push(product)
                else {
                    const i = externCategories.map(c => c.name).findIndex(c => c === product.category)
                    externCategories[i].productsSold ? externCategories[i].productsSold.push(product) : externCategories[i].productsSold = [product]
                }
            })
        });

        const reducer = (accumulator, product) => accumulator + (product.quantity * product.price);

        externCategories.forEach(c => {
            if (c.productsSold)
                c.total = c.productsSold.reduce(reducer, 0)
            else
                c.total = 0
        })

        const salesNotExtern = allProducts.reduce(reducer, 0)
        const getSumOfTotals = (accumulator, category) => accumulator + category.total;
        const totalIncomes = salesNotExtern + externCategories.reduce(getSumOfTotals,0)

        return [salesNotExtern, externCategories, totalIncomes]
    }

    const toDate = (text, h, m, s) => {
        const dataAux = text.split('-')
        const temDate = new Date(Number(dataAux[0]), Number(dataAux[1]) - 1, Number(dataAux[2]), h, m, s)
        return firebase.firestore.Timestamp.fromDate(temDate)
    }
    return (
        <div>
            <Navbar />
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Balance General </h1>
                        <h2 class="subtitle">Consulta la relación entre gastos e ingresos.</h2>
                        <Breadcrum parent='Gastos e Ingresos' children='Balance General' />
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div className='columns'>
                        <div className='column is-6'>
                            <div class="field">
                                <label class="label">Fecha de inicio</label>
                                <div class="control">
                                    <input defaultValue={defaultDate}  onChange={e => setStartDate(e.target.value)} class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                        <div className='column is-6'>
                            <div class="field">
                                <label class="label">Fecha de Fin</label>
                                <div class="control">
                                    <input defaultValue={defaultDate}  onChange={e => setFinalDate(e.target.value)} class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='table-container'>
                        <table className='table' style={{ marginBottom: '2%', width: '100%' }}>
                            <tbody >
                                <tr style={{ textAlign: 'center' }}>
                                    <th colSpan='2' className='is-success'>GASTOS</th>
                                    <th colSpan='2' className='is-info'>INGRESOS</th>
                                </tr>
                                <tr>
                                    <th>Concepto</th>
                                    <th style={{ borderRight: '1px solid #dee2e6' }}>Monto</th>
                                    <th>Concepto</th>
                                    <th>Monto</th>
                                </tr>
                                <tr>
                                    <td>Gastos en General</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={generalOutcom}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>

                                    <td >Ventas en General</td>
                                    <td >
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={generalSales}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>


                                </tr>
                                <tr>
                                    <td>Gastos Operativos</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={operativeOutcome}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>

                                    {/* <td >Proteínas NA</td>
                                    <td >
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={120}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td> */}

                                </tr>
                                <tr>
                                    <td>Gastos Administrativos</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={administrativeOutcome}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>

                                    {/* <td >Polka Donuts</td>
                                    <td >
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={250}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td> */}
                                </tr>
                                {salesByCategory.map(c =>
                                    <tr>
                                        <td></td>
                                        <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        </td>
                                        <td > {c.name} </td>
                                        <td >
                                            <CurrencyFormat
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                                value={c.total}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                            />
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td></td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                    </td>

                                    <td >Otros Ingresos</td>
                                    <td >
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={otherIncomes}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>


                                </tr>

                                <tr style={{ fontWeight: '900', backgroundColor: '#e0e0e0' }}>
                                    <td >TOTAL GASTOS</td>
                                    <td> <CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={totalOutcome} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    <td >TOTAL INGRESOS</td>
                                    <td ><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={sumOfIncomes} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </td>
                                </tr>

                                <tr style={{ textAlign: 'center', backgroundColor: 'rgba(159, 214, 248, 0.1)' }}>
                                    <th colSpan='2'>Utilidad Neta (Ingresos - Gastos)</th>
                                    <th colSpan='2'>
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={sumOfIncomes-totalOutcome}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Balance;