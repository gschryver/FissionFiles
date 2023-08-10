using FissionFiles.Models;
using System.Collections.Generic;

namespace FissionFiles.Repositories
{
    public interface IScientistRepository
    {
        List<Scientist> GetAllScientists();
        Scientist GetScientistById(int id);
        void AddScientist(Scientist scientist);
        void UpdateScientist(Scientist scientist);
        void DeleteScientist(int id);
    }
}
