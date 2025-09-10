type Props = {
  title: string;
  subtitle: string;
};

const FormHeader = ({ title, subtitle }: Props) => {
  return (
    <>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
        {title}
      </h2>
      <p className="mb-8 text-center text-gray-500">{subtitle}</p>
    </>
  );
};

export default FormHeader;
