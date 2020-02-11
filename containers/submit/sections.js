import React from 'react';
import { Type } from 'blockstack-ui';
import { string, boolean } from 'yup';

export const sections = (user, appConstants) => {
  const personal = [
    {
      name: 'submitterName',
      required: true,
      label: 'Your Name',
      placeholder: 'Satoshi Nakamoto',
      validation: string().required('Your name is required.')
    },
    {
      name: 'contactEmail',
      required: true,
      label: 'Your Email',
      type: 'email',
      placeholder: 'satoshi@gmail.com',
      validation: string()
        .email('Please enter a valid email.')
        .required('Your email is required.')
    },
    {
      name: 'referralSource',
      required: false,
      label: 'How did you learn about App.co or App Mining?',
      placeholder: 'Hacker News'
    }
  ];

  const appDetails = [
    {
      name: 'name',
      required: true,
      label: 'App Name',
      placeholder: 'Satoshi Chat',
      validation: string().required('Please enter the app name.')
    },
    {
      name: 'description',
      required: true,
      label: 'Short description',
      hint: 'Max 50 char.',
      message: 'Will appear on App.co category pages and search.',
      placeholder: 'A chat app for crypto.',
      maxLength: 50,
      validation: string().required('Please enter a short description.')
    },
    {
      name: 'website',
      required: true,
      label: 'Website',
      type: 'url',
      placeholder: 'https://satoshi.chat/',
      validation: string()
        .required('Please enter a website.')
        .url('Must be a valid URL with http/https.')
    },
    {
      name: 'imageUrl',
      required: true,
      label: 'App icon URL',
      type: 'url',
      message:
        'Square icon, other sizes will be distorted. Accepted formats: JPG, PNG, SVG.',
      placeholder: 'https://example.com/app_icon.png',
      validation: string()
        .required('Please provide an icon.')
        .url('Must be a valid URL with http/https.')
    },
    {
      name: 'openSourceUrl',
      required: false,
      label: 'Open source URL',
      type: 'url',
      placeholder: 'https://github.com/SatoshiChat',
      validation: string().url('Must be a valid URL with http/https.')
    },
    {
      name: 'twitterHandle',
      required: false,
      label: 'App Twitter handle',
      placeholder: '@SatoshiChat'
    }
  ];

  const generateOptions = enums =>
    Object.keys(enums)
      .sort((a, b) => {
        if (a.toLowerCase() !== b.toLowerCase()) {
          return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
        }
        return 0;
      })
      .map(opt => ({ label: opt, value: opt }));

  const categoryOptions = {
    category: generateOptions(appConstants.categoryEnums),
    blockchain: generateOptions(appConstants.blockchainEnums),
    storageNetwork: generateOptions(appConstants.storageEnums),
    authentication: generateOptions(appConstants.authenticationEnums)
  };

  const appCategories = [
    {
      name: 'category',
      required: true,
      label: 'Category',
      width: '100%',
      type: 'select',
      placeholder: 'Social networking',
      options: categoryOptions.category,
      validation: string().required('Please select a category.')
    },
    {
      name: 'blockchain',
      label: 'Blockchain',
      width: '100%',
      type: 'select',
      placeholder: 'Bitcoin',
      options: categoryOptions.blockchain
    },
    {
      name: 'storageNetwork',
      label: 'Storage',
      width: '100%',
      type: 'select',
      placeholder: 'IPFS',
      options: categoryOptions.storageNetwork
    },
    {
      name: 'authentication',
      label: 'Authentication',
      width: '100%',
      type: 'select',
      placeholder: 'Blockstack',
      required: true,
      validation: string().required('Please select an authentication method'),
      options: categoryOptions.authentication
    }
  ];

  const agreements = [
    {
      name: 'public',
      required: true,
      type: 'checkbox',
      label: 'App is publicly accessible and user-ready',
      validation: boolean().required('Required.')
    },
    {
      name: 'disclaimers',
      required: true,
      type: 'checkbox',
      label: (
        <>
          I agree to the{' '}
          <Type is="a" href="/terms" target="_blank">
            App.co Terms
          </Type>
          ,{' '}
          <Type is="a" href="/privacy" target="_blank">
            Privacy Policy
          </Type>.
        </>
      ),
      validation: boolean().required(
        'To submit an app, you must accept these terms.'
      )
    }
  ];

  const fieldSections = [
    {
      fields: personal
    },
    {
      fields: appDetails
    },
    {
      fields: appCategories
    },
    {
      fields: agreements
    }
  ];
  return fieldSections;
};
