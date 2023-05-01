import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//context
import { useAuthContext } from "../hooks/useAuthContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetailes = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const clickHandler = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://mern-api-1yh4.onrender.com/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={clickHandler}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetailes;
