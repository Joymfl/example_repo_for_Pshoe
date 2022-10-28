use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod test_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account_info = &mut ctx.accounts.user_account;
        account_info.counter = 0;
        account_info.age = 0;
        Ok(())
    }

    pub fn update(ctx: Context<UpdateInfo>) -> Result<()> {
        let account_info = &mut ctx.accounts.user_account;
        account_info.counter += 1;
        account_info.age = 25;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,payer= signer, space = 11)]
    pub user_account: Account<'info, JoyAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateInfo<'info> {
    #[account(mut)]
    pub user_account: Account<'info, JoyAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
}

#[account]
pub struct JoyAccount {
    counter: i16,
    age: u8,
}
