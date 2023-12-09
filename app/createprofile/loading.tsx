export default async function Loading() {
    return (
      <div className="loading-wrap">
        <div className="loading-element">
          <h1>Getting info...</h1>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
  