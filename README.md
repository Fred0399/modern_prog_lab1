# MPLT Labs

Lab work for **MİF-0902 Modern Programming Languages Technologies** (Master's, 2026/2027).

You clone this repository once, keep your own **private** copy on GitHub, and submit by pushing to it.
No e-mail, no pull request, no upload form.

| Step | What you do | How often |
| --- | --- | --- |
| 1 | [Set up](#set-up-once-about-5-minutes): clone, create your private copy, give the instructor access | once |
| 2 | [Work](#work) on the files, locally or in the TypeScript Playground | every lab |
| 3 | [Submit](#submit): `git add`, `git commit`, `git push` | every lab | Submit no later than the 5 minutes left to the finish of lab
| 4 | [Get the next lab](#get-the-next-lab): `git pull` from this repository | every lab |

---

## Lab 1: Type systems and language safety

Covers Lecture 2. Language: TypeScript. 4 small programs; each one checks itself and prints `PASS` or `FAIL`.

<!-- playground-links:lab1 -->
| File | Task | Time | Playground |
| --- | --- | --- | --- |
| `lab1/00_warmup_predict.ts` | WARM-UP: predict, vote, run | 5 min, whole class | [open](https://www.typescriptlang.org/play/?#code/PTAEFkAUBkBVWgQwEagIygLSgAw9AOoCCASuJgKqQBcoADgE4CmAJgJYDGALgDSgBuAey5M+DAK4A7UDNlz58gBQBWUAFs2kvgHcAFoIA2TUBwOIAzuYCUAKBChYgw7VgBPOkwDKHBmzpdQSDNXAHMGQSkWADpA5ktQACISKQTQRQBhLgYDYHS1FlAAalAAUUkRBitQREkCwQ9pLl1jBOhBEPNUrhQou2A+0BIKaBLaSBISgBEASXT4ADFpkk9YGMnBUElhejjzQalQVyYuGPnBBlAmRA5dEwtjG6dzY0FJJmoBmSIqpofBNTobCMF2YACsmNw9mwAopmAVIkxspomLZ7DIAEJVaEmf6AozmPi-aQ+CzNPaIAISRpsNRMT6gdJYgIcXFApjk2qgKl7ABmyJsNlMFj2REkNMQBlAAG9NohaaAALyJGrigwJADcoAAvoKzPF1iFLgAPES1EVitQS6WgZCIBgAa0UVRlzC44gY0gS2icPI12u1uuFDIpxtNLHNquttME2id1td7s90e0fq1AYG6SInhK6Cw1VAPKk3DYr1ATRDzA4TDY-HZ+fMWU0hvOm3EBgMNkLkmLpfM+nEXEU5loDd8kkNAB9W+3nTYZAmPaBzFEuIIKHQPAx0vcneqbDqM1mcwAmPOIUAGgDaAF1QOJngULNVpKLVTfBa8G6AWO1hxf2jeiqgJebzaP+IROtee4spIX4qpaBh-q+CGAUqP4dHu8ESsudD3roiigcGg5WFY0GfgEzwwQUaG-peaBQQK9iZtmoAAMx5r8BZsAwX5MEYtLlKAgg8s+lwAlwrjVAwDCIK4H6wcy0JsOyI6NuOqHAQxMFfnyPFcOk0KSUqHBKeyl44AxAyYNZ2BXDcdzPFyUh7M8dB2hSfGuHw5gbK8DwyX236CHWWwBLobAsMYnHCM0PFYDZnZFlwJbSBSIjiYoZjIHxqljiEfA8rQcYKgAfHekj2ls2iSLOMhZJJMraYYTBRAY7SZSgfF8AkmAlQkBVOqRAYyBwFL2YoKLWk1Rite1WVdYkvWDBQABymCwNM4A5iUJAkAA8iQ1D9aAnhqRBKJDTqOppUwGUJMxOYYEu-aDpIbYGFUcjHcVZV9hEr3vSRmFcOl-iKPdR6gKeS4Qq80S2g6cYyN9VSlTDVFRAjjpAzYN13Q9bEyLpDYGRJrVMOOTQo4qZXE-phnk5TuikYxYBEPMsA7ctK0rdMK0AOIcRK9plhsrgRBcbxsCEujIBLaSnhoNUfGi6AxAQ4X2aNjnsAUnEsgCbIXKNXA3AA-IQmu3LroDYholhm-Sx4xNAEJuswUPeQYEXGGgp7mIgEWJG4HjeL4-i23szkRJypa4QwdCCM8CTq1bDnGGwezlhR3uRY7qusTEAASgi1hcpeIjIlFwzINQFFxemk5JqchhJHhBXW+ussCNp8cptZls0km6Igtb52A8gayG-ASuIxg-oPTCScwEoGMPhiPpSBzJbSjtAA) |
| `lab1/01_narrowing.ts` | NARROWING: make the compiler prove it is safe | 10 min, pairs | [open](https://www.typescriptlang.org/play/?#code/PTAEFkAUBkBVWgQwEagIygLSgAwYHICCASsQPIDqAkvgOIBcoAtogNYCmoALgBacDGAeyYAHAJYAbdgCdQI6YIBunMV1BiAzqA2IAZp1CGjRgBRoczMQDsANHMRjpGgJQAoEAnb8uAV2mcAJjsNCTEAE3YtNABmTDQAFgA6d2AU0FoyQmhQRgt-MNAfKwjpUKtI0EJ8ABFQdmVpAE9QMpUrbj4EQQBzLS4UbURGrUhCAGUx5I9iAFVoAFExxjDBUHwyeB8NA0QrZrtQRC1QQVleAwBCQ0ERGUQuU6mwYyMZ7cMxXVADrkbbwS+BwAvCDQFYfBIJN9DCCgYViuxdNZ2AUnqBYFRIIZGDwlDITg1DqBFIhpGIUFJuKttpxztw-rTOkJRJJ8awrIIAO5ae4dXnsAAeiG8LWRyVc1i4Ml0ws4b3xAG91GFGOCmMgZABuMGIJjsRgaLhkqzdbXsFiSA1G6zdUAAHzBEIk2oAvq5XEIrIbCtsnKA4eVORBECIADxqjXSOzy6QAPhMAG1XIYE2g7Erwow0zq9YwAESEYbsCR5uzmhwSfNDbYSAACgt1IikiWZedALoAujZk6AE0FQBmVaB+1ZdfrQHnwH5EGFS3ULZXHZD213XB3nJr3R5YOMANLoLDBkSJbrsNT+XzSL2GGP2+ERJHlVGgAASeNk78MPlAaOIZ787R0lsMgAORaKOep2KcE5FOyXJWG2nJ8IBfD+Oo4HUj4-A8D6MjJLoRTeGIgjtMB0j4GOJiZo66oyM4VrGraCo9p63rfnCZEaCeZ5UWEG49heAGFIkEHsNqLwSZJUnGB4obYEiArMOwrhumkO5jPuASHlwnKrBIQwyFoAKHMg2xWPw45Ab6zBDKAGqWBoGg2pUNQdJw5aSDZzT2eCkK-v+V5ufY0hqMZdIeVCehSrIea1nO0F5hy84Vnm+GEVwxHtBF1TCA4Vi8aqPi0dI9HaNaJoDixJFsf6uFONxXC8fxhiCYFPiJBFiQaE2qgmLFebOKmHbidJLyyfJYiKXqKlbmA6n7tE2kMsZo7SAonI2oklTtOEhxrWIyg8jyNGRqAJjxAEzgnLIRxEoajFnXmKCYAA7ANaKGBG+KYLGE4AMQ4DgF1tmdIgzlSoDxKAYRiN0qguFJ93OT9-2EAAQq9IMmD4Ii3LI-BHOwbgEeZGUkaAuinCwXBUGEBUnfiDpIyapXM0xAkBe0eZ-W2ADUyqJGDYRjP0IXnXYeY4ANI3SeNFOTUpM1qXukOHpAxDzNUVAAMLwEiThcKqqz5PeMitKAqHsFtVB9J0JNEeTQhrV4XAAPxpBQPC8isFQtCgxYmDgV2gK1Viu6AxBFHY5ztAp6iG2kFiaESJKhAUACOPi7BlvxQVYEjNL5UJ6rsWh5rBHKcghaWk5lfsahIJjp78hXFXeRes+V7MfF8Te-FdSqhxOzeNECfOgCProc5eXMV-BeabqpHiYCv2A1romDYV4rBnSsYKCGoKKqFdq+n2f58X5fV8X649tk+0W-8KwJiiQxNp2LojAmFdQK-XPVdlgFLcbwKJGD-ysAPHsUg1DdAPmAqwcEq6bkMEaZoSpYFqDhLob+rpQAEy4NhM6RMBygAwbVPM2tiDjBfBOUA-MRaMRMETKehhWKhR3nCAAUmMMg+Aupd0+I0EwGCf6gm4bw-hjFBFMKAS7FEzU8HVUEM2CQPQTAmEEDvcOeZRgTEMG2fMAAxQgVBsgTiuvzUSdCzqaNANogxtDDBkPHuIvhbNpEiOsXOQUwCpQFBcTwtxAjdBCJ8XIvizh+Jukfs-PMsAMBkQonqMwzg5zf39H-X0ST2ApIloWGs0sPR8Cfn1eJdVskmAAJypLsOk3+5TKLVIluAwpMTSlaWyrlawKS0k-1+p0i0+U0DOAlg2UQzZWz8TaXEjpC4cqDJMJdXpGTkqSHmXlRZIyJxJQiq04psTYCzIrOs7p1Tln1IGRspp2zVi7Kmfs0pi1KbSGprTc6Szal9IplTe4byLpbO5oDYG9zt6PO+S835dMQLPReiBGpZ0vnPNeXTJ6yBMYAr+ujdFm5pmwChvpBugd4V1N+gSgOQcJYjyBFLEFJS4n4v9o3Du5zSWMpfk6AFLT+JpC1mMbWMw9FIXYO0FY5R6BpEMLAI4O8oZewKElE2RQSjm2QD4NQnJbqcgUCaLantvaCAqLwXkOhmgoEEGqiVE5Pjx0USyKQGg7CqFALpaQrANB5nDiYaALs-CBGCGnTgAA2Ow+lvSqshGeRIbggA) |
| `lab1/02_unions_illegal_states.ts` | UNIONS: make illegal states unrepresentable | 12 min, pairs | [open](https://www.typescriptlang.org/play/?#code/PTAEFkAUBkBVWgQwEagIygLSgAwCZQBVAOQEkB5YgZQC5QBbRAawFNQBLAG05YHNFOoAM4AXRCJZDQAVwB2AJxYAHRUJayxyHqB269OgBRoC9drIA0oJYnbyhASgBQIBCwDGI6YtB5LQzuwAJpLoAKyYaABsAHTOYFQiAPbyAJ50iAyJwZyYIvI2sma8oABWiajsUgCO0iy1gZbycoWyvJaBibJsyaAAZjY8gbEgcaAA4uQAgtCgdDigioEyssHyAV1Sk8QAIqAsAG4sqaDrbGagIgAWbNCJvFKawogpUpCTVFTDYABKhNAAorRQB1QMRyPBpGodIhZClQJZQIgpKAelc2KAAIQ6RJKI7iZKxUaYYnYABC-wAYuRvv86J02AAiZCIYqJXoopQididAR9dgsTiBIQMrAksXiiWSqXixxmCTyfpuNgAKXKt0SUIA3o4dKJxJC6AyanUWIERQAfUAMpqyFq8C1WjpdB0M-pcU0MgDcOqs8juqiEAH46LJpPRkEdPfoXJ1OHD6CwYUVetJBAB3S7uhbNIo+xBuNxefMpYOgUPhyPRsCx+OJu0p9PXWTA+k+o5++Sl0TyIpR-Q6GOyOMMOvJ1OgDPqPoDU2OAC+o1gmakbkS9CU7qE0VApBEHCksk6alkanSoGN9VK5Qul3EoFvUhhiILRbccK2uyf7YJjlXJ73h4nuop6gKqyDqlCAC8oCasIYieEIhoXh6lj5oW+RvnM0QAJzYZY37yIaiTSHubIjvQyQpCKc7ekSJKgLA7wANLoFgCympI7C8M27B7kiiLApUbg9qYsjiKayzcs20oybJozkF0KLICU7h7iIKS4lYRxweJ27-Pmlz3vxGQBPKvKgEwZhLBcLKIisoCUNAACaHAiFIiRps2vT8oKiGjDoyHWZgAB8ZaJHsAAeeQZN5ApCv2-Y2naWChSo-qSIhZZhhG8i6AYODRNEaBOC4OhOuiOghc+6HFiG2XaQluhuoMlWhQRdDdrm6maWBoCQT6lqwZZKxIbU9TUQNMEWVZhpJUUXq+ulQiZeWOWgDRVagAAPNgiCBEsaIXGm4WmMtRSgG4SKSI4owAMJrhuPC5OwCYXJIbnbts4WHnupq8TeLD0F8VoAAJuZgLARbiHgQ-IHYigmMKZYdxD-AAGvApwQIQVDwBGAndWwBHA6Q7IpMRuWE-uFyJOFnC02oliHYEtiqewhyuWonDsrwLBuQJizLKspyxH+ogokwaB0L10FDTNjr0gyqEvhhaS4DhADM63emLpFMHg0vXrL00jVazUoXscPJERJEouyCYUak1Hei4YNCBDUOqbDHbQueY0SWUqCXbaiR7pdcNwk+aGvikv5HnuzKBFLoFG1Nw2BKNJpmsrNWYeruHa6Mbse9DIjez0AnlVeqD0JCe63hzUcq8Wcf-qAicGynqDG+nhrlc7Rfg5Dpfl7lAs5q01dGQe4UESOy0siwrfi4nGuG93afy9aE-2pYaW8AGWGhPhVuEVagYD3RxIMcxPhsfSfRyB4Un4Ycxx6hIRkrC1sm-zJozfD5l4ZskN8wiDjDQfyVo0w2C5K0F0c1J4ABYcAAFIXTlRzjHfOGsXQUkmKQAE2w6S2zIg7SiDJRikBPEEImBkdCXShPeRIb8USsKnnQQ6VNKhlkQFbNMEkkg3jvA-D+LBYgplkM-TowJJDCXYBGAwgd172A6nkc62pdRpl4m4QySjyjRHTvYGCPoGFXStIFBkkDEpAPkM2BkMDeLzW9HoFwO1ET7QBiiNEuVGHXR0AuBcV9sCMSoCxLW2BdEwl5l44IQguIWBOHzLxq51zulyt5eyh1jryCYKKP+JJRiTE8TFdgvQrg6U-kIsCdAdBy1NgyYOSpuAeijMgNWnVJ4LhcF9UE4IabSF0WVORPZ8agBSHzbcAB1a43gOghEOoLOQwszBsEQEoXEfDUL2QzCWRcTYv6BG0LxWpjSYTNJau01wKROCIBFNspYchMCpITBoLxtzxa6PcHkiM9M0zAwAIq1FEFJOg2iKlgQgiwSwlwPITmIoKcZxEjIc16MReyBwjhwiULcpUNMZBKECOJQMN0XBimEAKXozzrhuDyQYEEP09gsxEMYgpbL2USkcJI6RzYvm0oMGJBMaieytEsL0OgBhjGQVCnIJgh5PL4U9h4U0dBZXytkMYzRSS9y8FDqq2QcqPKyBcRcY4sFdV7mgr0SVUY5wXXEEMgwLBNWgAtX1K0t1vjvAABJWlAAAalAAkEVvAnX2FtT6XWEt3XKioJQaInTeBlJSAYC1UrILQVjfGxNyanVKokIEcNkajyJB4NEemoaDCJDyYGK0bwPg6BFIafBhDG3GMDYKtggaq01qtE2v1Og3UikDVm4gCb1GtFzWmgNVpFWlwksO0Ccax05t6Cm4eqlTT2G3d6BcfKmAGAZLAAgljLCSr6qFOJ8jFH1IzhY-2Zp1r2EsA42B80i37sPce7Mtp5pnqlZekZCiWAGFvbNHeStFoHwylhJBT6X2IOKCg9BH6aUHqPQQfu-6L2yKENekD1biovswdVbBBVsK4NQ98r9BBzbZ1AOe6VuH8M9rwM+q0LaiEkNIvbQGFCi0uE-UerWTSBSDEg4xwDeHRkgbA1aUTLT6PtMNNAFgNy7nwfk+csTEkrmqfUwyItQA) |
| `lab1/03_generics.ts` | GENERICS: keep the relationship between types | 10 min, pairs | [open](https://www.typescriptlang.org/play/?#code/PTAEFkAUBkBVWgQwEagIygLSgAwGZQBxAUQDliAlASQGEBlALlAGsBTVgB1ABcALV0ACdWAG0TcAlgHsAdgGdeErslbcA7uxk8Anh1ZzQho8dAAKNDlABbCTIA0oDogmC5ASgBQIBKwDG3AFdhUAAmBzkRCQATATQAdgA6L2Bk0EhhOQMKAK1SAHkAdSZWADdWQW1QX35fZlBEEWFEKMq5RG0DSABBOjoE0Fh+UAApRBLEOl9BJW5QCQNfKUFhfyTvAt5xOYMbTNsAc22WGSk1EVYo-YFbHiHYAE1IYkZbgWEo0ByYwUiZfTWwIQ8l1oKAmJZ3p8ZN9fv9QBQAKrQZ5MKJSUD5eABOQCeoySoOeoGUBLV6GACEhikekE4iWSVSmCZ2EgFGIABFaPBzNZbG4mHxcYh8YYyq5pDJ+jQpFYOBJzqByoIlg5BDlMJIrAIlSqSYJQAAzWysAD8WGZHgNOX8EsNLjk3C6+NMAA85ExhdoANoAXX5eMqAG8hKoglo3V6cD6ANygAC+HkW8lmUmpBgAvGY3KB0wA+O2uR3Or0WBwhKNuBLcKQIjg0miIHGmNzRjyM5kDIZXP7TXygMVyW0G5VWMnnfxBVgCoZSALcDhznR6Q1SEQiU4GQVzGQL2bcXQCZmYS3WySyAsOgA8sFzrvdA19-vgAB8oTEjX8PsHhIFBOG5Ak5wyPsfCgPmlhmhGUZgm+rAfhcsYJkmDr1DmF7cKYJY4GWFaxiYhjeLwUhiiSJH1ImsgoagmZGoWmEAEQuvRDj0do9F+nhxiEcR5SkbxoDIG23iwD0ADS6BYKAYgOkwkRsOhDgGqSW7SbMoisFqMjcP04CIPJEizN25QSL4SRWjINrnqpd5MDkzAnGoMiPrZMj2acWiBh4hg-mGoBuoBrDAaB4GgJBchev5QEgbwkloD6MFfHBxpRK2CapCJdDiSEklOC4Ho8AEHAKnwWzCFqVgqK4oAAEJ5LAAASS5woYuWCOYLGIPR2agJsm4HoYXoyAEFXlOE3DTMBPonhZZ5aK1rouW5jkONoi0OTI-p2etvqgJ53mhn+oARStMYeGlwliaABDYIgVSUeNzhaf067AfosyIL4vicNwBienwBy3FsvWoVJgXRYYpgOhN+wOIgyztA4CRI543jCh8Pl-puQx0F04DEE1cyzGojagPsEhlJKRj1bY3BMKA16Ki63CBVEBjBlFfBMENI36nGubTZZWgvVcDoLVCS32KAq3i+tm2uetu1eSGv7hgFQUxbmmbaGr4OQTB2ipUJYAZeJAAsOUiAEtRME0HyyAIHDKjS+6GiOipipUUjIAAVn42mdgIbCVFY2JqS68zcLD0KvKkGQBCIe79SHKFKWupxkkH-SGNTWl09eDjiawTMswYQdSAaAz5niHxbvuy4PqJU3mYLjiW7UpgGRp95be5voOEHTBQwccsSzte3K75ndWABViIBwHfM6OeaExpXpBxxZ1G+aTJ3bK8qsBqEhajwb0GKYaKgCcalRAZ2ZHvfD+P0-z+PxRybWFIMQiBmR1K8GkjcHOEweiGQ-jcAAKw4GYo4OGiBp5MBCOAhIAA2eMdg-48AMkA0A9FKrcEwMgRsrBoFOFpPA9AFg0EeFOshPcaAubDUqqAV8iV4IfEzNZEsZYHB4A3rQngIQmCDUYaNUAQ9JpoXmmgDqXVWz8O4HgQe40AYcNkCLDC9F9hSGgfRDg2g+CyFkW-FC3BTYMJ5jtTMRUrbMFMFYT+og5AsVIXAuQRj5HgKUdDSxrcbF2Icd-FiADzhGO8AAAR+pgIueh-BROWKSVC3MmHAxOKDdWHhhZvXaqEFsqQIlyCiS6GJ+CdT6hwYOAAXsQo4V9UKO2pOUF25dUL2K-h4ax7dWmOJYpU4huT2w7zVDIQ+x9qh+GYGfC+tSLi323i-eZCzFkC1mlUGotiZBwKnGI5RwFFJMGbDmfMPdlqM2KRcNa7lszj3OIZKQtMZbuVbIYcaQZSZ3LQgaZsiEqjiGqGYVgVy3mzEzPRGgFAeiNXoqAAA1KAOgOz9imABYhJW-CpB1EzMMOgeRSAJHEWTA02hTBaO4NmdM5KRjYtxfiiQhKkVFL9hcXJhhkKrlYIBKQiLTDotCjg7ovRDBQuAQAMS6FQUEODsywo2cfWF3K6hmnokKnBRgSUqthVinFeKEW0qJSSqVOCHDRMZR8KFGqqXauhrq+lZyohuHtYbMZ7d6KwAwKpaBBzl6cOkaEHhfoeG5KdbYl12VWoerJfmKRMi3AOC4TgzqfC1mmBdQQTJDpw2HKkmorJmjtHOP0URGQXV80GKLYGpNLrzYdLqC46eGbl7Vv8V-JxODa1uJjUdRBKCHBoAsIm8ZybYBVrbnUYJxCHCesjSOpt3ScFjuLUdEB+gwGQJ0XgghRD2K5JebtEkaYvnxh+dwP5SLAWsvOByxF9FWQci5IYWiDonREqwjhP0VYax1nKA2Js3VMBVzNXChFp6Wzxi3pyOgNAEQCrUPwLQaI-gMFSIYQYAgg0GCcJkC4Ak4JLAENoWcoA1DKmZqhQcwFioHn6LAA8v1gjlCIR8FQSlgiCiQ44ZU+wyFCByGfCI0RYgAA5KxwvRDBrYRcPqAMqDfD4+GAj1CiB8G4-0DBF3KL4eYpoPBAA) |
| `lab1/04_minilang_typechecker.ts` | MINILANG: write the type checker | 15 min, pairs | [open](https://www.typescriptlang.org/play/?#code/PTAEFkAUBkBVWgQwEagIygLSgAwBYIBJAOUOgEFiBxALlAHcAnASwBcBTUVgC09YE8ADpwDGvEQGt2jULLnyFiuQAo0AVlABbZgDsANKEGJmjAM4BKAFAgE7EawCujTgCYDpgDbMAJu1PoATkwXFwA6UEIdLl5QDztHZ1AATQB5AFUGaT4YgWFQMTspRnDiAHt6UH5ShwYWDlA2UOswFJ0+IV0Ac1BGBzjQAF5QUrbZEURTTgao-PEJZXNQJptYbmdOXrj-RETvEc5lWExI1gMjgDUds8wqVnNwpOratk4jgGVWRmvyb29QRB0fyOhAAZstgM1QFQUuRoKA6Dgeuw-g5AdIvG1-JQACKgdgAN2k-Fiuk4uminGgpU6-lYKFApkQ-H8kHIbzeTUhmG52HIyFMn0Q9gZ-B0dIAHnQAXjxYJnKZTMwRg1-OxxULWB5ifthiCKZN8hM-FgeaazWbLLlOABRWUyAaWWQAH1AAG9QBJdN46AAiXSsH0AblA+MQHgc7DoOgcmmQ0lAAF8lMmUzY1I7QC73Z7Ab6BYwgyGwxG6PmuomU5WFDYfQBCH0ZrMer2+0MF4M6RCaSMMz7lpNVwegGzixtu5u50A+xC-QtxEGsOi2uXBlidbiL0DLmQDwc2dgYADUeJcY+zLannQDwfnm+3q+Y67vdorQ+HYAPoAAfCezxPvVOzAgoWIgjAB94UjoS52sG7AeJM0FyomwayDYQH5JBeIYHBBrsKelpCK8hGDIBYo+pmU5ljonTkS6PrIKUpQeEGBF5NaOj4iR7oANptswKBxKWfbUQAunQsDES6qK+CCpJ-AmKHyDYVBdpoiBRl2xqYD+VqmJYlgiB4Ez+AAwnM1qMIwpQyGqHCAv4FlWTIrq7m+yY1jopQ9H0nCIIIgheH45FDFaeKWdZ+kgqi9hKlEarCPYEnCMoGoOGG4mEQY9AAhwAFJewWW8M4QksNR5h0PipQ+G6GboSl9hpR4oC1gMQzZWKyKLDwVkVG0FRmYUjnWco9BFZwx4+nQ8XxMiU6gMe7W5fNU4GJ0pSsHNx6pWG5iBpYCb6TYpqgKs7R5AUkjSHQsyFMoBV4hxiz-Dopj0NI-hTipmhqZm2CcHQAD85HmiD5qWFFOgxcqF3zD224GOwHFLo9GV5K6GavWwYigHdoQ5t4izo-I4wGn6ZHXW5lOoWAwJitdX0-U62BRHQ-oZvIzgJFEZPXvpxNGlObaTeOVNuSsmCXIw13ivCJ3TFCqmILIAw-gr31K0zoAy+J7NyKBL0bRtQyI-i3HsKEnbdiJe2KHVRutaA0nsLJbQE9EPWgH1oADZIQ2MMoPqogx0lFiwAmcORx7m5b7C7brsic04USsDbcgHbrJMR1ewui1T4u3BT-rftMG10AxTHxzKCWsPlygw7jt4I49Bg8z6Le3rq34+nHijTYlhF13MuNrhuTf4uYLf+m3U4jxtpR6l+3epxz7Bc1O5fMXtusrGyADS6BYCdmAfFLshK1R3ReBwjBhqA3ATFwxEX5ySk03voAuIfRw-ABJfLUXrMxSKAvstEBJUujbzAFTAE2oeDxlArGXQiBWCxToN1cont2D9XMuFf2PpQgEO7nzOQO83j7wAMxf2OCCCmcD8hgTYLFLQDgBSgDjGwxiHgDAMR4Gwm+kNeD+E0Cwja99CQUlAG8cg4BrSQNFqFWABgAR-DoaNJinB4rykVMqe+tJiKwCaLIA66cjo8hOn4DacpqQ300P4ZQexPbrTxN4NgixQbuI8Z4rxmADIjFYUXIYyhQzhh7NGWM0hypbhfCrHG55JytwMMEiMiY4761YfmEiQTiw9gvpE7cgwfzKDiQBH0+Zp5JM4AmVJfiNqcUCTHcBZVEL2kKcU1sOxp4xxSXtNJG0Zx-ECbeZpBhZ7NLydE1p-5fT9Ono3Hoj4NzdN8QbUAV5MlDKiXKEZCznxynGUhGJRSpmXgDAYOZs8lm9IaCCPUgT9bgTtAYOBUFNlfDxPBMZzSCmxOOX6YCBh7lPN4Pod5CFQVLOWawzoitkZ1PHJKUipzPaaTzMJGiSjOg9lbshfSVyrGdBsaYOg3EL4GHhidSSU5pBOR9CJbiIkSLcQzNxAA5GgRYMtjxqBZUo34QSA7im7gYf0yg1DmAnoi2lehmUspcIsLpE16w8v+Hy-EAcY5Ct7Hg+s4qW4XylTK8h8rNLLW5by7w-KfQaolSKsVEqfTUusga2QrK8CLEQJi4uaAAAcyqryWo9ewTVIqfW6vXpw51oBWViuuf8T1P4fWYS6ThTgOBlVARBMof1arpyYuDWKVQ3qw05utcKgtOAw0OtwZG1lAA2RYxJjxoGVf0y1-B82sFUJWx1BYRLSpdSygA7IsdCgavXeswtObwfQAygojtoTyBZ003KzZ2nNgaO2FrDfmAOM4Z2ap3T6BdTrK36r7TKotsaZbPIPimj+y7M05sFTagt7Ky2drlfantNaWUBEWMoTloAY0-kDX6ztran2brtYk3debK0bwNdbSK1kcZXJJdURgIh7qaKyjlZEDL56GCsgSrsFgaqyDiBtNam4L6p0o44+oQwfQsVkJ8YkRM9Y1K4CReuOHVmKx7nIajJF7ZDCdi7WaAMpyeW8v0fgq9yJoNTkmcYrBsZ3UJrrOqZIDYAiw4Rn2Eg-aE1WU4pj36OzrU4ExlQkc8ShG7AqMdE1zCFgOvIO97phNMZMgAJTZAACULJ5Rjc1ZAB2WifLoGnlrdzcxmdz9CVmlAkCRbzDtFrIlTmk9RoQPDUmUMoFLoApM+lZOyWQimpwADFyBkEq4sY8pgMNYdi3IGJlXlrCePCF8aONiulaq+RWQfclp2cywTOOJiwDHTeLAXz1pYAmQCzjF2zBTDcH+KI0o3ZY1wMSOtxxXBmDdjcd487YMbBvAwFuJJyDrLhB9PlTAMNQCyTMKwcIrQtT-BEFhwQS1NF+G0S9f4iQCTFmQciUI5FlCeB8K4OVkJ5AAHU6hTAh+GKHd1hkMkfGpOgPE+Lh0aZ0MSnsYxxhkC6EBLoN7sGlFUpYyO5BpANIqToP0hjugRWgHABgGlTnIF4aega6AuERAmcI1o7v1HxYS9ABg3CgDwAYQdBgAjggUAARQjAKVBlQMN4llyhtoyJ-AyZ7XfZRGJugghQ8i3bXKligBR9wYkIWAaQjeJ-UAxAsGyfNqAH+sg2lUoAI5zmdrsxgD4nxfIHPbmQWFBjG0-lr+Q1WTCsJR75wgsBrQSM2L5bY9DvqIw2soOU7BtCTG2AxcRdCMT3X1oZFhTC4z5foBPFnrHgUqpUTETO4Q3jcGqB4P4B8HY+jQMN9hQp-u5Sk48GoOxsicCMtRNKnrfAc7aMUb3lDQDYj8I+KI4e9coJGOEfKbwRAsABw0VgkwPB6noOPv4nRmDiNjSISdiByI71EQJErRe8tVywXQwkqdZBdABQGc-hCNnAAAreIcsRoV3e+Dad-PoP4YvI+UEWIRiVLLwKQSCL3IAA) |
<!-- /playground-links:lab1 -->

Files 00 to 04 are the lab

### Rules for every file

- **Predict before you run.** Say your guess to your partner, then run.
- **Forbidden:** `any`, `as`, the `!` operator, `@ts-ignore`, and new `@ts-expect-error` lines. They switch the type checker off.
- **Do not edit** the parts marked "do not edit" (the tests).
- A file is **done** when it has no type error (no red underline) and every log line says `PASS`.

### What to do in each file

**00 Warm-up: predict, vote, run.** Three short cases. For each one decide: rejected by the compiler, crashes at run time, or runs fine. Then run it and answer the three questions at the bottom. Nothing to submit.

**01 Narrowing.** Four functions receive a value that may be missing (`undefined`, `null`) or may have two types (`number | string`).
- Tasks 1 to 3: remove the type errors with `if`, `typeof`, `=== null`, `=== undefined`.
- Task 4: the function has no type error and is still wrong. Find out why and fix it.
- Done when: 0 type errors, 9 `PASS`.

**02 Unions: make illegal states unrepresentable.** A model-training job is queued, running, done or failed.
- Task 1: replace the "bag of optional fields" with a discriminated union, one object type per state.
- Task 2: write `describe(job)` with one `case` per state.
- Task 3: add a fifth state `cancelled`, watch where the compiler complains, handle it, and un-comment the last check.
- Done when: 0 type errors, 5 `PASS` (4 before Task 3).

**03 Generics.** The JavaScript is already correct and every check passes from the start. The types are missing.
- Tasks 1 to 4: make `last`, `pair`, `longest` and `pluck` generic, so that the compile-time tests stop being red.
- Done when: 0 type errors, 5 `PASS`.

**04 MiniLang: write the type checker.** One typing rule is one `case` in `check()`. Three rules are given.
- Tasks 1 to 3: write T-Str, T-Add and T-If.
- Stretch (at home): an evaluator, and a new rule for `==`.
- Done when: 0 type errors, 9 `PASS`. Keep this file: the next lab builds on it.
---

## Set up once (about 5 minutes)

### 1. Tools

| Tool | Needed for | Check |
| --- | --- | --- |
| A GitHub account | your private repository | you can sign in at github.com |
| Git | cloning and submitting | `git --version` |
| Node.js 22 or newer | running the checks locally. Skip it if you only use the Playground | `node --version` |
| GitHub CLI (optional) | creating the private copy with one command | `gh --version` |

### 2. Clone this repository and create your private copy

Replace `YOUR-USERNAME` with your GitHub username and `YOURSURNAME` with your surname. Run the commands one by one.

```
git clone https://github.com/Fred0399/modern_prog_lab1.git
cd modern_prog_lab1
git remote rename origin upstream
```

After this, `upstream` is the instructor's repository. You can read from it; you cannot write to it.

**With GitHub CLI** (first time only: `gh auth login`):

```
gh repo create modern_prog_lab1-YOURSURNAME-GROUP_NO --private --source=. --remote=origin --push
git push -u origin main
```

**Without GitHub CLI:**

1. Open <https://github.com/new>. Name: `modern_prog_lab1-YOURSURNAME-GROUP_NO`. Visibility: **Private**. Do **not** add a README, a `.gitignore` or a licence. Create.
2. Then:

```
git remote add origin https://github.com/YOUR-USERNAME/modern_prog_lab1-YOURSURNAME-GROUP_NO.git
git push -u origin main
```

Now `origin` is your private copy, and `-u` makes it the default target of `git push`. Check with `git remote -v`: you must see both `origin` (yours) and `upstream` (the instructor's).

> Do **not** use the Fork button. A fork of a public repository is public, so everyone would see your solutions.

### 3. Give the instructor access

In your repository on github.com: **Settings → Collaborators → Add people →** `Fred0399`.

Or with GitHub CLI:

```
gh api --method PUT repos/YOUR-USERNAME/modern_prog_lab1-YOURSURNAME-GROUP_NO/collaborators/Fred0399
```

Only you and the instructor can see the repository.

---

## Work

You can mix both ways. What counts is the content of the files in your private repository.

### Locally

```
npm install
npm run lab1
```

`npm install` is needed once. `npm run lab1` prints one line per file:

```
lab1
  01_narrowing.ts                      not yet   4 type error(s), 3 PASS, 6 FAIL
  02_unions_illegal_states.ts          DONE      0 type error(s), 5 PASS, 0 FAIL
  ...
Core tasks done: 1 of 4
```

To see the type errors and the full output of one file:

```
node scripts/check.mjs lab1/01_narrowing.ts
```

An editor with TypeScript support (for example VS Code) shows the same red underlines while you type. Hover over a name to see its type.

### In the TypeScript Playground

1. Click **open** next to the file in the table above. The code is already loaded.
2. Solve it there. Press **Run** (`Ctrl/Cmd + Enter`) and read the **Logs** tab.
3. Select all, copy, and paste over the **same file** in your clone. Save.

The Playground does not save into your repository. If you skip step 3, nothing is submitted.

No Node.js on your computer? Steps 1 to 3 are enough. The checks then run on GitHub after you push (see [Submit](#submit)).

---

## Submit

```
git add -A
git commit -m "lab1"
git push origin main
```

- **Your submission is whatever is on the `main` branch of your private repository at the deadline.** Deadline: announced in class.
- Push as often as you like. Early and partial pushes are fine and nobody else sees them.
- After a push, open the **Actions** tab of your repository. A green mark means all core tasks are done; a red mark means at least one is not. Click the run to see the same lines that `npm run lab1` prints.

### Report

Fill in `lab1/REPORT.md` (name, partner, status, two exit-ticket sentences, AI use) and push it with your code. It takes about three minutes.

### Working in pairs

Solve the lab together if you like. Each of you pushes to your **own** private repository and names the partner in the report. Each of you must be able to explain every line.

### AI tools

Labs are "green" in the course AI policy: you may use AI for explanations, examples, debugging and discussion of alternatives. Say so in the report, and be ready to explain your code without it.

---

## Get the next lab

New labs appear in this repository as new folders (`lab2`, `lab3`, ...). Bring them into your copy:

```
git pull --no-rebase --no-edit upstream main
git push origin main
```

Your own work stays as it is. Published lab files are not changed afterwards, so this merge has no conflicts.

---

## Privacy rules

- Your repository stays **Private**. Check: the word "Private" next to its name on github.com.
- Never fork this repository and never open a pull request against it. Both are public.
- A Playground link contains the code. Do not post a link to your solution in a group chat.
- Do not publish solutions after the deadline either. Other groups use the same tasks.
- The only public part is the challenge in file 06.

---

## If something goes wrong

| Problem | Fix |
| --- | --- |
| `remote origin already exists` | You skipped `git remote rename origin upstream`. Run it, then repeat the step. |
| `Permission denied` or `403` when pushing | You pushed to `upstream`. Use `git push origin main`. |
| Git asks for a password and rejects it | GitHub does not accept account passwords for Git. Run `gh auth login`, or sign in through the browser window that Git opens. |
| I made the repository public by mistake | Settings → General → Danger Zone → Change visibility → Private. Tell the instructor. |
| `npm run lab1` says `Cannot find package 'typescript'` | Run `npm install` in the `mplt-labs` folder first. |
| The Actions tab shows nothing | Open the tab once and enable workflows if GitHub asks, then push again. |
| I cannot install Git | Create the private repository as in step 2, then use **Add file → Upload files** on github.com to upload the `lab1` folder. Tell the instructor, because you will not be able to pull later labs this way. |
