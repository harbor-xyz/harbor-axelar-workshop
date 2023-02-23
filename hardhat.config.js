require('hardhat-gas-reporter');
require('solidity-coverage');
require('hardhat-deploy');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	namedAccounts: {
		deployer: 0,
	},
    solidity: {
        version: '0.8.9',
        settings: {
            evmVersion: process.env.EVM_VERSION || 'london',
            optimizer: {
                enabled: true,
                runs: 1000,
                details: {
                    peephole: true,
                    inliner: true,
                    jumpdestRemover: true,
                    orderLiterals: true,
                    deduplicate: true,
                    cse: true,
                    constantOptimizer: true,
                    yul: true,
                    yulDetails: {
                        stackAllocation: true,
                    },
                },
            },
        },
    },
    paths: {        
    }
};
