
export class DatabaseService{

    runQuery = (query, binding) => {
        return cy
          .task("executeInIntermediateDB", {
            statement: query,
            binding,
          })
          .then(response => {
            return response.rows;
          });
      };
    
    
    
        
}