import HiringTrends from "./hiringTrends";
import LayoffTrends from "./layoffTrends";

const PeopleIntelligence = (props: any) => {
  return (
    <div className="my-5">
      <div className="my-5" style={{ fontSize: "22px", fontWeight: 700 }}>
        <h3>People Intelligence</h3>
      </div>
      <div className="my-5 d-flex gap-2 align-items-center">
        <LayoffTrends
          data={props.data.layoffs}
          title="Layoff Trend"
          para={"Employees where " + props.company + " has down-sized in 2021"}
        />
        <HiringTrends
          data={props.data.hirings}
          title="Hiring Trend"
          para={
            "These are the numbers where " +
            props.company +
            " has hired over the years"
          }
        />
      </div>
    </div>
  );
};
export default PeopleIntelligence;
