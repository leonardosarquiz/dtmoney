import * as Dialog from '@radix-ui/react-dialog';
import { ButtonCadastrar, CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrasactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransitionModal() {
  const createTransaction = useContextSelector(TrasactionsContext, (context) => {
    return context.createTransaction;
  })
  const { 
    control,
    register, 
    handleSubmit,
    formState: {isSubmitting},
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    }
  })


  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data;
  await createTransaction({
    description,
    price,
    category,
    type,
  })
  reset();
  }

  return (
    <Dialog.Portal>
           <Dialog.Overlay />
            <Overlay />
           <Content>
            <Dialog.Title>Nova transação</Dialog.Title>
            <CloseButton><X size={24}/></CloseButton>
           <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input 
            type="text"
             placeholder='Descrição' 
             required
             {...register('description')}
             />

            <input 
            type="number" 
            placeholder='Preço' 
            required
            {...register('price', {valueAsNumber: true})}
            />

            <input 
            type="text" 
            placeholder='Categoria' 
            required
            {...register('category')}
            />

          <Controller control={control} name='type' render={({field}) => {
            return (
              <TransactionType onValueChange={field.onChange} value={field.value}>
              <TransactionTypeButton variant='income' value='income'><ArrowCircleUp size={24} />  Entrada</TransactionTypeButton>
              <TransactionTypeButton variant='outcome' value='outcome'><ArrowCircleDown size={24} />  Saída</TransactionTypeButton>
              </TransactionType>
            )
          }}/>

         

            <ButtonCadastrar type='submit' disabled={isSubmitting}>
              Cadastrar
            </ButtonCadastrar>
           </form>
        
            
           </Content>
        </Dialog.Portal>
  )
}