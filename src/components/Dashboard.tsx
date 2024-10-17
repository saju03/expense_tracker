import React from "react";
import Table from "./Table";
import useFetchResults from "../hooks/useFetchResults";
import Shimmer from "./UI/Shimmer";

const Dashboard: React.FC = () => {
  const { loading } = useFetchResults();
  return <div>{loading ? <Shimmer /> : <Table />}</div>;
};

export default Dashboard;
