module.exports = {
/*
*Description: Order by key value for Array[Object] *keyvalue is Interger
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript
*/
    compareValues : function(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }
          const varA = parseInt(a[key]); 
          const varB = parseInt(b[key]);
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
      }
}

