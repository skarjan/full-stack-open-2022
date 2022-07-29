import React from "react";

const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ sum }) => {
  const total = sum.reduce((total, part) => total + part.exercises, 0);
  return <strong>total of {total} exercises</strong>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts} />
    </>
  );
};

export default Course;
