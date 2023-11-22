import Accordion from "../components/Accrodion";

const items = [
  { title: 'Section 1', content: 'Content for Section 1' },
  { title: 'Section 2', content: 'Content for Section 2' },
  // Add more sections as needed
];

const YourPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Accordion Example</h1>
      <Accordion items={items} />
    </div>
  );
};

export default YourPage;
