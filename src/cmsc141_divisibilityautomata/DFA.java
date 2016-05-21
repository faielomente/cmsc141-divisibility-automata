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
public class DFA {
    public int divisor;
    public int[][] transistion;
    public int finalState;
    
    public DFA(int divisor){
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
    
    public boolean processInput(String input){
        int next = 0;
        int state = 1;
        int remainder=0;
        for(int i = 0; i < input.length(); i++){
            int temp = Integer.parseUnsignedInt(String.valueOf(input.charAt(i)));
            remainder = ((state*10)+temp)%divisor;
            System.out.println(remainder);
            next = remainder;
            state = next;
        }
        System.out.println("finalState: " + state);
        if(state==0)
            return true;
        else
            return false;
    }
}
