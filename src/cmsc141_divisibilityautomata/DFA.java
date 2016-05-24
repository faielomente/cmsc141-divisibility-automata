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
    public int[][] transition;
    
    public DFA(int divisor){
        this.divisor = divisor;
        this.transition= new int[divisor][divisor];
    }

    public void populateTable(){
        for(int state = 0; state<divisor; state++){
            for (int remainder = 0; remainder < divisor; remainder++){
                int nextState = ((state*10) + remainder)%divisor;
//                System.out.println("next: " + nextState);
                transition[state][remainder] = nextState;
            }
        }
    }

    public boolean processInput(String input){
        int next = 0;
        int state = 0;
        int remainder=0;
        for(int i = 0; i < input.length(); i++){
            int temp = Integer.parseUnsignedInt(String.valueOf(input.charAt(i)));
            remainder = temp%divisor;
            System.out.println(+transition[state][remainder]);
            state = transition[state][remainder];
        }
        System.out.println("finalState: " + state);
        if(state==0)
            return true;
        else
            return false;
    }
}
