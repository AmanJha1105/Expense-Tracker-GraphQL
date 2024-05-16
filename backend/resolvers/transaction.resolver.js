import Transaction from "../models/transaction.model.js";

const transactionResolver = {
    Query: {
      transactions: async(_,__,context)=>{
        try {
            if(!context.getUser()) throw new Error("Unauthorized");
            const userId = await context.getUser()._id;

            const transactions = await Transaction.find({user:userId});
            return transactions;

        }catch (error) {
            console.error("Error getting transactions",error);
        }
      },
      transaction:async(_,{transactionId},)=>{
        try {
            const transaction = await Transaction.findById(transactionId);
            return transaction;

        } catch (error) {
            console.error("Error getting transaction",error);
        }
      }
    },
    Mutation :{
        createTransaction :async(_,{input},context)=>{
            try {
                const newTransaction  = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })
                await newTransaction.save();
                return newTransaction;
            } catch (error) {
                console.error("Error creating transaction",error);
            }
        },
        updateTransaction :async(_,{input},context)=>{
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true});
                return updatedTransaction;

            } catch (error) {
                console.error("Error updating transaction",error);
            }
        },
        deleteTransaction :async(_,{transactionId})=>{
            try {
				const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
				return deletedTransaction;
			} catch (err) {
				console.error("Error deleting transaction:", err);
				throw new Error("Error deleting transaction");
			}
        },

    },
};

export default transactionResolver;