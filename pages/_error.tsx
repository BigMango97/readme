interface Props {
  statusCode: number;
}

function Error({ statusCode }: Props) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

interface ErrorType {
  res: any;
  err: any;
}
Error.getInitialProps = ({ res, err }: ErrorType) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
