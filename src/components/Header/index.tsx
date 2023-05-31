import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import logoImg from '../../assets/logo.svg'
import { NewTransitionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
       <img src={logoImg} alt="" />

       <Dialog.Root>
        <Dialog.Trigger asChild>
          <NewTransactionButton>Nova transação</NewTransactionButton>
        </Dialog.Trigger>  
        <NewTransitionModal />
       </Dialog.Root>

      </HeaderContent>
    </HeaderContainer>
  )
}