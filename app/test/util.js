import {isEqual} from '../js/util.js';

export default function(){
  
  describe('isEqual', () => {
     
    it('detect arrays equaliy', () => {
      expect(isEqual([1,2,3],[1,2,3])).to.be.true
    });
      
  });
  
}