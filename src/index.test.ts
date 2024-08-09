import { describe, expect, test } from 'vitest';
import { normalizeEmail } from './index';

describe('index', () => {
  describe('normalizeEmail', () => {
    describe('check email validity', () => {
      test('an error is thrown if the email is invalid', () => {
        // Just a domain
        expect(() => normalizeEmail({ email: 'invalidemail.com' })).to.throw('Invalid email');

        // No @
        expect(() => normalizeEmail({ email: 'user.name.gmail.com' })).to.throw('Invalid email');

        // No TLD
        expect(() => normalizeEmail({ email: 'user.name@gmail' })).to.throw('Invalid email');

        // Empty email
        expect(() => normalizeEmail({ email: '' })).to.throw('Invalid email');

        // No domain
        expect(() => normalizeEmail({ email: 'user.name@' })).to.throw('Invalid email');

        // No identifier
        expect(() => normalizeEmail({ email: '@gmail.com' })).to.throw('Invalid email');

        // No identifier and domain
        expect(() => normalizeEmail({ email: '@' })).to.throw('Invalid email');

        // Space in email
        expect(() => normalizeEmail({ email: 'user.name @gmail.com' })).to.throw('Invalid email');
        expect(() => normalizeEmail({ email: 'user.name@ gmail.com' })).to.throw('Invalid email');
        expect(() => normalizeEmail({ email: 'user.name @ gmail.com' })).to.throw('Invalid email');

        // Non-string email
        expect(() => normalizeEmail({ email: 123 as any })).to.throw('Invalid email');
        expect(() => normalizeEmail({ email: {} as any })).to.throw('Invalid email');
        expect(() => normalizeEmail({ email: [] as any })).to.throw('Invalid email');
        expect(() => normalizeEmail({ email: null as any })).to.throw('Invalid email');
        expect(() => normalizeEmail({ email: undefined as any })).to.throw('Invalid email');
        expect(() => normalizeEmail({ email: Number.NaN as any })).to.throw('Invalid email');
        expect(() => normalizeEmail({ email: true as any })).to.throw('Invalid email');
      });
    });

    describe('gmail address', () => {
      test('lowercased, dots are removed and plus tags are stripped', () => {
        expect(normalizeEmail({ email: 'User.Name+tag@gmail.com' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'User.Name+tag@GMAIL.com' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'User.Name+tag@gmail.COM' })).to.eql('username@gmail.com');
      });
    });

    describe('googlemail address', () => {
      test('lowercased, dots are removed, plus tags are stripped, and domain is renamed to gmail.com', () => {
        expect(normalizeEmail({ email: 'User.Name+tag@googlemail.com' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'User.Name+tag@GOOGLEMAIL.com' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'User.Name+tag@googlemail.COM' })).to.eql('username@gmail.com');
      });
    });

    describe('hotmail address', () => {
      test('lowercased, dots are not removed, but plus tags are stripped', () => {
        expect(normalizeEmail({ email: 'User.Name+tag@hotmail.com' })).to.eql('user.name@hotmail.com');
        expect(normalizeEmail({ email: 'User.Name+tag@HOTMAIL.com' })).to.eql('user.name@hotmail.com');
        expect(normalizeEmail({ email: 'User.Name+tag@hotmail.COM' })).to.eql('user.name@hotmail.com');
      });
    });

    describe('live address', () => {
      test('lowercased, dots are removed and plus tags are stripped', () => {
        expect(normalizeEmail({ email: 'User.Name+tag@live.com' })).to.eql('username@live.com');
        expect(normalizeEmail({ email: 'User.Name+tag@LIVE.com' })).to.eql('username@live.com');
        expect(normalizeEmail({ email: 'User.Name+tag@live.COM' })).to.eql('username@live.com');
      });
    });

    describe('outlook address', () => {
      test('lowercased, dots are not removed, but plus tags are stripped', () => {
        expect(normalizeEmail({ email: 'User.Name+tag@outlook.com' })).to.eql('user.name@outlook.com');
        expect(normalizeEmail({ email: 'User.Name+tag@OUTLOOK.com' })).to.eql('user.name@outlook.com');
        expect(normalizeEmail({ email: 'User.Name+tag@outlook.COM' })).to.eql('user.name@outlook.com');
      });
    });

    describe('unsupported domains', () => {
      test('lowercased and return unchanged email', () => {
        expect(normalizeEmail({ email: 'User.Name+tag@example.com' })).to.eql('user.name+tag@example.com');
        expect(normalizeEmail({ email: 'User.Name+tag@EXAMPLE.com' })).to.eql('user.name+tag@example.com');
        expect(normalizeEmail({ email: 'User.Name+tag@example.COM' })).to.eql('user.name+tag@example.com');
      });
    });

    describe('no plus sign or dots', () => {
      test('lowercased and return unchanged email', () => {
        expect(normalizeEmail({ email: 'username@gmail.com' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'USERNAME@gmail.com' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'username@GMAIL.COM' })).to.eql('username@gmail.com');
      });
    });

    describe('whitespace handling', () => {
      test('trims whitespace from email', () => {
        expect(normalizeEmail({ email: '  User.Name+tag@gmail.com  ' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: '\tUser.Name+tag@gmail.com\t' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: '\nUser.Name+tag@gmail.com\n' })).to.eql('username@gmail.com');
      });
    });

    describe('uppercase handling', () => {
      test('converts uppercase characters to lowercase', () => {
        expect(normalizeEmail({ email: 'User.Name+Tag@GMAIL.COM' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'USER.NAME+TAG@GMAIL.COM' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'user.name+tag@GMAIL.COM' })).to.eql('username@gmail.com');
      });
    });

    describe('complex cases', () => {
      test('handles multiple dots and plus tags', () => {
        expect(normalizeEmail({ email: 'u.s.e.r.n.a.m.e+tag+another@gmail.com' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'U.S.E.R.N.A.M.E+tag+another@GMAIL.COM' })).to.eql('username@gmail.com');
        expect(normalizeEmail({ email: 'u.s.e.r.n.a.m.e+tag+another@googlemail.com' })).to.eql('username@gmail.com');
      });
    });
  });
});
