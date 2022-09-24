#include <stdio.h>
#include <string.h>

void main()
{
    FILE *f1;
    FILE *f2;
    f1=fopen("base.txt","r");
    f2=fopen("result.txt","w");

    FILE *f3;
    f3=fopen("result2.txt","w");

    char text[100]={0,};
    strcpy(text,"산림녹지과");
    char temp[20][100]={0,};

    char *po;
    char str[200]={0,};

    while(!feof(f1))
    {
        fgets(str,200,f1);

        po=strstr(str,text);
        if(strchr(po,'~'))
        {
            fprintf(f2,"%s",str);
        }
        else if((po=strchr(po,'-'))&&po)
        {
            if(*(po+1)<48||*(po+1)>57)
            {
                fprintf(f2,"%s",str);
            }
            else
            {
                fprintf(f3,"%s",str);
            }
        }
        else
        {
            fprintf(f3,"%s",str);
        }
    }
    fclose(f2);
    fclose(f1);

    fclose(f3);
}

