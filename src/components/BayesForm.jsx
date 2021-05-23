import React, { useState } from "react";

import { toastr } from "react-redux-toastr";
import { FaSmile, FaSadCry } from "react-icons/fa";

import admApi from "../api/adm";
import CustomMenu from "./CustomMenu";
import CustomInput from "./CustomInput";
import { isNumber, minValue, required, maxValue } from "../helpers/validations";

const BayesForm = () => {
  const [age, setAge] = useState();
  const [chestPainType, setChestPainType] = useState("");
  const [restBloodPressure, setRestBloodPressure] = useState();
  const [bloodSugar, setBloodSugar] = useState("");
  const [restElectro, setRestElectro] = useState("");
  const [maxHeartRate, setMaxheartRate] = useState();
  const [exerciceAngina, setExerciceAngina] = useState("");
  const [ans, setAns] = useState(null);

  const [errors, setErrors] = useState({
    age: [],
    chestPainType: [],
    restBloodPressure: [],
    bloodSugar: [],
    restElectro: [],
    maxHeartRate: [],
    exerciceAngina: [],
  });

  const validate = () => {
    let ageErrors = [];
    if (required(age) !== undefined) ageErrors.push(required(age));
    if (isNumber(age) !== undefined) ageErrors.push(isNumber(age));
    if (minValue(age, 20) !== undefined) ageErrors.push(minValue(age, 20));
    if (maxValue(age, 200) !== undefined) ageErrors.push(maxValue(age, 200));

    let restBloodPressureErrors = [];
    if (required(restBloodPressure) !== undefined)
      restBloodPressureErrors.push(required(restBloodPressure));
    if (isNumber(restBloodPressure) !== undefined)
      restBloodPressureErrors.push(isNumber(restBloodPressure));
    if (minValue(restBloodPressure, 50) !== undefined)
      restBloodPressureErrors.push(minValue(restBloodPressure, 50));
    if (maxValue(restBloodPressure, 200) !== undefined)
      restBloodPressureErrors.push(maxValue(restBloodPressure, 200));

    let maxHeartRateErrors = [];
    if (required(maxHeartRate) !== undefined)
      maxHeartRateErrors.push(required(maxHeartRate));
    if (isNumber(maxHeartRate) !== undefined)
      maxHeartRateErrors.push(isNumber(maxHeartRate));
    if (minValue(maxHeartRate, 40) !== undefined)
      maxHeartRateErrors.push(minValue(maxHeartRate, 40));
    if (maxValue(maxHeartRate, 200) !== undefined)
      maxHeartRateErrors.push(maxValue(maxHeartRate, 200));

    let chestPainTypeErrors = [];
    if (required(chestPainType) !== undefined)
      chestPainTypeErrors.push(required(chestPainType));

    let bloodSugarErrors = [];
    if (required(bloodSugar) !== undefined)
      bloodSugarErrors.push(required(bloodSugar));

    let restElectroErrors = [];
    if (required(restElectro) !== undefined)
      restElectroErrors.push(required(restElectro));

    let exerciceAnginaErrors = [];
    if (required(exerciceAngina) !== undefined)
      exerciceAnginaErrors.push(required(exerciceAngina));

    const allErrors = {
      age: ageErrors,
      bloodSugar: bloodSugarErrors,
      maxHeartRate: maxHeartRateErrors,
      exerciceAngina: exerciceAnginaErrors,
      chestPainType: chestPainTypeErrors,
      restBloodPressure: restBloodPressureErrors,
      restElectro: restElectroErrors,
    };
    return allErrors;
  };
  const submit = async (e) => {
    e.preventDefault();
    const anyErrors = validate();
    if (
      anyErrors.age.length === 0 &&
      anyErrors.bloodSugar.length === 0 &&
      anyErrors.maxHeartRate.length === 0 &&
      anyErrors.exerciceAngina.length === 0 &&
      anyErrors.chestPainType.length === 0 &&
      anyErrors.restBloodPressure.length === 0 &&
      anyErrors.restElectro.length === 0
    ) {
      setErrors({
        age: [],
        chestPainType: [],
        restBloodPressure: [],
        bloodSugar: [],
        restElectro: [],
        maxHeartRate: [],
        exerciceAngina: [],
      });
      let formdata = new FormData();
      const query = {
        age: parseInt(age, 10),
        chest_pain_type: chestPainType,
        rest_blood_pressure: parseInt(restBloodPressure, 10),
        blood_sugar: bloodSugar === "true",
        rest_electro: restElectro,
        max_heart_rate: parseInt(maxHeartRate, 10),
        exercice_angina: exerciceAngina,
      };
      formdata.append("query", JSON.stringify(query));
      const res = await admApi.bayes(formdata);
      if (res.ok) {
        setAns(res.data.data);
      } else {
        toastr.error("error", res.problem);
      }
    } else setErrors(anyErrors);
  };

  const setDefault = () => {
    setAns(null);
    setAge("");
    setBloodSugar("");
    setChestPainType("");
    setExerciceAngina("");
    setRestBloodPressure("");
    setMaxheartRate("");
    setRestElectro("");
    setErrors({
      age: [],
      chestPainType: [],
      restBloodPressure: [],
      bloodSugar: [],
      restElectro: [],
      maxHeartRate: [],
      exerciceAngina: [],
    });
  };
  return (
    <div class="bg-grey-lighter  flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <div class="bg-secondary bg-opacity-50 px-6 py-8 rounded-3xl shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl font-extrabold text-center text-white">
            Bayes Classifire
          </h1>
          <form className="flex flex-col space-y-1">
            <CustomInput
              type="number"
              label="Age"
              name="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              errors={errors.age}
            />
            <CustomInput
              type="number"
              label="Rest Blood Pressure"
              name="restBloodPressure"
              value={restBloodPressure}
              onChange={(e) => {
                setRestBloodPressure(e.target.value);
              }}
              errors={errors.restBloodPressure}
            />
            <CustomInput
              type="number"
              label="Max Heart Rate"
              name="maxHeartRate"
              value={maxHeartRate}
              onChange={(e) => {
                setMaxheartRate(e.target.value);
              }}
              errors={errors.maxHeartRate}
            />
            <CustomMenu
              name="chestPainType"
              placeholder="Chest Pain Type"
              value={chestPainType}
              onChange={(e) => {
                setChestPainType(e.target.value);
              }}
              errors={errors.chestPainType}
            >
              <option value="asympt" className="text-black">
                asympt
              </option>
              <option value="atyp_angina" className="text-black">
                atyp_angina
              </option>
              <option value="non_anginal" className="text-black">
                non_anginal
              </option>
              <option value="typ_angina" className="text-black">
                typ_angina
              </option>
            </CustomMenu>
            <CustomMenu
              name="bloodSugar"
              placeholder="Blood Sugar"
              value={bloodSugar}
              onChange={(e) => {
                setBloodSugar(e.target.value);
              }}
              errors={errors.bloodSugar}
            >
              <option value={true} className="text-black">
                true
              </option>
              <option value={false} className="text-black">
                false
              </option>
            </CustomMenu>
            <CustomMenu
              name="restElectro"
              placeholder="Rest Electro"
              value={restElectro}
              onChange={(e) => {
                setRestElectro(e.target.value);
              }}
              errors={errors.restElectro}
            >
              <option value="normal" className="text-black">
                normal
              </option>
              <option value="left_vent_hyper" className="text-black">
                left_vent_hyper
              </option>
              <option value="st_t_wave_abnormality" className="text-black">
                st_t_wave_abnormality
              </option>
            </CustomMenu>

            <CustomMenu
              name="exerciceAngina"
              placeholder="Exercice Angina"
              value={exerciceAngina}
              onChange={(e) => {
                setExerciceAngina(e.target.value);
              }}
              errors={errors.exerciceAngina}
            >
              <option value="yes" className="text-black">
                yes
              </option>
              <option value="no" className="text-black">
                no
              </option>
            </CustomMenu>

            <button
              type="submit"
              disabled={ans ? true : false}
              className={`w-full text-center py-3 rounded bg-light text-white hover:bg-green-dark focus:outline-none my-1 ${
                ans ? "cursor-not-allowed" : "cursor-pointer"
              } `}
              onClick={(e) => submit(e)}
            >
              {ans ? (
                <span>
                  {ans === "positive" ? (
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <FaSadCry />
                      <div className="text-xl self-start">{ans}</div>
                      <FaSadCry />
                    </div>
                  ) : (
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <FaSmile />
                      <div>{ans}</div>
                      <FaSmile />
                    </div>
                  )}
                </span>
              ) : (
                <span>Submit</span>
              )}
            </button>
            {ans && (
              <button
                type="reset"
                className={`w-full text-center py-3 rounded bg-secondary text-white hover:bg-green-dark focus:outline-none my-1  `}
                onClick={() => setDefault()}
              >
                reset
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BayesForm;
