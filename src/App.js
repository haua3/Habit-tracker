import CIcon from "@coreui/icons-react";
import { cilRecycle } from "@coreui/icons";
import { useState } from "react";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function App() {
  const [habits, setHabits] = useState([]);

  const [habit, setHabit] = useState("");
  const [freq, setFreq] = useState("Daily");

  // window height
  const height = window.innerHeight-100;
  // window width
  const width = window.innerWidth-100;

  const [habitAdded, setHabitAdded] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!habit) return;

    const newHabit = {
      id: window.Date.now(),
      habit,
      freq,
    };

    setHabits((habits) => {
      return [...habits, newHabit];
    });

    setHabit("");
    setFreq("Daily");
    setHabitAdded((h) => !h);

    setTimeout((e) => {
      setHabitAdded((h) => !h);
    }, 3000);
  }

  return (
    <div className="container">
      <div className="innerContainer">
        <Icon iconName={cilRecycle} />
        <Title title="Habit Tracker" />
        <form type="POST" action="" onSubmit={handleFormSubmit}>
          <div style={{ display: "flex" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                placeholder="Add a habit"
              />
              <select
                name="frequency"
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
              >
                <option value="Daily">Daily</option>
                <option value="Hourly">Hourly</option>
                <option value="Minutely">Minutely</option>
              </select>
            </div>
            <button>Add</button>
          </div>
        </form>
        <ShowAllHabits habits={habits} />
        {habitAdded ? (
          <Confetti width={width} height={height} tweenDuration="1" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function Icon({ iconName }) {
  return <CIcon style={{ height: "6rem", width: "12rem" }} icon={iconName} />;
}

function Title({ title }) {
  return <h1>{title}</h1>;
}

function ShowAllHabits({ habits }) {
  if (!habits?.length) {
    return <p>*Add dome habits to track.*</p>;
  } else {
    return (
      <div className="habitContainer">
        {habits.map((h) => {
          return <Habit habit={h} key={h.id} />;
        })}
      </div>
    );
  }
}

function Habit({ habit }) {
  return (
    <div className="habit">
      <span>{habit.habit}</span> <span>{habit.freq}</span>
    </div>
  );
}
