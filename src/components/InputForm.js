import './InputForm.css'
import { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert';


function InputForm() {
  const [gender, setGender] = useState('')
  const [bachelors, setBachelors] = useState('')
  const [workex, setWorkex] = useState('')
  const [test, setTest] = useState('')
  const [masters, setMasters] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = { gender, bachelors, workex, test, masters }

    axios
      .post('http://localhost:8080/prediction', params)
      .then((res) => {
        const data = res.data.data
        const parameters = JSON.stringify(params)
        const output1 = `Prediction: ${data.interpretation}`
        const output2 = `Result: ${data.prediction}\nParameters: ${parameters}`
        if (data.prediction === 1) {
          swal(output1, output2, "success")
        } else {
          swal(output1, output2, "error")
        }
        reset()
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }

  const reset = () => {
    setGender('')
    setBachelors('')
    setWorkex('')
    setTest('')
    setMasters('')
  }

  return (
    <div className="glass">
      <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
        <h4>Candidate Data</h4>
        <div className="glass__form__group">
          <input
            id="gender"
            className="glass__form__input"
            placeholder="Gender (0 = Female or 1 = Male)"
            required
            autoFocus
            min="0"
            max="1"
            pattern="[0-9]{0,1}"
            title="Gender must either be (0 = Female or 1 = Male)"
            type="number"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="bachelors"
            className="glass__form__input"
            placeholder="Bachelor's Cumulative GPA (0.00 - 5.00)"
            required
            min="0"
            max="5"
            type="number"
            title="Bachelor's Cumulative GPA must be in the range (1.00 - 5.00)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={bachelors}
            onChange={(e) => setBachelors(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="workex"
            className="glass__form__input"
            placeholder="Work Experience (0 = No Experience or 1 = Have Experience)"
            required
            min="0"
            max="1"
            type="number"
            title="Work Experience must either be (0 = No Experience or 1 = Have Experience)"
            value={workex}
            onChange={(e) => setWorkex(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="test"
            className="glass__form__input"
            placeholder="Test Score (0.00 - 100.00)"
            required
            min="0"
            max="100"
            type="number"
            title="Test score must be in the range (1.00 - 100)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={test}
            onChange={(e) => setTest(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="masters"
            className="glass__form__input"
            placeholder="Master's Cumulative GPA (0.00 - 5.00)"
            required
            min="0"
            max="5"
            type="number"
            title="Master's Cumulative GPA must be in the range (1.00 - 5.00)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={masters}
            onChange={(e) => setMasters(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <button type="submit" className="glass__form__btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputForm