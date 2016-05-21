/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cmsc141_divisibilityautomata;

/**
 *
 * @author parfait
 */
public class TransitionTable {
    public int divisor;
    public int[][] transistion;
    
    public TransitionTable(int divisor){
        this.divisor = divisor;
        this.transistion= new int[divisor][divisor];
    }
    
    public void populateTable(){
        for(int state = 0; state<divisor; state++){
            for (int remainder = 0; remainder < divisor; remainder++){
                int nextState = ((state*10) + remainder)%divisor;
//                System.out.println("next: " + nextState);
                transistion[state][remainder] = nextState;
            }
        }
    }
}
